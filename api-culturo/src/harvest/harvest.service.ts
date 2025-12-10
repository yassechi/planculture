import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHarvestDTO } from './dtos/create.harvest.dto';
import { UpdateHarvestDTO } from './dtos/update.harvest.dto';
import { Harvest } from 'src/entities/harvest.entity';
import { Section } from 'src/entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User_ } from 'src/entities/user_.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,

    @InjectRepository(User_)
    private readonly userRepository: Repository<User_>,

    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  /**
   *
   * @returns
   */
  async findAll(): Promise<Harvest[]> {
    return this.harvestRepository.find({ relations: ['user_', 'section'] });
  }

  /**
   *
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({
      where: { id_harvest: id },
      relations: ['user_', 'section'],
    });
    if (!harvest) throw new NotFoundException('Harvest not found');
    return harvest;
  }

  /**
   *
   * @param dto
   * @returns
   */
  async create(dto: CreateHarvestDTO): Promise<Harvest> {
    const user = await this.userRepository.findOne({
      where: { id_user: dto.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const section = await this.sectionRepository.findOne({
      where: { id_section: dto.id_section },
    });
    if (!section) throw new NotFoundException('Section not found');

    const harvest = this.harvestRepository.create({
      harvest_date: dto.harvest_date,
      quantity: dto.quantity,
      quantity_unit: dto.quantity_unit,
      user_: user,
      section: section,
    });

    return this.harvestRepository.save(harvest);
  }

  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  async update(id: number, dto: UpdateHarvestDTO): Promise<Harvest> {
    const harvest = await this.findOne(id);

    if (dto.id_user) {
      const user = await this.userRepository.findOne({
        where: { id_user: dto.id_user },
      });
      if (!user) throw new NotFoundException('User not found');
      harvest.user_ = user;
    }

    if (dto.id_section) {
      const section = await this.sectionRepository.findOne({
        where: { id_section: dto.id_section },
      });
      if (!section) throw new NotFoundException('Section not found');
      harvest.section = section;
    }

    Object.assign(harvest, dto);
    return this.harvestRepository.save(harvest);
  }

  /**
   *
   * @param id
   */
  async remove(id: number): Promise<void> {
    const harvest = await this.findOne(id);
    await this.harvestRepository.remove(harvest);
  }
}
