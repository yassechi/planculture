import { Board } from 'src/entities/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Amendement } from './amendement.entity';

@Entity('amended')
export class Amended {
  @PrimaryGeneratedColumn()
  id_amended: number;

  @Column({ type: 'date' })
  amendment_date: Date;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Board, (board) => board.amendeds, { eager: true, nullable: true }) 
  @JoinColumn({ name: 'id_board' })
  board: Board | null; 

  @ManyToOne(() => Amendement, (amendement) => amendement.amendeds, { nullable: true }) 
  @JoinColumn({ name: 'amendement_id' })
  amendement: Amendement | null; 
}