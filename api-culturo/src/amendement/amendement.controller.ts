import { CreateAmendementDTO } from './dtos/create.amendement.dto';
import { AmendedService } from './amendement.service';
import { Amended } from '../entities/amended.entity';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Amendements')
@Controller('amendements')
export class AmendedController {
  constructor(private readonly amendedService: AmendedService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère tous les amendements' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les amendements',
    type: [Amended],
  })
  async getAll(): Promise<Amended[]> {
    return this.amendedService.getAllAmendements();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un amendement par ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de l’amendement' })
  @ApiResponse({ status: 200, description: 'Amendement trouvé', type: Amended })
  @ApiResponse({ status: 404, description: 'Amendement non trouvé' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Amended> {
    return this.amendedService.getAmendedById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crée un nouvel amendement' })
  @ApiBody({ type: CreateAmendementDTO })
  @ApiResponse({ status: 201, description: 'Amendement créé', type: Amended })
  async create(@Body() payload: CreateAmendementDTO): Promise<Amended> {
    return this.amendedService.createAmended(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un amendement' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de l’amendement à mettre à jour',
  })
  @ApiBody({ type: CreateAmendementDTO })
  @ApiResponse({
    status: 200,
    description: 'Amendement mis à jour',
    type: Amended,
  })
  @ApiResponse({ status: 404, description: 'Amendement non trouvé' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Partial<CreateAmendementDTO>,
  ): Promise<Amended> {
    return this.amendedService.updateAmended(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un amendement' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de l’amendement à supprimer',
  })
  @ApiResponse({ status: 204, description: 'Amendement supprimé' })
  @ApiResponse({ status: 404, description: 'Amendement non trouvé' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.amendedService.deleteAmended(id);
  }
}
