import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Recolte } from './recolte.entity';

@Entity({ name: 'utilisateur' })
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id_utilisateur: number;

  @Column({ type: 'varchar', length: '100' })
  nom: string;

  @Column({ type: 'varchar', length: '100' })
  prenom: string;

  @Column({ type: 'varchar', length: '150', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  hpassword: string;

  @Column({ type: 'varchar' })
  telephone: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ name: 'id_role', nullable: false })
  id_role: number;

  @ManyToOne(() => Role, (role) => role.utilisateurs)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @ManyToMany(() => Recolte, (recoltes) => recoltes.utilisateurs)
  recoltes: Recolte[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
