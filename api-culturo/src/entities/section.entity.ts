import { Amendement } from './amendement.entity';
import { Recolte } from './recolte.entity';
import { Legume } from './legume.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanSection } from './planSection.entity';
import { Arrosage } from './arrosage.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id_section: number;

  @Column()
  numero_section: number;

  @Column({ type: 'timestamp' })
  num_semaine_debut: Date;

  @Column({ type: 'timestamp' })
  num_semaine_fin: Date;

  @OneToMany(() => Legume, (legume) => legume.sections)
  legume: Legume;

  @OneToOne(() => Recolte, (recolte) => recolte.section)
  recolte: Recolte;

  @ManyToOne(() => PlanSection, (planSection) => planSection.sections)
  paln_section: PlanSection;

  @OneToMany(() => Arrosage, (arrosages) => arrosages.section)
  arrosages: Arrosage[];

  @OneToMany(() => Amendement, (amendements) => amendements.section)
  amendements: Amendement[];
}
