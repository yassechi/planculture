import { Amendement } from './amendement.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeAmendement {
  @PrimaryGeneratedColumn()
  id_type_amendement: number;

  @Column()
  type_amendement: string;

  @OneToMany(() => Amendement, (amendement) => amendement.typeAmendement)
  amendements: Amendement[];
}
