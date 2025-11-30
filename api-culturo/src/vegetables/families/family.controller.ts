import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FamilyService } from './family.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateFamilyDTO } from './dtos/update.family.dto';
import { CreateFamilyDTO } from './dtos/create.family.dto';

@Controller('family')
export class FamilyController {
   constructor(private readonly familyService: FamilyService) {}

  /**
   * GET /family
   * Récupère toutes les familles
   */
  @Get()
  @ApiOperation({ summary: 'Get all Familles' })
  public async getAllFamilies() {
    return this.familyService.getAllFamilies();
  }

  /**
   * GET /family/:id
   * Récupère une famille par ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Family by Id' })
  public async getFamily(@Param('id') id: number) {
    return this.familyService.getFamilyById(id);
  }

  /**
   * POST /family
   * Création d’une famille
   */
  @Post()
  @ApiOperation({ summary: 'Create a Family' })
  public async createFamily(@Body() payload: CreateFamilyDTO) {
    return this.familyService.createFamily(payload);
  }

  /**
   * PUT /family
   * Mise à jour d’une famille
   */
  @Put()
  @ApiOperation({ summary: 'Update a Family' })
  public async updateFamily(@Body() payload: UpdateFamilyDTO) {
    return this.familyService.updateFamily(payload);
  }

  /**
   * DELETE /family/:id
   * Suppression d’une famille
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Family' })
  public async delFamily(@Param('id') id: number) {
    return this.familyService.delFamily(id);
  }
}


