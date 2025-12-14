import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { HarvestService } from './harvest.service';
import { CreateHarvestDTO } from './dtos/create.harvest.dto';
import { UpdateHarvestDTO } from './dtos/update.harvest.dto';
import { Harvest } from 'src/entities/harvest.entity';

@ApiTags('Harvests')
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les récoltes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste de toutes les récoltes',
    type: [Harvest], // Assurez-vous que Harvest est exporté et bien typé
  })
  async findAll(): Promise<Harvest[]> {
    return this.harvestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une récolte par ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails de la récolte',
    type: Harvest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Récolte non trouvée',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Harvest> {
    return this.harvestService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Créer une nouvelle récolte et marquer la section comme inactive',
  })
  @ApiBody({ type: CreateHarvestDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      "La récolte a été créée. La section associée est marquée 'section_active = false' et sa date de fin est mise à jour.",
    type: Harvest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilisateur ou Section non trouvé(e).',
  })
  async create(@Body() createHarvestDto: CreateHarvestDTO): Promise<Harvest> {
    return this.harvestService.create(createHarvestDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une récolte existante' })
  @ApiBody({ type: UpdateHarvestDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La récolte a été mise à jour.',
    type: Harvest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Récolte, Utilisateur ou Section non trouvé(e).',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHarvestDto: UpdateHarvestDTO,
  ): Promise<Harvest> {
    return this.harvestService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une récolte' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'La récolte a été supprimée avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Récolte non trouvée.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.harvestService.remove(id);
  }
}