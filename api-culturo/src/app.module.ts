import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Utilisateur } from './entities/utilisateur.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Amendement } from './entities/amendement.entity';
import { Arrosage } from './entities/arrosage.entity';
import { CommandeFournisseur } from './entities/commandeFournisseur.entity';
import { Exploitation } from './entities/exploitation.entity';
import { Famille } from './entities/famille.entity';
import { Legume } from './entities/legume.entity';
import { Planche } from './entities/planche.entity';
import { PlanSection } from './entities/planSection.entity';
import { Recolte } from './entities/recolte.entity';
import { Role } from './entities/role.entity';
import { Section } from './entities/section.entity';
import { Sole } from './entities/sole.entity';
import { TypeAmendement } from './entities/typeAmendement.entity';

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
        Arrosage,
        CommandeFournisseur,
        Exploitation,
        Famille,
        Legume,
        Planche,
        PlanSection,
        Recolte,
        Role,
        Section,
        Sole,
        TypeAmendement,
        Utilisateur,
      ],
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
