// dtos/update-user.dto.ts
import {
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDTO {
  @IsNumber()
  @ApiProperty({ description: '' })
  id_utilisateur: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  nom?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  prenom?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: '' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  hpassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  telephone?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '' })
  id_role?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '' })
  photo?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: '' })
  is_active?: boolean;
}
