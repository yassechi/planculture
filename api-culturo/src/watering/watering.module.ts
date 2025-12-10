import { WateringController } from './watering.controller';
import { Watering } from 'src/entities/watering.entity';
import { Section } from 'src/entities/section.entity';
import { WateringService } from './watering.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Watering, Section])],
  controllers: [WateringController],
  providers: [WateringService],
})
export class WateringModule {}
