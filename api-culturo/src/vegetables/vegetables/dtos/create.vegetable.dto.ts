import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVegetableDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of vegetable ' })
  vegetable_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of variety ' })
  variety_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The planting season' })
  planting_season: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The harvest season' })
  harvest_season: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The minimum harvest duration' })
  harvest_duration_min: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The maximum harvest duration' })
  harvest_duration_max: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The in-row distance' })
  inrow_distance: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The estimated yield' })
  estimated_yield: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of Family' })
  id_family: number;
}
