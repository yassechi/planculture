import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { LegumeModule } from './vegetables/legume.module';
import { ExploitationModule } from './exploitations/exploitation.module';
import { AppDataSourceOptions } from './data-source';

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
  ],
})
export class AppModule {}
