import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Amendement } from './entities/amendement.entity';
import { Exploitation } from './entities/exploitation.entity';
import { SectionPlan } from './entities/section_plan.entity';
import { Role } from './entities/role.entity';
import { Section } from './entities/section.entity';
import { Sole } from './entities/sole.entity';
import { LegumeModule } from './vegetables/legume.module';
import { ExploitationModule } from './exploitations/exploitation.module';
import { Watering } from './entities/watering.entity';
import { Order } from './entities/order.entity';
import { Board } from './entities/board.entity';
import { Family } from './entities/family.entity';
import { Vegetable } from './entities/vegetable.entity';
import { Harvest } from './entities/harvest.entity';
import { User_ } from './entities/user_.entity';
import { OrderDetail } from './entities/order-details.entity';
import { Family_importance } from './entities/family_importance.entity';
import { Price } from './entities/price.entity';
import { Amended } from './entities/amended.entity';
import { Treated } from './entities/treated.entity';
import { Treatment } from './entities/treatment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Amendement,
        Watering,
        Order,
        Exploitation,
        Family,
        Vegetable,
        Board,
        SectionPlan,
        Harvest,
        Role,
        Section,
        Sole,
        User_,
        OrderDetail,
        Family_importance,
        Price,
        Amended,
        Board,
        Treated,
        Treatment,
      ],
      // autoLoadEntities: true,
      synchronize: true,
      // synchronize: false // pour generer le script de la DB
    }),
    UsersModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    ExploitationModule,
    LegumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
