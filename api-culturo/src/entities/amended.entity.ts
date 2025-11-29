import { Board } from 'src/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Amendement } from './amendement.entity';

@Entity({})
export class Amended {
  @PrimaryGeneratedColumn()
  id_treated: number;

  @Column()
  amendement_date: Date;
  @Column()
  treatment_quantity: number;
  @Column()
  treatment_unit: string;

  @ManyToOne(() => Board, (board) => board.amendeds)
  board: Board;

  @ManyToOne(() => Amendement, (amendement) => amendement.amendeds)
  amendement: Amendement;
}
