import { TypeAmendement } from './typeAmendement.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Amendement {
  @PrimaryGeneratedColumn()
  id_amendement: number;

  @Column({ type: 'timestamp' })
  date_amendement: Date;

  @Column() ////
  nom_amendement: string;

  @ManyToOne(() => Section, (section) => section.amendements)
  section: Section;

  @ManyToOne(
    () => TypeAmendement,
    (typeAmendement) => typeAmendement.amendements,
  )
  typeAmendement: TypeAmendement;
}
