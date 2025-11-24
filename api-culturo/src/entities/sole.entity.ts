import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exploitation } from './exploitation.entity';
import { Planche } from './planche.entity';

@Entity()
export class Sole {
  @PrimaryGeneratedColumn()
  id_sole: number;

  @Column()
  numero: number;

  @Column()
  nom_culture: string;

  @Column('json', { nullable: true })
  photos: string[];

  @ManyToOne(() => Exploitation, (exploitation) => exploitation.soles)
  exploitation: Exploitation;

  @OneToMany(() => Planche, (planche) => planche.sole)
  planches: Planche[];
}
