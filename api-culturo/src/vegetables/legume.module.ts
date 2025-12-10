import { Family_importance } from 'src/entities/family_importance.entity';
import { VegetableController } from './vegetables/vegetable.controller';
import { FamilyController } from './families/family.controller';
import { VegetableService } from './vegetables/vegetable.service';
import { Vegetable } from 'src/entities/vegetable.entity';
import { FamilyService } from './families/family.service';
import { Section } from 'src/entities/section.entity';
import { Family } from 'src/entities/family.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Family, Vegetable, Family_importance, Section]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  controllers: [FamilyController, VegetableController],
  providers: [VegetableService, FamilyService],
})
export class LegumeModule {}
