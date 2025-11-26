import { SectionPlan } from './section_plan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Watering } from './watering.entity';
import { Harvest } from './harvest.entity';
import { Vegetable } from './vegetable.entity';

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

  @OneToMany(() => Harvest, (harvest) => harvest.section)
  harvets: Harvest[];

  @ManyToOne(() => Vegetable, (vegetable) => vegetable.sections)
  vegetable: Vegetable;

  @OneToMany(() => Watering, (watering) => watering.section)
  waterings: Watering[];

  @ManyToOne(() => Section, (section) => section.sectionPlan)
  sectionPlan : SectionPlan;
}
