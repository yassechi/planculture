import { ExploitationModule } from './exploitations/exploitation.module';
import { RotationModule } from './rotations/rotation/rotation.module';
import { AmendementModule } from './amendement/amendement.module';
import { TreatmentModule } from './treatment/treatment.module';
import { WateringModule } from './watering/watering.module';
import { LegumeModule } from './vegetables/legume.module';
import { HarvestModule } from './harvest/harvest.module';
import { AppDataSourceOptions } from './data-source';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),

    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),

    UsersModule,
    LegumeModule,
    ExploitationModule,
    RotationModule,
    AmendementModule,
    HarvestModule,
    OrderModule,
    TreatmentModule,
    WateringModule,
    TreatmentModule,
  ],
})
export class AppModule {}
