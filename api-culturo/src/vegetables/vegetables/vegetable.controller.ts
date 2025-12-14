import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VegetableService } from './vegetable.service';
import { CreateVegetableDTO } from './dtos/create.vegetable.dto';
import { UpdateVegetableDTO } from './dtos/update.vegetable.dto';
import { Vegetable } from 'src/entities/vegetable.entity';
import { Variety } from 'src/entities/variety.entity';

@ApiTags('Vegetables')
@Controller('vegetables')
export class VegetableController {
  constructor(private readonly vegetableService: VegetableService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vegetables' })
  @ApiResponse({ status: 200, description: 'List of vegetables', type: [Vegetable] })
  async getAllVegetables() {
    return this.vegetableService.getAllVegetables();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vegetable by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vegetable', type: Number })
  @ApiResponse({ status: 200, description: 'Vegetable retrieved', type: Vegetable })
  async getVegetableById(@Param('id', ParseIntPipe) id: number) {
    return this.vegetableService.getVegetableById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vegetable' })
  @ApiBody({ type: CreateVegetableDTO })
  @ApiResponse({ status: 201, description: 'Vegetable created', type: Vegetable })
  async createVegetable(@Body() payload: CreateVegetableDTO) {
    return this.vegetableService.createVegetable(payload);
  }

  @Put()
  @ApiOperation({ summary: 'Update an existing vegetable' })
  @ApiBody({ type: UpdateVegetableDTO })
  @ApiResponse({ status: 200, description: 'Vegetable updated', type: Vegetable })
  async updateVegetable(@Body() payload: UpdateVegetableDTO) {
    return this.vegetableService.updateVegetable(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vegetable by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vegetable', type: Number })
  @ApiResponse({ status: 200, description: 'Vegetable deleted' })
  async deleteVegetable(@Param('id', ParseIntPipe) id: number) {
    return this.vegetableService.delVegetable(id);
  }

  @Get(':id/varieties')
  @ApiOperation({ summary: 'Get all varieties of a vegetable' })
  @ApiParam({ name: 'id', description: 'ID of the vegetable', type: Number })
  @ApiResponse({ status: 200, description: 'List of varieties', type: [Variety] })
  async getVarietiesVegetable(@Param('id', ParseIntPipe) id: number) {
    return this.vegetableService.getVarietiesVegetable(id);
  }
}
