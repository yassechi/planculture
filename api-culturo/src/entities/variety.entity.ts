import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vegetable } from './vegetable.entity';

@Entity()
export class Variety {
  @PrimaryGeneratedColumn()
  id_variety: number;

  @Column()
  variety_name: string;

  @Column()
  id_vegetable: number;

  @ManyToOne(() => Vegetable, (vegetable) => vegetable.varieties)
  @JoinColumn({ name: 'id_vegetable' })
  vegetable: Vegetable;
}
