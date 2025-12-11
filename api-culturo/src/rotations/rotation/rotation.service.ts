import { BoardPlanDto } from '../dtos/boardPlan.dto';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Section } from 'src/entities/section.entity';
import { SectionPlan } from 'src/entities/section_plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantableVegetableDto } from '../dtos/plantable.vegetable.dro';

interface RawCulturePlanResult {
  board_id_board: number;
  board_board_name: string;
  section_section_number: number;
  vegetable_vegetable_name: string;
  vegetable_variety_name: string | null;
  section_start_date: Date;
  section_end_date: Date;
}

// --- Type Guard Utile ---
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

@Injectable()
export class RotationService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
    @InjectRepository(SectionPlan)
    private sectionPlanRepository: Repository<SectionPlan>,
  ) {}

  /**
   * Récupère le plan de culture pour une sole et une période données.
   */
  async getCulturePlan(
    soleId: number,
    year: number,
    month: number | null = null,
    periodMonths: number = 12,
  ): Promise<BoardPlanDto[]> {
    let startDate: Date;
    let endDate: Date;

    if (month !== null) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month - 1 + periodMonths, 0);
    } else {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    }

    const results: RawCulturePlanResult[] = await this.sectionRepository
      .createQueryBuilder('section')
      .leftJoin('section.vegetable', 'vegetable')
      .leftJoin('section.sectionPlan', 'sectionPlan')
      .leftJoin('sectionPlan.board', 'board')
      .leftJoin('board.sole', 'sole')
      .where('sole.id_sole = :soleId', { soleId })
      .andWhere('section.start_date <= :endDate', { endDate })
      .andWhere('section.end_date >= :startDate', { startDate })
      .select([
        'board.id_board',
        'board.board_name',
        'section.section_number',
        'vegetable.vegetable_name',
        'vegetable.variety_name',
        'section.start_date',
        'section.end_date',
      ])
      .orderBy('board.board_name', 'ASC')
      .addOrderBy('section.section_number', 'ASC')
      .getRawMany<RawCulturePlanResult>();

    return results.map((r) => ({
      boardId: r.board_id_board,
      boardName: r.board_board_name,
      sectionNumber: r.section_section_number,
      vegetableName: r.vegetable_vegetable_name,
      varietyName: r.vegetable_variety_name,
      startDate: r.section_start_date,
      endDate: r.section_end_date,
    }));
  }
  /**
   * Vérifie la possibilité de planter un légume sur une planche donnée.
   * Vérifie les règles de rotation (5 ans) et de cohabitation.
   */
  async canPlantVegetable(
    boardId: number,
    vegetableId: number,
    bypass = false,
  ) {
    // 1. Récupération du légume + famille + importance
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: vegetableId },
      relations: ['family', 'family.family_importance'],
    });

    if (!vegetable) {
      throw new NotFoundException(`Vegetable with id ${vegetableId} not found`);
    }

    const family = vegetable.family;

    if (!family || !family.family_importance) {
      throw new NotFoundException(
        'Vegetable family or importance not configured',
      );
    }

    const isPrimary = family.family_importance.importance_name === 'primaire';

    // Si ce n'est pas une famille primaire, pas de règles strictes
    if (!isPrimary) {
      return { status: 'OK' };
    }

    // CHECK 1 & 2 (Rotation 5 ans et Cohabitation Active)
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    // Récupération des sections via QueryBuilder pour plus de contrôle
    const sectionsToCheck = await this.sectionRepository
      .createQueryBuilder('section')
      .leftJoinAndSelect('section.vegetable', 'vegetable')
      .leftJoinAndSelect('vegetable.family', 'family')
      .leftJoinAndSelect('family.family_importance', 'family_importance')
      .leftJoin('section.sectionPlan', 'sectionPlan')
      .leftJoin('sectionPlan.board', 'board')
      .where('board.id_board = :boardId', { boardId })
      .andWhere(
        '(section.section_active = :active OR section.end_date >= :fiveYearsAgo)',
        { active: true, fiveYearsAgo },
      )
      .getMany();

    let alreadyPlantedIn5Years = false;
    let hasOtherActivePrimary = false;

    for (const section of sectionsToCheck) {
      if (!section.vegetable?.family) continue;

      const sectionFamilyId = section.vegetable.family.id_family;
      const sectionIsPrimary =
        section.vegetable.family.family_importance?.importance_name ===
        'primaire';

      // 1. Vérification Rotation (5 ans)
      if (
        section.end_date >= fiveYearsAgo &&
        sectionFamilyId === family.id_family
      ) {
        alreadyPlantedIn5Years = true;
      }

      // 2. Vérification Cohabitation (Actuellement active)
      if (
        section.section_active &&
        sectionIsPrimary &&
        sectionFamilyId !== family.id_family
      ) {
        hasOtherActivePrimary = true;
      }
    }

    // --- Application des Règles ---
    if (alreadyPlantedIn5Years && !bypass) {
      return {
        status: 'WARNING',
        reason:
          'Cette famille primaire a déjà été plantée sur cette planche dans les 5 dernières années (Rotation 5 ans).',
        neededBypass: true,
      };
    }

    if (hasOtherActivePrimary && !bypass) {
      return {
        status: 'WARNING',
        reason:
          'Une autre famille primaire est déjà activement plantée sur cette planche (Cohabitation).',
        neededBypass: true,
      };
    }

    // Tout est ok ou bypassé
    return { status: 'OK' };
  }

  /**
   * Recherche TOUS les emplacements plantables pour un légume donné sur une période.
   *
   * Logique HYBRIDE :
   * - BOARD-LEVEL : Cohabitation de familles primaires et rotation 5 ans bloquent TOUTE la board
   * - SECTION-LEVEL : Occupation physique bloque SEULEMENT cette section
   *
   * @param vegetableId - ID du légume à planter
   * @param startDate - Date de début de plantation
   * @param endDate - Date de fin de plantation
   */
  async findPlantableSections(
    vegetableId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any[]> {
    try {
      // 1. Récupérer le légume avec ses relations
      const targetVegetable = await this.vegetableRepository.findOne({
        where: { id_vegetable: vegetableId },
        relations: ['family', 'family.family_importance'],
      });

      if (!targetVegetable?.family?.family_importance) {
        throw new NotFoundException(
          `Légume ${vegetableId} non trouvé ou configuration incomplète.`,
        );
      }

      const targetFamilyId = targetVegetable.family.id_family;
      const isTargetPrimary =
        targetVegetable.family.family_importance.importance_name === 'primaire';

      // 2. Date limite pour la rotation (5 ans avant)
      const fiveYearsAgo = new Date(startDate);
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      // 3. Récupérer TOUS les SectionPlan actifs (avec leur historique de sections)
      const allSectionPlans = await this.sectionPlanRepository
        .createQueryBuilder('sectionPlan')
        .leftJoinAndSelect('sectionPlan.board', 'board')
        .leftJoinAndSelect('sectionPlan.sections', 'sections')
        .leftJoinAndSelect('sections.vegetable', 'vegetable')
        .leftJoinAndSelect('vegetable.family', 'family')
        .leftJoinAndSelect('family.family_importance', 'family_importance')
        .where('sectionPlan.section_plan_active = :active', { active: true })
        .getMany();

      // 4. Pour chaque SectionPlan, vérifier la disponibilité
      const plantableLocations: any[] = [];

      for (const sectionPlan of allSectionPlans) {
        // ========================================
        // ÉTAPE 1 : Vérifications AU NIVEAU BOARD
        // (Si une règle échoue, TOUTE la board est bloquée)
        // ========================================

        let isBoardAccessible = true;

        for (const section of sectionPlan.sections) {
          // Ignorer les sections sans légume
          if (!section.vegetable) {
            continue;
          }

          // RÈGLE BOARD 1 : Cohabitation de familles primaires actives
          // Si une famille primaire (différente de la cible) est actuellement active
          // → TOUTE la board est inaccessible
          if (section.section_active && section.vegetable.family) {
            const activeFamilyId = section.vegetable.family.id_family;
            const isActivePrimary =
              section.vegetable.family.family_importance?.importance_name ===
              'primaire';

            if (isActivePrimary && activeFamilyId !== targetFamilyId) {
              isBoardAccessible = false;
              break;
            }
          }

          // RÈGLE BOARD 2 : Rotation 5 ans (si légume cible est primaire)
          // Si la même famille primaire a été plantée dans les 5 dernières années
          // → TOUTE la board est inaccessible
          if (isTargetPrimary && section.vegetable.family) {
            const pastFamilyId = section.vegetable.family.id_family;
            const isPastPrimary =
              section.vegetable.family.family_importance?.importance_name ===
              'primaire';

            if (
              isPastPrimary &&
              pastFamilyId === targetFamilyId &&
              section.end_date >= fiveYearsAgo
            ) {
              isBoardAccessible = false;
              break;
            }
          }
        }

        // Si la board n'est pas accessible, passer à la suivante
        if (!isBoardAccessible) {
          continue;
        }

        // ========================================
        // ÉTAPE 2 : Vérifications AU NIVEAU SECTION
        // (La board est accessible, vérifier chaque section individuellement)
        // ========================================

        for (
          let sectionNumber = 1;
          sectionNumber <= sectionPlan.number_of_section;
          sectionNumber++
        ) {
          // Récupérer l'historique de cette section spécifique
          const sectionsAtLocation = sectionPlan.sections.filter(
            (s) => s.section_number === sectionNumber,
          );

          let isSectionPlantable = true;

          // Vérifier l'occupation physique de CETTE section
          for (const section of sectionsAtLocation) {
            // Ignorer les sections sans légume
            if (!section.vegetable) {
              continue;
            }

            // RÈGLE SECTION : Occupation physique
            // Si la section est actuellement active OU si les dates chevauchent
            // → SEULEMENT cette section est bloquée (pas toute la board)
            const isOccupiedDuringPeriod =
              section.section_active ||
              (section.start_date <= endDate && section.end_date >= startDate);

            if (isOccupiedDuringPeriod) {
              isSectionPlantable = false;
              break;
            }
          }

          // Si cette section est plantable, l'ajouter aux résultats
          if (isSectionPlantable) {
            plantableLocations.push({
              sectionPlanId: sectionPlan.id_section_plan,
              boardId: sectionPlan.board.id_board,
              boardName: sectionPlan.board.board_name,
              sectionNumber: sectionNumber,
              totalSections: sectionPlan.number_of_section,
              lastPlantedVegetable:
                sectionsAtLocation.length > 0
                  ? sectionsAtLocation[sectionsAtLocation.length - 1].vegetable
                      ?.vegetable_name
                  : null,
              neverPlanted: sectionsAtLocation.length === 0,
            });
          }
        }
      }

      return plantableLocations;
    } catch (e) {
      const errorMessage = isError(e)
        ? e.message
        : 'Erreur inconnue lors de la recherche des sections plantables.';

      throw new InternalServerErrorException(
        `Erreur findPlantableSections: ${errorMessage}`,
      );
    }
  }

  /**
   *
   * @param sectionPlanId
   * @param sectionNumber
   * @param startDate
   * @param endDate
   * @returns
   */
  async findPlantableVegetables(
    sectionPlanId: number,
    sectionNumber: number,
    startDate: Date,
    endDate: Date,
  ): Promise<PlantableVegetableDto[]> {
    try {
      // 1. Récupérer le SectionPlan avec toutes ses sections
      const sectionPlan = await this.sectionPlanRepository.findOne({
        where: { id_section_plan: sectionPlanId },
        relations: [
          'board',
          'sections',
          'sections.vegetable',
          'sections.vegetable.family',
          'sections.vegetable.family.family_importance',
        ],
      });

      if (!sectionPlan) {
        throw new NotFoundException(`SectionPlan ${sectionPlanId} non trouvé.`);
      }

      // 2. Vérifier que le numéro de section est valide
      if (sectionNumber < 1 || sectionNumber > sectionPlan.number_of_section) {
        throw new BadRequestException(
          `Section ${sectionNumber} invalide. Board a ${sectionPlan.number_of_section} sections.`,
        );
      }

      // ========================================
      // ÉTAPE 1 : Vérifier l'occupation physique de LA section ciblée
      // ========================================
      const sectionsAtLocation = sectionPlan.sections.filter(
        (s) => s.section_number === sectionNumber,
      );

      for (const section of sectionsAtLocation) {
        if (!section.vegetable) continue;

        const isOccupiedDuringPeriod =
          section.section_active ||
          (section.start_date <= endDate && section.end_date >= startDate);

        if (isOccupiedDuringPeriod) {
          // La section est physiquement occupée, aucun légume ne peut être planté
          return [];
        }
      }

      // ========================================
      // ÉTAPE 2 : Identifier les restrictions au niveau BOARD
      // ========================================
      const fiveYearsAgo = new Date(startDate);
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      // Familles primaires actuellement actives sur la board
      const activePrimaryFamilies = new Set<number>();

      // Familles primaires plantées dans les 5 dernières années sur la board
      const recentPrimaryFamilies = new Set<number>();

      for (const section of sectionPlan.sections) {
        if (!section.vegetable?.family) continue;

        const familyId = section.vegetable.family.id_family;
        const isPrimary =
          section.vegetable.family.family_importance?.importance_name ===
          'primaire';

        if (!isPrimary) continue;

        // Collecter les familles primaires actives
        if (section.section_active) {
          activePrimaryFamilies.add(familyId);
        }

        // Collecter les familles primaires récentes (5 ans)
        if (section.end_date >= fiveYearsAgo) {
          recentPrimaryFamilies.add(familyId);
        }
      }

      // ========================================
      // ÉTAPE 3 : Récupérer tous les légumes disponibles
      // ========================================
      const allVegetables = await this.vegetableRepository.find({
        relations: ['family', 'family.family_importance'],
      });

      // ========================================
      // ÉTAPE 4 : Filtrer les légumes selon les règles
      // ========================================
      const plantableVegetables: PlantableVegetableDto[] = [];

      for (const vegetable of allVegetables) {
        if (!vegetable.family?.family_importance) continue;

        const familyId = vegetable.family.id_family;
        const isPrimary =
          vegetable.family.family_importance.importance_name === 'primaire';

        let isPlantable = true;

        // RÈGLE BOARD 1 : Cohabitation de familles primaires
        // Si le légume est primaire ET qu'une autre famille primaire est active
        // → Le légume n'est PAS plantable
        if (isPrimary && activePrimaryFamilies.size > 0) {
          if (!activePrimaryFamilies.has(familyId)) {
            isPlantable = false;
          }
        }

        // RÈGLE BOARD 2 : Rotation 5 ans pour les primaires
        // Si le légume est primaire ET que sa famille a été plantée récemment
        // → Le légume n'est PAS plantable
        if (isPrimary && recentPrimaryFamilies.has(familyId)) {
          isPlantable = false;
        }

        if (isPlantable) {
          plantableVegetables.push({
            vegetableId: vegetable.id_vegetable,
            vegetableName: vegetable.vegetable_name,
            familyId: vegetable.family.id_family,
            familyName: vegetable.family.family_name,
            importance: vegetable.family.family_importance.importance_name,
            lastPlantedInSection:
              sectionsAtLocation.length > 0
                ? (sectionsAtLocation[sectionsAtLocation.length - 1].vegetable
                    ?.vegetable_name ?? null)
                : null,
            neverPlantedInSection: sectionsAtLocation.length === 0,
          });
        }
      }

      return plantableVegetables;
    } catch (e) {
      const errorMessage = isError(e)
        ? e.message
        : 'Erreur inconnue lors de la recherche des légumes plantables.';

      throw new InternalServerErrorException(
        `Erreur findPlantableVegetables: ${errorMessage}`,
      );
    }
  }
}
