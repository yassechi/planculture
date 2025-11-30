import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFamilyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of Family ' })
  family_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of Family_importance ' })
  id_family_importance: number;
}


