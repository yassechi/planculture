import { Section } from './section.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Recolte {
  @PrimaryGeneratedColumn()
  id_recolte: number;

  @Column({ type: 'timestamp' })
  date_recolte: Date;

  @Column()
  quantite: number;

  @Column()
  qualite: string;

  @OneToOne(() => Section, (section) => section.recolte)
  section: Section;

  @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.recoltes)
  utilisateurs: Utilisateur[];

  // recoltes : Recolte[]
}
