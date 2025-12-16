// src/harvest/harvest.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { Harvest } from '../entities/harvest.entity';
import { UsersModule } from '../users/users.module';
import { User_ } from '../entities/user_.entity';
import { Section } from '../entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, User_, Section]), UsersModule],
  controllers: [HarvestController],
  providers: [HarvestService],
  exports: [HarvestService],
})
export class HarvestModule {}
