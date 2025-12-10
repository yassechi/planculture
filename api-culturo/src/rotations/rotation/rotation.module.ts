import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { Sole } from 'src/entities/sole.entity';
import { Board } from 'src/entities/board.entity';
import { SectionPlan } from 'src/entities/section_plan.entity';
import { Vegetable } from 'src/entities/vegetable.entity';
import { RotationController } from './rotation.controller';
import { RotationService } from './rotation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Sole, Board, SectionPlan, Vegetable]),
    // 💡 SUPPRIMÉ : VegetableModule (on n'en a pas besoin)
  ],
  controllers: [RotationController],
  providers: [RotationService],
  exports: [RotationService],
})
export class RotationModule {}
