import { SectionPlan } from 'src/entities/section_plan.entity';
import { RotationController } from './rotation.controller';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Section } from 'src/entities/section.entity';
import { RotationService } from './rotation.service';
import { Board } from 'src/entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sole } from 'src/entities/sole.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Sole, Board, SectionPlan, Vegetable]),
  ],
  controllers: [RotationController],
  providers: [RotationService],
})
export class RotationModule {}
