import { TreatedController } from './treatment.controller';
import { Treatment } from 'src/entities/treatment.entity';
import { Treated } from 'src/entities/treated.entity';
import { TreatedService } from './treatment.service';
import { Board } from 'src/entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Treated, Board, Treatment])],
  controllers: [TreatedController],
  providers: [TreatedService],
  exports: [TreatedService],
})
export class TreatmentModule {}
