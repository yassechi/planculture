import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from 'src/entities/users';
import { Module } from '@nestjs/common';



@Module({
   imports: [
    TypeOrmModule.forFeature([User]), // <-- rend Repository<User> injectable
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
