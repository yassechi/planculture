import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty({ description: "The user's surname" })
  user_last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty({ description: "The user's first name" })
  user_first_name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ description: "The user's email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  @ApiProperty({ description: "The user's password" })
  hpassword: string;

  @IsString()
  @MaxLength(16)
  @ApiProperty({ description: "The user's telephone number" })
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "The role ID of this user" })
  id_role: number;

  @IsBoolean()
  @ApiProperty({ description: "Active or inactive user" })
  user_active: boolean;

  @IsString()
  @ApiProperty({ description: "The path to the user's photo" })
  path_photo: string;
}


// @PrimaryGeneratedColumn()
//   id_user: number;

//   @Column({ type: 'varchar', length: '100' })
//   user_first_name: string;

//   @Column({ type: 'varchar', length: '100' })
//   user_last_name: string;

//   @Column({ type: 'varchar', length: '150', unique: true })
//   email: string;

//   @Column({ type: 'varchar' })
//   hpassword: string;

//   @Column({ type: 'varchar' })
//   phone: string;

//   @Column({ type: 'varchar', nullable: true })
//   path_photo: string;

//   @Column({ type: 'boolean', default: true })
//   user_active: boolean;

//   @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
//   created_at: Date;