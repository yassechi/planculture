import { Role } from 'src/auth/interfaces/roles';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  role: Role;
}
