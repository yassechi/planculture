import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVarietyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of Variety ' })
  variety_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of vegetable' })
  id_vegetable: number;
}
