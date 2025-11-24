import { CommandeFournisseur } from './commandeFournisseur.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './section.entity';
import { Famille } from './famille.entity';

@Entity()
export class Legume {
  @PrimaryGeneratedColumn()
  id_legume: number;

  @Column()
  nom: string;

  @Column()
  saison_recolte: string;

  @Column()
  duree_culture_estimee_min: number;

  @Column()
  duree_culture_estimee_max: number;

  @Column()
  distance_rang: number;

  @OneToMany(() => Section, (sections) => sections.legume)
  sections: Section[];

  @ManyToOne(() => Famille, (famille) => famille.legumes)
  famille: Famille;

  @ManyToMany(
    () => CommandeFournisseur,
    (commandeFournisseur) => commandeFournisseur.legumes,
  )
  commandeFournisseurs: CommandeFournisseur[];
}
