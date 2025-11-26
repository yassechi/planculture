import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vegetable } from './vegetable.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id_price: number;
  @Column()
  vegetable_price: number;
  @Column()
  price_date: Date;
  @Column()
  active_price: boolean;


  @ManyToOne(()=> Vegetable, (vegetable) => vegetable.prices)
  vegetable : Vegetable;


}
