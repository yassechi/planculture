import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User_ } from './entities/user_.entity';
import { Role } from './entities/role.entity';
import { Amendement } from './entities/amendement.entity';
import { Watering } from './entities/watering.entity';
import { Order } from './entities/order.entity';
import { Exploitation } from './entities/exploitation.entity';
import { Family } from './entities/family.entity';
import { Vegetable } from './entities/vegetable.entity';
import { Board } from './entities/board.entity';
import { SectionPlan } from './entities/section_plan.entity';
import { Harvest } from './entities/harvest.entity';
import { Section } from './entities/section.entity';
import { Sole } from './entities/sole.entity';
import { OrderDetail } from './entities/order-details.entity';
import { Family_importance } from './entities/family_importance.entity';
import { Price } from './entities/price.entity';
import { Amended } from './entities/amended.entity';
import { Treated } from './entities/treated.entity';
import { Treatment } from './entities/treatment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'culturo',
  entities: [
    User_,
    Role,
    Amendement,
    Watering,
    Order,
    Exploitation,
    Family,
    Vegetable,
    Board,
    SectionPlan,
    Harvest,
    Section,
    Sole,
    OrderDetail,
    Family_importance,
    Price, 
    Amended,
    Treated,
    Treatment
  ],
  synchronize: false, // IMPORTANT ici, on veut juste générer le SQL
  logging: false,
});
