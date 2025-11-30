import { Module } from '@nestjs/common';
import { FamilyController } from './families/family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Family } from 'src/entities/family.entity';
import { Vegetable } from 'src/entities/vegetable.entity';
import { ConfigService } from '@nestjs/config';
import { VegetableController } from './vegetables/vegetable.controller';
import { VegetableService } from './vegetables/vegetable.service';
import { FamilyService } from './families/family.service';
import { Family_importance } from 'src/entities/family_importance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Family, Vegetable, Family_importance]),
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
