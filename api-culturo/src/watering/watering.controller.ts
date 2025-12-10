import { CreateWateringDTO } from './dtos/create.watering.dto';
import { UpdateWateringDTO } from './dtos/update.watering.dto';
import { Watering } from 'src/entities/watering.entity';
import { WateringService } from './watering.service';
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

@ApiTags('waterings')
@Controller('waterings')
export class WateringController {
  constructor(private readonly wateringService: WateringService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Récupère tous les arrosages' })
  @ApiResponse({
    status: 200,
    description: 'Liste des arrosages',
    type: [Watering],
  })
  async findAll(): Promise<Watering[]> {
    return await this.wateringService.findAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupère un arrosage par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’arrosage', type: Number })
  @ApiResponse({ status: 200, description: 'Arrosage trouvé', type: Watering })
  @ApiResponse({ status: 404, description: 'Arrosage non trouvé' })
  async findOne(@Param('id') id: number): Promise<Watering> {
    return await this.wateringService.findOne(id);
  }

  /**
   *
   * @param dto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Crée un nouvel arrosage' })
  @ApiBody({ type: CreateWateringDTO })
  @ApiResponse({ status: 201, description: 'Arrosage créé', type: Watering })
  async create(@Body() dto: CreateWateringDTO): Promise<Watering> {
    return await this.wateringService.create(dto);
  }

  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Met à jour un arrosage existant' })
  @ApiParam({ name: 'id', description: 'ID de l’arrosage', type: Number })
  @ApiBody({ type: UpdateWateringDTO })
  @ApiResponse({
    status: 200,
    description: 'Arrosage mis à jour',
    type: Watering,
  })
  @ApiResponse({ status: 404, description: 'Arrosage non trouvé' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateWateringDTO,
  ): Promise<Watering> {
    return await this.wateringService.update(id, dto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un arrosage' })
  @ApiParam({ name: 'id', description: 'ID de l’arrosage', type: Number })
  @ApiResponse({ status: 200, description: 'Arrosage supprimé' })
  @ApiResponse({ status: 404, description: 'Arrosage non trouvé' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.wateringService.remove(id);
  }
}
