import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDTO {
  @ApiProperty({ description: 'Date de la récolte' })
  @IsDate()
  @IsNotEmpty()
  harvest_date: Date;

  @ApiProperty({ description: 'Quantité récoltée' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Unité de la quantité (ex: kg, g)' })
  @IsString()
  @IsNotEmpty()
  quantity_unit: string;

  @ApiProperty({ description: 'ID de l’utilisateur qui a fait la récolte' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID de la section où la récolte a été faite' })
  @IsNumber()
  @IsNotEmpty()
  id_section: number;
}
