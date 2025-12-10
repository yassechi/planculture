import { AmendedController } from './amendement.controller';
import { AmendedService } from './amendement.service';
import { Amended } from 'src/entities/amended.entity';
import { Board } from 'src/entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Amended])],
  controllers: [AmendedController],
  providers: [AmendedService],
})
export class AmendementModule {}
