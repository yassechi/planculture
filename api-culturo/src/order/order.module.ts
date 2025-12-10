import { Section } from 'src/entities/section.entity';
import { OrderController } from './order.controller';
import { Order } from 'src/entities/order.entity';
import { User_ } from 'src/entities/user_.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User_, Section])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
