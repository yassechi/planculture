import { Controller, Delete, Get, Param } from '@nestjs/common';
import { VegetableService } from './vegetable.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('vegetable')
export class VegetableController {
  constructor(private readonly vegetableService: VegetableService) {}

  @Get()
  public async getAllvegetables() {
    return this.vegetableService.getAllvegetables();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Legume by Id' })
  async getOneVegetable(@Param('id') id: number) {
    return await this.vegetableService.getVegetableById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Legume' })
  async removeFamille(@Param('id') id: number) {
    return this.vegetableService.delVegetable(id);
  }
}
