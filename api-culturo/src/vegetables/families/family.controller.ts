import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FamilyService } from './family.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('famille')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  public async getAllFamilies() {
    return this.familyService.getAllFamilies();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Famille by Id' })
  async getOneFamily(@Param('id') id: number) {
    return await this.familyService.getFamilyById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Famille' })
  async removeFamily(@Param('id') id: number) {
    return this.familyService.delFamily(id);
  }
}
