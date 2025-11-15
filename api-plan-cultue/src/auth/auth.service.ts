import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from './dtos/profile.dto';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { User } from 'src/entities/users';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async authentification(authDTO: AuthDto): Promise<any> {
    const dbUsers = await this.authRepository.find();
    const user = dbUsers.find(
      (user) =>
        user.email === authDTO.email && user.password === authDTO.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const profile = new ProfileDto(user);
    console.log(profile); //////////////////

    const token = sign({ ...profile }, 'secretKey');
    console.log(token); //////////////////

    return { profile, token };
  }
}
