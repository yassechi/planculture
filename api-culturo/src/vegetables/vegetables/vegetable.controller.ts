import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VegetableService } from './vegetable.service';

import { ApiOperation } from '@nestjs/swagger';
import { CreateVegetableDTO } from './dtos/create.vegetable.dto';
import { UpdateVegetableDTO } from './dtos/update.vegetable.dto';

@Controller('vegetable')
export class VegetableController {
  constructor(private readonly vegetableService: VegetableService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Vegetables' })
  async getAllVegetables() {
    return this.vegetableService.getAllVegetables();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Vegetable by ID' })
  async getVegetable(@Param('id') id: number) {
    return this.vegetableService.getVegetableById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a Vegetable' })
  async createVegetable(@Body() payload: CreateVegetableDTO) {
    return this.vegetableService.createVegetable(payload);
  }

  @Put()
  @ApiOperation({ summary: 'Update a Vegetable' })
  async updateVegetable(@Body() payload: UpdateVegetableDTO) {
    return this.vegetableService.updateVegetable(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Vegetable' })
  async delVegetable(@Param('id') id: number) {
    return this.vegetableService.delVegetable(id);
  }
}
