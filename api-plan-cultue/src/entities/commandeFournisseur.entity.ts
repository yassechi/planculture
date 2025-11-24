import { Legume } from './legume.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommandeFournisseur {
  @PrimaryGeneratedColumn()
  id_commande_fournisseur: number;

  @Column({ type: 'timestamp' })
  date_commande: Date;

  @Column({ type: 'timestamp' })
  date_livraison: Date;

  @ManyToMany(() => Legume, (legumes) => legumes.commandeFournisseurs)
  legumes: Legume[];
}
