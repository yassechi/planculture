import { HarvestController } from './harvest.controller';
import { Section } from 'src/entities/section.entity';
import { Harvest } from 'src/entities/harvest.entity';
import { HarvestService } from './harvest.service';
import { User_ } from 'src/entities/user_.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Section, User_])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
