import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { VarietyService } from './variety.service';
import { CreateVarietyDTO } from './dtos/create.vartiety.dto';
import { UpdateVarietyDTO } from './dtos/update.variety.dto';
import { Variety } from 'src/entities/variety.entity';

@Controller('varieties')
export class VarietyController {
  constructor(private readonly varietyService: VarietyService) {}
  /**
   * GET /variety/:id
   * Récupère une variety par ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get variety by Id' })
  public async getvariety(@Param('id') id: number) {
    return this.varietyService.getVarietyById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get variety by Vegetable Id' })
  public async getvarietyByVegetableId(
    @Query('vegetable_id') vegtableId: number,
  ) {
    return this.varietyService.geteAllVarietiesByVegetableId(vegtableId);
  }

  /**
   * POST /variety
   * Création d’une variété
   */
  @Post()
  @ApiOperation({ summary: 'Create a variety' })
  public async createFamily(@Body() payload: CreateVarietyDTO) {
    return this.varietyService.createvariety(payload);
  }

  //   /**
  //    * PUT /variety
  //    * Mise à jour d’une variété
  //    */
  @Put()
  @ApiOperation({ summary: 'Update a Variety' })
  public async updateVariety(@Body() payload: UpdateVarietyDTO) {
    return this.varietyService.updateVariety(payload);
  }

  //   /**
  //    * DELETE /variety/:id
  //    * Suppression d’une variété
  //    */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Variety' })
  public async delVariety(@Param('id') id: number) {
    return this.varietyService.delVariety(id);
  }

  @Get(':id/varieties')
  async getVarieties(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Variety[]> {
    const vegetable = await this.varietyService.getVarietiesVegetable(id);

    if (!vegetable) {
      throw new NotFoundException(`Vegetable with ID ${id} not found`);
    }

    return vegetable;
  }
}
