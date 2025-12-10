import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAmendementDTO {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Date of amendement ' })
  amendment_date: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Board amended' })
  id_board: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of amendement ' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Description amendement ' })
  description: string;
}
