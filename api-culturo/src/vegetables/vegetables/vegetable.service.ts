import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Family } from 'src/entities/family.entity';
import { CreateVegetableDTO } from './dtos/create.vegetable.dto';
import { UpdateVegetableDTO } from './dtos/update.vegetable.dto';
import { Section } from 'src/entities/section.entity';

@Injectable()
export class VegetableService {
  constructor(
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async getAllVegetables() {
    return this.vegetableRepository.find({
      relations: ['family', 'prices', 'sections', 'orderDetails'],
    });
  }

  async getVegetableById(id: number) {
    return this.vegetableRepository.findOne({
      where: { id_vegetable: id },
      relations: ['family', 'prices', 'sections', 'orderDetails'],
    });
  }

  async createVegetable(payload: CreateVegetableDTO) {
    const family = await this.familyRepository.findOne({
      where: { id_family: payload.id_family },
    });
    if (!family) throw new NotFoundException('Family not found');

    const vegetable = this.vegetableRepository.create({
      ...payload,
      family,
    });

    return this.vegetableRepository.save(vegetable);
  }

  async updateVegetable(payload: UpdateVegetableDTO) {
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: payload.id_vegetable },
    });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    if (payload.id_family) {
      const family = await this.familyRepository.findOne({
        where: { id_family: payload.id_family },
      });
      if (!family) throw new NotFoundException('Family not found');
      vegetable.family = family;
    }

    Object.assign(vegetable, payload);
    return this.vegetableRepository.save(vegetable);
  }

  async delVegetable(id: number) {
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: id },
    });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    await this.vegetableRepository.delete({ id_vegetable: id });
    return { msg: 'Vegetable deleted successfully' };
  }

  async canPlantVegetable(
    boardId: number,
    vegetableId: number,
    bypass = true,
  ) {
    // --- Récupération du légume + famille + importance ---
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: vegetableId },
      relations: ['family', 'family.family_importance'],
    });
    console.log(vegetable); //////////////////
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    const family = vegetable.family;
    const isPrimary =
      family.family_importance?.importance_name === 'Principale';

    //CHECK 1 - HISTORIQUE 5 ANS
    if (isPrimary) {
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

      const sections = await this.sectionRepository.find({
        where: {
          board: { id_board: boardId },
          start_date: MoreThan(fiveYearsAgo),
        },
        relations: ['vegetable', 'vegetable.family'],
      });

      const familiesInLast5Years = sections.map(
        (s) => s.vegetable.family.id_family,
      );
      console.log(familiesInLast5Years);

      const alreadyPlanted = familiesInLast5Years.includes(family.id_family);
      console.log('deja planté dans les 5 dernière année? : ', alreadyPlanted);

      // --- Famille primaire déjà plantée dans les 5 dernières années ---
      if (alreadyPlanted) {
        if (!bypass) {
          return {
            status: 'WARNING',
            reason:
              'Cette famille primaire a déjà été plantée sur cette planche dans les 5 dernières années.',
            neededBypass: true,
          };
        }
      }

      // --- Familles non plantées depuis 5 ans ---
      if (!alreadyPlanted) {
        const allFamilies = await this.familyRepository.find({
          relations: ['family_importance'],
        });

        const suggestions = allFamilies.filter(
          (f) => !familiesInLast5Years.includes(f.id_family),
        );

        return {
          status: 'OK',
          suggestions: suggestions.map((f) => f.family_name),
        };
      }
    }

    //CHECK 2 - AUTRES FAMILLES PRIMAIRES SUR LA PLANCHE
    if (isPrimary) {
      const activeSections = await this.sectionRepository.find({
        where: { board: { id_board: boardId } },
        relations: [
          'vegetable',
          'vegetable.family',
          'vegetable.family.family_importance',
        ],
      });

      const primaryFamilies = activeSections
        .filter(
          (s) =>
            s.vegetable.family.family_importance.importance_name ===
            'Principale',
        )
        .map((s) => s.vegetable.family.id_family);

      const hasPrimary = primaryFamilies.length > 0;

      if (hasPrimary) {
        const isSameFamily = primaryFamilies.includes(family.id_family);

        if (!isSameFamily && !bypass) {
          return {
            status: 'WARNING',
            reason:
              'Une autre famille primaire est déjà plantée sur cette planche.',
            neededBypass: true,
          };
        }
      }
    }
    // OK
    return { status: 'OK' };
  }

  async findPlantableSections(
    vegetableId: number,
    startDate: Date,
    endDate: Date,
  ) {
    // Récupérer le légume et sa famille
    const vegetable = await this.vegetableRepository.findOne({
      where: { id_vegetable: vegetableId },
      relations: ['family', 'family.family_importance'],
    });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    const family = vegetable.family;
    const isPrimary = family.family_importance?.importance_name === 'primaire';

    // Récupérer toutes les sections avec leurs boards et légumes
    const sections = await this.sectionRepository.find({
      relations: [
        'board',
        'vegetable',
        'vegetable.family',
        'vegetable.family.family_importance',
      ],
    });

    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    // Filtrer les sections valides
    const plantableSections = sections.filter((section) => {
      // ------ Vérifier conflit de dates ---
      if (section.start_date && section.end_date) {
        const overlap =
          startDate <= section.end_date && endDate >= section.start_date;
        if (overlap) return false; // section occupée → on exclut
      }

      // ------ Si famille primaire, vérifier l'historique 5 ans ---
      if (isPrimary) {
        const boardSections = sections.filter(
          (s) => s.board.id_board === section.board.id_board,
        );

        const familiesInLast5Years = boardSections
          .filter((s) => s.start_date && s.start_date > fiveYearsAgo)
          .map((s) => s.vegetable?.family?.id_family)
          .filter(Boolean);

        // Si la famille a déjà été plantée dans les 5 dernières années → on exclut
        if (familiesInLast5Years.includes(family.id_family)) return false;
      }

      // --- Si aucune restriction → section OK ---
      return true;
    });

    return plantableSections;
  }
}
