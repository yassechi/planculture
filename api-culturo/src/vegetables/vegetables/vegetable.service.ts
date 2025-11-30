import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Family } from 'src/entities/family.entity';
import { CreateVegetableDTO } from './dtos/create.vegetable.dto';
import { UpdateVegetableDTO } from './dtos/update.vegetable.dto';

@Injectable()
export class VegetableService {
  constructor(
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  async getAllVegetables() {
    return this.vegetableRepository.find({ relations: ['family', 'prices', 'sections', 'orderDetails'] });
  }

  async getVegetableById(id: number) {
    return this.vegetableRepository.findOne({
      where: { id_vegetable: id },
      relations: ['family', 'prices', 'sections', 'orderDetails'],
    });
  }

  async createVegetable(payload: CreateVegetableDTO) {
    const family = await this.familyRepository.findOne({ where: { id_family: payload.id_family } });
    if (!family) throw new NotFoundException('Family not found');

    const vegetable = this.vegetableRepository.create({
      ...payload,
      family,
    });

    return this.vegetableRepository.save(vegetable);
  }

  async updateVegetable(payload: UpdateVegetableDTO) {
    const vegetable = await this.vegetableRepository.findOne({ where: { id_vegetable: payload.id_vegetable } });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    if (payload.id_family) {
      const family = await this.familyRepository.findOne({ where: { id_family: payload.id_family } });
      if (!family) throw new NotFoundException('Family not found');
      vegetable.family = family;
    }

    Object.assign(vegetable, payload);
    return this.vegetableRepository.save(vegetable);
  }

  async delVegetable(id: number) {
    const vegetable = await this.vegetableRepository.findOne({ where: { id_vegetable: id } });
    if (!vegetable) throw new NotFoundException('Vegetable not found');

    await this.vegetableRepository.delete({ id_vegetable: id });
    return { msg: 'Vegetable deleted successfully' };
  }
}
