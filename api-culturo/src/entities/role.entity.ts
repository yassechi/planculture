import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id_role: number;

  @Column()
  libelle: string;

  @Column()
  description: string;

  @OneToMany(() => Utilisateur, (utilisateur) => utilisateur.role)
  utilisateurs: Utilisateur[];
}
