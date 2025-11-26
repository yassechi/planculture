import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section.entity';
import { Amended } from './amended.entity';

@Entity()
export class Amendement {
  @PrimaryGeneratedColumn()
  id_amendement: number;

  @Column()
  amendement_name: string;

  @OneToMany(() => Amended, (amended) => amended.amendement)
  amendeds: Amended[];
}
