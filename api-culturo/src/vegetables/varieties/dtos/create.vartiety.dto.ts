import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVarietyDTO {
  @ApiProperty({ example: 'Carotte Nantes', description: 'Nom de la variété' })
  @IsString()
  @IsNotEmpty()
  variety_name: string;
}
