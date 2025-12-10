import { CreateHarvestDTO } from './dtos/create.harvest.dto';
import { UpdateHarvestDTO } from './dtos/update.harvest.dto';
import { Harvest } from 'src/entities/harvest.entity';
import { HarvestService } from './harvest.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('harvests')
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Récupère toutes les récoltes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des récoltes',
    type: [Harvest],
  })
  async findAll(): Promise<Harvest[]> {
    return await this.harvestService.findAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupère une récolte par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la récolte', type: Number })
  @ApiResponse({ status: 200, description: 'Récolte trouvée', type: Harvest })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  async findOne(@Param('id') id: number): Promise<Harvest> {
    return await this.harvestService.findOne(id);
  }

  /**
   *
   * @param dto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Crée une nouvelle récolte' })
  @ApiBody({ type: CreateHarvestDTO })
  @ApiResponse({ status: 201, description: 'Récolte créée', type: Harvest })
  async create(@Body() dto: CreateHarvestDTO): Promise<Harvest> {
    return await this.harvestService.create(dto);
  }

  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Met à jour une récolte existante' })
  @ApiParam({ name: 'id', description: 'ID de la récolte', type: Number })
  @ApiBody({ type: UpdateHarvestDTO })
  @ApiResponse({
    status: 200,
    description: 'Récolte mise à jour',
    type: Harvest,
  })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateHarvestDTO,
  ): Promise<Harvest> {
    return await this.harvestService.update(id, dto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime une récolte' })
  @ApiParam({ name: 'id', description: 'ID de la récolte', type: Number })
  @ApiResponse({ status: 200, description: 'Récolte supprimée' })
  @ApiResponse({ status: 404, description: 'Récolte non trouvée' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.harvestService.remove(id);
  }
}
