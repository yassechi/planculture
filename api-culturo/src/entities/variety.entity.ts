import { Family_importance } from './family_importance.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vegetable } from './vegetable.entity';

@Entity()
export class Variety {
  @PrimaryGeneratedColumn()
  id_family: number;

  @ManyToOne(() => Vegetable)
  vegetable: Vegetable;

  @Column()
  variety_name: string;

  @ManyToOne(
    () => Family_importance,
    (family_importance) => family_importance.id_family_importance,
  )
  family_importance: Family_importance;

  @ManyToOne(() => Vegetable, (vegetable) => vegetable.varieties)
  vegetables: Vegetable[];
}
