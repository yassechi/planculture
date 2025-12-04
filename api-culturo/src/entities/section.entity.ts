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
import { Board } from './board.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id_section: number;

  @Column()
  section_number: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column()
  quantity_planted : number;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @OneToMany(() => Harvest, (harvest) => harvest.section)
  harvets: Harvest[];

  @ManyToOne(() => Vegetable, (vegetable) => vegetable.sections)
  vegetable: Vegetable;

  @OneToMany(() => Watering, (watering) => watering.section)
  waterings: Watering[];

  @ManyToOne(() => Section, (section) => section.sectionPlan)
  sectionPlan : SectionPlan;

  @ManyToOne(() => Board, (board) => board.sections)
board: Board;
}
