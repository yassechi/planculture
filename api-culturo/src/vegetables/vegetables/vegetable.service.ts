import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VegetableService {
  constructor(
    @InjectRepository(Vegetable)
    private readonly legumeRepository: Repository<Vegetable>,
  ) {}

  public async getAllvegetables() {
    return await this.legumeRepository.find();
  }

  /**
   *
   * @param id
   * @returns
   */
  async getVegetableById(id: number): Promise<Vegetable | null> {
    return this.legumeRepository.findOneBy({ id_vegetable: id });
  }

  /**
   *
   * @param id
   * @returns
   */
  async delVegetable(id: number): Promise<{ msg: string }> {
    const user = await this.legumeRepository.findOne({
      where: { id_vegetable: id },
    });

    if (!user) {
      throw new NotFoundException('Legume introuvable');
    }
    await this.legumeRepository.delete({ id_vegetable: id });
    return { msg: 'Legume supprimé avec succès' };
  }
}
