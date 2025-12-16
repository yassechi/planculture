import { Family_importance } from './entities/family_importance.entity';
import { OrderDetail } from './entities/order-details.entity';
import { Exploitation } from './entities/exploitation.entity';
import { SectionPlan } from './entities/section_plan.entity';
import { Amendement } from './entities/amendement.entity';
import { Vegetable } from './entities/vegetable.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Treatment } from './entities/treatment.entity';
import { Watering } from './entities/watering.entity';
import { Harvest } from './entities/harvest.entity';
import { Section } from './entities/section.entity';
import { Amended } from './entities/amended.entity';
import { Treated } from './entities/treated.entity';
import { Family } from './entities/family.entity';
import { Price } from './entities/price.entity';
import { User_ } from './entities/user_.entity';
import { Order } from './entities/order.entity';
import { Board } from './entities/board.entity';
import { Sole } from './entities/sole.entity';
import { Role } from './entities/role.entity';
import { Logger } from '@nestjs/common';
import 'reflect-metadata';
import { Variety } from './entities/variety.entity';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // host: process.env.DB_HOST,
  // host: "culturo-server.database.windows.net",
  host: "localhost",
  port: parseInt( '5432'),
  // username: process.env.DB_USER,
  // username: 'culturo',
  username: 'postgres',
  // password: process.env.DB_PASSWORD,
  // password: 'Playzone1234=',
  password: 'root',
  // database: process.env.DB_NAME,
  // database: 'culturoDB',
  database: 'culturo',
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
    Treatment,
    Variety,
  ],
  synchronize: true, // dev uniquement
};

export const AppDataSource = new DataSource(AppDataSourceOptions);

// Test de connexion
async function testConnection() {
  const logger = new Logger('DataSourceTest');

  try {
    await AppDataSource.initialize();
    logger.log('Database connected successfully');
    await AppDataSource.destroy();
  } catch (error) {
    logger.error('Failed to connect to the database');
    logger.error(error);
  }
}

testConnection();
