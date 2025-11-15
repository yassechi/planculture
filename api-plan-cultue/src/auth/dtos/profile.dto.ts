import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../interfaces/roles';
import { User } from 'src/entities/users';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  readonly photo: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Role;

  constructor(user : User) {
    this.id = user.id.toString();
    this.email = user.email;
    this.photo = user.photo;
    this.role = user.role;
  }
}
