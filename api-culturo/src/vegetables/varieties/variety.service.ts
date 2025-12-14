import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Variety } from 'src/entities/variety.entity';
import { Repository } from 'typeorm';
import { CreateVarietyDTO } from './dtos/create.vartiety.dto';
import { UpdateVarietyDTO } from './dtos/update.variety.dto';

@Injectable()
export class VarietyService {
  constructor(
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,

    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
  ) {}
  //Récupération des variétées
  async geteAllVarietiesByVegetableId(vegetableId: number) {
    return this.varietyRepository.find({
      where: {
        vegetable: {
          id_vegetable: vegetableId,
        },
      },
      relations: ['vegetable'],
    });
  }

  async getVarietyById(id: number) {
    return this.varietyRepository.find({
      where: { id_variety: id },
      relations: ['vegetable'],
    });
  }

  // Création d'une variété
  // async createvariety(payload: CreateVarietyDTO) {
  //   // Vérifier si le legume existe
  //   const vegetable = await this.vegetableRepository.findOne({
  //     where: { id_vegetable: payload.id_vegetable },
  //   });

  //   if (!vegetable) {
  //     throw new NotFoundException('Vegetable not found'); // Stop Function
  //   }

  //   // Créer la variété avec son nom
  //   const variety = this.varietyRepository.create({
  //     ...payload,
  //     vegetable,
  //   });

  //   return this.varietyRepository.save(variety);
  // }

  //   // si tu veux récupérer la relation existante
  async updateVariety(payload: UpdateVarietyDTO) {
    // 1. Trouver la variété
    const variety = await this.varietyRepository.findOne({
      where: { id_variety: payload.id_variety },
      relations: ['vegetable'],
    });

    if (!variety) {
      throw new NotFoundException('Variety not found');
    }

    // 2. Mettre à jour uniquement les champs autorisés
    variety.variety_name = payload.variety_name;

    // 4. Sauvegarder
    return this.varietyRepository.save(variety);
  }

  /**
   * Suppression d’une famille
   */
  async delVariety(id: number): Promise<{ msg: string }> {
    const variety = await this.varietyRepository.findOne({
      where: { id_variety: id },
    });

    if (!variety) {
      throw new NotFoundException('Variété introuvable');
    }

    await this.varietyRepository.delete({ id_variety: id });

    return { msg: 'Variété supprimée avec succès' };
  }

  async getVarietiesVegetable(id: string | number): Promise<Variety[]> {
    // Convertit l'id en nombre si nécessaire
    const vegetableId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(vegetableId)) {
      throw new Error(`Invalid vegetable ID: ${id}`);
    }

    const veg = await this.vegetableRepository.findOne({
      where: { id_vegetable: vegetableId },
      relations: ['varieties'],
    });

    if (!veg) {
      throw new NotFoundException(`Vegetable with ID ${vegetableId} not found`);
    }

    return veg.varieties;
  }
}
