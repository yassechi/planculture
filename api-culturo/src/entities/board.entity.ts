import { SectionPlan } from './section_plan.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sole } from "./sole.entity";
import { Amended } from './amended.entity';
import { Treated } from './treated.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id_board : number;

    @Column()
    board_name : string;

    @Column()
    board_width : number;

    @Column()
    board_lenght : number;

    @Column()
    board_active : boolean;

    @ManyToOne(() => Sole, (sole) => sole.boards)
    sole : Sole;

    @ManyToMany(()=> SectionPlan, (sectionPlan) => sectionPlan.boards)
    sectionPlans : SectionPlan[]

    @OneToMany(()=>Amended, (amended) => amended.board)
    amendeds : Amended[];

    @OneToMany(()=> Treated, (treated) => treated.board)
    treateds : Treated[];
}