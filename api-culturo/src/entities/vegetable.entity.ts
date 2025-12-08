import { OrderDetail } from './order-details.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './section.entity';
import { Family } from './family.entity';
import { Price } from './price.entity';
import { Variety } from './variety.entity';

@Entity()
export class Vegetable {
  @PrimaryGeneratedColumn()
  id_vegetable: number;

  @Column()
  variety_name: string;

  @Column()
  vegetable_name: string;

  @Column()
  planting_season: string;

  @Column()
  harvest_season: string;

  @Column()
  harvest_duration_min: number;

  @Column()
  harvest_duration_max: number;

  @Column()
  inrow_distance: number;

  @Column()
  estimated_yield: number;

  @ManyToOne(() => Family, (family) => family.id_family)
  family: Family;

  @OneToMany(() => Price, (price) => price.vegetable)
  prices: Price[];

  @OneToMany(() => Section, (section) => section.vegetable)
  sections: Section[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.vegetable)
  orderDetails: OrderDetail[];

  @OneToMany(() => Variety, (varity) => varity.vegetable)
  varieties: Variety[];
}
