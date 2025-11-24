import { Section } from './section.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planche } from './planche.entity';

@Entity()
export class PlanSection {
  @PrimaryGeneratedColumn()
  id_plan: number;

  @Column()
  annee: number;

  @Column()
  nbr_section: number;

  @ManyToOne(() => Planche, (planche) => planche.plans_sections)
  planche: Planche;

  @OneToMany(() => Section, (sections) => sections.paln_section)
  sections: Section[];
}
