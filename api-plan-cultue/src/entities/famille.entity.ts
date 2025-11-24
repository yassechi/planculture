import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Legume } from './legume.entity';

@Entity()
export class Famille {
  @PrimaryGeneratedColumn()
  id_famille: number;

  @Column()
  nom: string;

  @Column()
  importance: string;

  @OneToMany(() => Legume, (legumes) => legumes.famille)
  legumes: Legume[];
}
