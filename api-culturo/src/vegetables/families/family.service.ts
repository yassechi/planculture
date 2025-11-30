import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/entities/family.entity';
import { Family_importance } from 'src/entities/family_importance.entity';
import { Repository } from 'typeorm';
import { CreateFamilyDTO } from './dtos/create.family.dto';
import { UpdateFamilyDTO } from './dtos/update.family.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,

    @InjectRepository(Family_importance)
    private readonly importanceRepository: Repository<Family_importance>,
  ) {}

  /**
   * Retourne toutes les familles
   */
  public async getAllFamilies() {
    return await this.familyRepository.find({
      relations: ['family_importance', 'vegetables'],
    });
  }

  /**
   * Retourne une famille par ID
   */
  async getFamilyById(id: number): Promise<Family | null> {
    return this.familyRepository.findOne({
      where: { id_family: id },
      relations: ['family_importance', 'vegetables'],
    });
  }

  /**
   * Création d’une famille
   */
  async createFamily(payload: CreateFamilyDTO): Promise<Family> {
    const { family_name, id_family_importance } = payload;

    const importance = await this.importanceRepository.findOne({
      where: { id_family_importance },
    });

    if (!importance) {
      throw new NotFoundException(
        `Family importance with id ${id_family_importance} not found`,
      );
    }

    const family = this.familyRepository.create({
      family_name,
      family_importance: importance,
    });

    return await this.familyRepository.save(family);
  }

  /**
   * Mise à jour d’une famille
   */
  async updateFamily(payload: UpdateFamilyDTO): Promise<Family> {
    const { id_family, id_family_importance, ...rest } = payload;

    const family = await this.familyRepository.findOne({
      where: { id_family },
    });

    if (!family) {
      throw new NotFoundException(`Family with id ${id_family} not found`);
    }

    // Changer importance si demandé
    if (id_family_importance) {
      const importance = await this.importanceRepository.findOne({
        where: { id_family_importance },
      });

      if (!importance) {
        throw new NotFoundException(
          `Family importance with id ${id_family_importance} not found`,
        );
      }

      family.family_importance = importance;
    }

    Object.assign(family, rest);
    return await this.familyRepository.save(family);
  }

  /**
   * Suppression d’une famille
   */
  async delFamily(id: number): Promise<{ msg: string }> {
    const family = await this.familyRepository.findOne({
      where: { id_family: id },
    });

    if (!family) {
      throw new NotFoundException('Famille introuvable');
    }

    await this.familyRepository.delete({ id_family: id });

    return { msg: 'Famille supprimée avec succès' };
  }
}
