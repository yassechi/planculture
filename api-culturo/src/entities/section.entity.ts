import { SectionPlan } from './section_plan.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  section_number: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column()
  quantity_planted: number;

  @Column({ type: 'date' })
  end_date: Date;

  @Column()
  section_active: boolean;

  @OneToMany(() => Harvest, (harvest) => harvest.section)
  harvets: Harvest[];

  @ManyToOne(() => Vegetable, (vegetable) => vegetable.sections)
  @JoinColumn({ name: 'id_vegetable' })
  vegetable: Vegetable;

  @OneToMany(() => Watering, (watering) => watering.section)
  waterings: Watering[];

  @ManyToOne(() => SectionPlan, (sectionPlan) => sectionPlan.sections)
  sectionPlan: SectionPlan;
}
