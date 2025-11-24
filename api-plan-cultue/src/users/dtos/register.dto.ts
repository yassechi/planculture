import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nom: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  prenom: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  hpassword: string;

  @IsString()
  @MaxLength(16)
  telephone: string;

  @IsNumber()
  @IsNotEmpty()
  id_role: number;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  photo: string;
}
