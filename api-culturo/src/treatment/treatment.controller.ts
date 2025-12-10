import { CreateTreatedDTO } from './dtos/create.treatment.dto';
import { UpdateTreatedDTO } from './dtos/update.treatment.dto';
import { Treated } from 'src/entities/treated.entity';
import { TreatedService } from './treatment.service';
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

@ApiTags('treated')
@Controller('treated')
export class TreatedController {
  constructor(private readonly treatedService: TreatedService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Récupère tous les traitements appliqués' })
  @ApiResponse({
    status: 200,
    description: 'Liste des traitements',
    type: [Treated],
  })
  async findAll(): Promise<Treated[]> {
    return await this.treatedService.findAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupère un traitement par son ID' })
  @ApiParam({ name: 'id', description: 'ID du traitement', type: Number })
  @ApiResponse({ status: 200, description: 'Traitement trouvé', type: Treated })
  @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
  async findOne(@Param('id') id: number): Promise<Treated> {
    return await this.treatedService.findOne(id);
  }

  /**
   *
   * @param dto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Crée un nouveau traitement appliqué' })
  @ApiBody({ type: CreateTreatedDTO })
  @ApiResponse({ status: 201, description: 'Traitement créé', type: Treated })
  async create(@Body() dto: CreateTreatedDTO): Promise<Treated> {
    return await this.treatedService.create(dto);
  }

  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Met à jour un traitement appliqué' })
  @ApiParam({ name: 'id', description: 'ID du traitement', type: Number })
  @ApiBody({ type: UpdateTreatedDTO })
  @ApiResponse({
    status: 200,
    description: 'Traitement mis à jour',
    type: Treated,
  })
  @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTreatedDTO,
  ): Promise<Treated> {
    return await this.treatedService.update(id, dto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un traitement appliqué' })
  @ApiParam({ name: 'id', description: 'ID du traitement', type: Number })
  @ApiResponse({ status: 200, description: 'Traitement supprimé' })
  @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.treatedService.remove(id);
  }
}
