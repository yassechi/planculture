import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sole } from './sole.entity';
import { PlanSection } from './planSection.entity';

@Entity()
export class Planche {
  @PrimaryGeneratedColumn()
  id_planche: number;

  @Column()
  libelle: string;

  @Column()
  code_planche: string;

  @ManyToOne(() => Sole, (sole) => sole.planches)
  sole: Sole;

  @OneToMany(() => PlanSection, (plans_sections) => plans_sections.planche)
  plans_sections: PlanSection;
}
