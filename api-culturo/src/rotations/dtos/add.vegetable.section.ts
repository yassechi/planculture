import {
  IsNumber,
  IsDateString,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddVegetableToBoardDto {
  @ApiProperty({
    description: 'ID de la planche où planter le légume',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  boardId: number;

  @ApiProperty({
    description: 'Numéro de la section sur la planche',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  sectionNumber: number;

  @ApiProperty({
    description: 'ID du légume à planter',
    example: 5,
  })
  @IsNumber()
  @Type(() => Number)
  vegetableId: number;

  @ApiProperty({
    description: 'Date de début de plantation',
    example: '2025-03-01',
    type: String,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Date de fin de plantation',
    example: '2025-06-30',
    type: String,
  })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({
    description: 'Quantité plantée',
    example: 100,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantityPlanted?: number;

  @ApiPropertyOptional({
    description: 'Forcer la plantation en ignorant les règles de rotation',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  bypass?: boolean;
}
