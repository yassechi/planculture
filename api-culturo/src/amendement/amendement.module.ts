// src/amendement/amendement.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmendedController } from './amendement.controller';
import { AmendedService } from './amendement.service';
import { Amended } from '../entities/amended.entity';
import { Board } from '../entities/board.entity'; 
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amended, Board]), 
    UsersModule,
  ],
  controllers: [AmendedController],
  providers: [AmendedService],
  exports: [AmendedService],
})
export class AmendementModule {}