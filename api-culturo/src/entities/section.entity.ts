import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SectionPlan } from './section_plan.entity';
import { Watering } from './watering.entity';
import { Harvest } from './harvest.entity';
import { Vegetable } from './vegetable.entity';
import { Variety } from './variety.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id_section: number;

    @Column()
    section_number: number;

    @Column({ type: 'date' })
    start_date: Date;

    @Column()
    quantity_planted: number;

    @Column({ type: 'date' })
    end_date: Date;

    @Column()
    section_active: boolean;

    @Column()
    unity: string;

    @Column({ name: 'id_vegetable' }) 
    id_vegetable_fk: number; 
    
    @Column({ name: 'id_variety', nullable: true }) 
    id_variety_fk: number | null; 

    @ManyToOne(() => SectionPlan, (sectionPlan) => sectionPlan.sections)
    sectionPlan: SectionPlan;

    @ManyToOne(() => Vegetable, (vegetable) => vegetable.sections, { nullable: true })
    @JoinColumn({ name: 'id_vegetable' })
    vegetable?: Vegetable; 

    @ManyToOne(() => Variety, (variety) => variety.sections, { nullable: true })
    @JoinColumn({ name: 'id_variety' }) 
    variety?: Variety; 
    
    @OneToMany(() => Harvest, (harvest) => harvest.section)
    harvets: Harvest[];

    @OneToMany(() => Watering, (watering) => watering.section)
    waterings: Watering[];
}