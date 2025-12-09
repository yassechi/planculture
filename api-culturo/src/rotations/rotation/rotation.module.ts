// Exemple de rotation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RotationService } from './rotation.service';
import { RotationController } from './rotation.controller';

// Importez toutes les entités impliquées dans la requête de jointure
import { Section } from 'src/entities/section.entity';
import { Sole } from 'src/entities/sole.entity'; // 🚨 DOIT ÊTRE ICI
import { Board } from 'src/entities/board.entity';
import { SectionPlan } from 'src/entities/section_plan.entity';
import { Vegetable } from 'src/entities/vegetable.entity';

@Module({
  imports: [
    // 🚨 ASSUREZ-VOUS QUE SOLE EST DANS CETTE LISTE
    TypeOrmModule.forFeature([
      Section,
      Sole,
      Board,
      SectionPlan,
      Vegetable,
      // ... autres entités si elles sont utilisées
    ]),
  ],
  controllers: [RotationController],
  providers: [RotationService],
})
export class RotationModule {}
