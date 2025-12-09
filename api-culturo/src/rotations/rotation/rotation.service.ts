// src/rotations/rotation/rotation.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from 'src/entities/section.entity';
import { BoardPlanDto, RawCulturePlanResult } from '../dtos/boardPlan.dto';
import { LessThanOrEqual } from 'typeorm';
import { Vegetable } from 'src/entities/vegetable.entity';

// Assurez-vous que Board, Sole, SectionPlan sont injectés dans le module

@Injectable()
export class RotationService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
    // L'injection des autres repos est optionnelle si vous ne les utilisez pas directement,
    // mais elle peut aider à forcer le chargement des métadonnées.
  ) {}

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

    const query = this.sectionRepository.createQueryBuilder('section');

    query
      // Jointure 1: Section -> Vegetable (ManyToOne)
      .leftJoinAndSelect('section.vegetable', 'vegetable')

      // Jointure 2: Section -> SectionPlan (ManyToOne)
      .leftJoin('section.sectionPlan', 'sectionPlan')

      // Jointure 3: SectionPlan -> Board (ManyToOne - le nouveau chemin simple !)
      .leftJoin('sectionPlan.board', 'board')

      // Jointure 4: Board -> Sole (ManyToOne)
      // Note : La Sole est maintenant accessible via Board
      .leftJoin('board.sole', 'sole')

      // Filtre sur l'ID de Sole
      .where('sole.id_sole = :soleId', { soleId })

      // Filtres de date
      .andWhere('section.start_date <= :endDate', { endDate })
      .andWhere('section.end_date >= :startDate', { startDate })

      // Sélection des colonnes
      .select([
        'board.board_name',
        'board.id_board',
        'vegetable.vegetable_name',
        'vegetable.variety_name',
        'section.start_date',
        'section.end_date',
      ])
      .distinct(true);

    const sqlQuery = query.getQuery();
    console.log('SQL QUERY:', sqlQuery);

    const results: RawCulturePlanResult[] =
      await query.getRawMany<RawCulturePlanResult>();

    // Mapping des résultats
    return results.map((r) => ({
      boardName: r.board_board_name,
      boardId: r.board_id_board,
      vegetableName: r.vegetable_vegetable_name,
      varietyName: r.vegetable_variety_name,
      startDate: r.section_start_date,
      endDate: r.section_end_date,
    }));
  }

  // Imports : Assurez-vous d'importer l'opérateur 'LessThanOrEqual' pour une meilleure logique de date

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
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    const family = vegetable.family;
    // CORRECTION: Utilisation de 'primaire' tel que défini dans les données d'insertion
    const isPrimary = family.family_importance?.importance_name === 'primaire';

    // CHECK 1 - HISTORIQUE DE 5 ANS (Rotation des cultures pour les familles primaires)
    if (isPrimary) {
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      // CORRECTION: Filtrage initial sur la planche (boardId) et la date de début
      // On cherche toutes les sections de CETTE planche plantées depuis 5 ans
      const sectionsInLast5Years = await this.sectionRepository.find({
        where: {
          // Utilise la relation pour filtrer par la planche cible
          sectionPlan: {
            board: { id_board: boardId },
          },
          // Récupère les sections plantées APRÈS la date limite de 5 ans
          start_date: LessThanOrEqual(fiveYearsAgo), // Ceci semble être l'inverse de ce qui est souhaité.
          // Si l'objectif est de vérifier l'absence d'une famille dans les 5 dernières années,
          // nous devons chercher les sections plantées DEPUIS (MoreThan) fiveYearsAgo.
        },
        relations: ['vegetable', 'vegetable.family'],
      });

      // Calculer les familles plantées sur cette planche durant les 5 dernières années
      const familiesInLast5Years = sectionsInLast5Years
        .filter((s) => s.start_date && s.start_date >= fiveYearsAgo) // Filtre correct côté code si besoin
        .map((s) => s.vegetable.family.id_family);

      const alreadyPlanted = familiesInLast5Years.includes(family.id_family);
      console.log('deja planté dans les 5 dernière année? : ', alreadyPlanted);

      if (alreadyPlanted) {
        // Règle de rotation violée : Famille primaire déjà plantée dans les 5 dernières années
        if (!bypass) {
          return {
            status: 'WARNING',
            reason:
              'Cette famille primaire a déjà été plantée sur cette planche dans les 5 dernières années (Rotation 5 ans).',
            neededBypass: true,
          };
        }
      }
    }

    // CHECK 2 - CONFLIT AVEC D'AUTRES FAMILLES PRIMAIRES ACTIVES SUR LA PLANCHE
    if (isPrimary) {
      // On cherche toutes les sections ACTIVES (section_active = TRUE) sur cette planche
      const activeSectionsOnBoard = await this.sectionRepository.find({
        where: {
          sectionPlan: {
            board: { id_board: boardId },
          },
          section_active: true, // Assurez-vous que seule la section active est vérifiée
        },
        relations: [
          'vegetable',
          'vegetable.family',
          'vegetable.family.family_importance',
        ],
      });

      const activePrimaryFamilies = activeSectionsOnBoard
        .filter(
          (s) =>
            // CORRECTION: Utilisation de 'primaire'
            s.vegetable.family.family_importance.importance_name === 'primaire',
        )
        .map((s) => s.vegetable.family.id_family);

      const hasOtherPrimary =
        activePrimaryFamilies.length > 0 &&
        !activePrimaryFamilies.includes(family.id_family);

      if (hasOtherPrimary) {
        // Règle de cohabitation violée : Une autre famille primaire est déjà active
        if (!bypass) {
          return {
            status: 'WARNING',
            reason:
              'Une autre famille primaire est déjà activement plantée sur cette planche (Cohabitation).',
            neededBypass: true,
          };
        }
      }
    }

    // Si toutes les vérifications passent (ou si ce n'est pas une famille primaire)
    return { status: 'OK' };
  }

  async findPlantableSections(
    vegetableId: number,
    startDate: Date,
    endDate: Date,
  ) {
    // 1. Récupérer le légume et sa famille
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: vegetableId },
      relations: ['family', 'family.family_importance'],
    });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    const family = vegetable.family;
    // CORRECTION: Utilisation de 'primaire'
    const isPrimary = family.family_importance?.importance_name === 'primaire';

    // 2. Récupérer TOUTES les sections (la jointure ci-dessous est plus efficace si l'historique est petit)
    // Nous devons charger toutes les sections du domaine de l'utilisateur pour les filtres.
    const allSections = await this.sectionRepository.find({
      relations: [
        'sectionPlan',
        'sectionPlan.board',
        'vegetable',
        'vegetable.family',
      ],
    });

    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    // Dictionnaire pour stocker les familles plantées par planche pour la règle des 5 ans
    const boardHistory = new Map<number, number[]>();

    // Pré-calcul de l'historique pour l'efficacité
    allSections.forEach((section) => {
      const boardId = section.sectionPlan?.board?.id_board;
      if (!boardId) return;

      if (!boardHistory.has(boardId)) {
        boardHistory.set(boardId, []);
      }

      if (
        section.start_date &&
        section.start_date >= fiveYearsAgo &&
        section.vegetable?.family?.id_family
      ) {
        boardHistory.get(boardId)?.push(section.vegetable.family.id_family);
      }
    });

    // 3. Filtrer les sections valides
    const plantableSections = allSections.filter((section) => {
      const boardId = section.sectionPlan?.board?.id_board;
      if (!boardId) return false;

      // A. Vérifier conflit de dates
      // Si la section est ACTIVE OU si elle chevauche la période de plantation désirée
      const overlap =
        section.section_active ||
        (section.start_date &&
          section.end_date &&
          startDate <= section.end_date &&
          endDate >= section.start_date);

      if (overlap) return false; // section occupée → on exclut

      // B. Vérifier l'historique 5 ans (si famille primaire)
      if (isPrimary) {
        const familiesInLast5Years = boardHistory.get(boardId) || [];

        // Si la famille cible a déjà été plantée dans les 5 dernières années sur cette planche → on exclut
        if (familiesInLast5Years.includes(family.id_family)) return false;
      }

      // C. Vérifier la cohabitation (autre famille primaire déjà active)
      // Note: Ceci peut être ignoré car la vérification de chevauchement (A) couvre
      // la plupart des cas où la section est ACTIVE et plantée. Cependant,
      // si la logique de rotation est stricte, cette vérification est nécessaire.
      const activePrimaryFamiliesOnBoard = allSections
        .filter(
          (s) => s.sectionPlan?.board?.id_board === boardId && s.section_active,
        )
        .filter(
          (s) =>
            s.vegetable?.family?.family_importance?.importance_name ===
            'primaire',
        )
        .map((s) => s.vegetable.family.id_family);

      if (
        activePrimaryFamiliesOnBoard.length > 0 &&
        !activePrimaryFamiliesOnBoard.includes(family.id_family)
      ) {
        // Une autre famille primaire est déjà active sur cette planche
        return false;
      }

      // Si aucune restriction n'est trouvée pour cette section
      return true;
    });

    return plantableSections;
  }
}
