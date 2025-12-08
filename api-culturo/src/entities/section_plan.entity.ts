import { Board } from './board.entity';
import { Section } from './section.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SectionPlan {
  @PrimaryGeneratedColumn()
  id_section_plan: number;

  @Column()
  creation_date: Date;

  @Column()
  number_of_section: number;

  @Column()
  section_plan_active: number;

  @OneToMany(() => Section, (section) => section.sectionPlan)
  sections: Section[];

  @ManyToMany(() => Board, (board) => board.sectionPlans)
  board: Board;
}
