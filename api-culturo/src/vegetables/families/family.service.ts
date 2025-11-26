import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/entities/family.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  /**
   * 
   * @returns 
   */
  public async getAllFamilies() {
    return await this.familyRepository.find();
  }

  /**
   *
   * @param id
   * @returns
   */
  async getFamilyById(id: number): Promise<Family | null> {
    return this.familyRepository.findOneBy({ id_family: id });
  }

  /**
   *
   * @param id
   * @returns
   */
  async delFamily(id: number): Promise<{ msg: string }> {
    const user = await this.familyRepository.findOne({
      where: { id_family: id },
    });

    if (!user) {
      throw new NotFoundException('Famille introuvable');
    }
    await this.familyRepository.delete({ id_family: id });
    return { msg: 'Famille supprimé avec succès' };
  }
}
