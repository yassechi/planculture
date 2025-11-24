import { Section } from './section.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Arrosage {
  @PrimaryGeneratedColumn()
  id_arrosage: number;

  @Column({ type: 'timestamp' })
  date_arrosage: Date;

  @Column()
  quantite: number;

  @ManyToOne(() => Section, (section) => section.arrosages)
  section: Section;
}
