import { PlantingValidationDto } from '../dtos/planting.validation.dto';
import { CulturePlanQueryDto } from '../dtos/culture.plan.query.dto';
import { RotationService } from './rotation.service';
import { Vegetable } from 'src/entities/vegetable.entity';
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiTags('Rotations')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('rotations')
export class RotationController {
  constructor(
    private readonly rotationService: RotationService,
    // 💡 CORRECTION : Injection directe du repository (pas besoin de VegetableService)
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
  ) {}

  /**
   * Obtenir le Plan de Culture par Sole
   * GET /rotations/plan/:soleId?year=2025&month=3&periodMonths=6
   */
  @ApiOperation({
    summary:
      'Obtenir le plan de culture pour une Sole donnée sur une période spécifique.',
  })
  @ApiParam({
    name: 'soleId',
    type: Number,
    description: "L'ID unique de la Sole (ex: 1 pour SOLE Nord).",
    example: 1,
  })
  @ApiQuery({
    name: 'year',
    type: Number,
    description: "L'année du plan de culture",
    example: 2025,
    required: true,
  })
  @ApiQuery({
    name: 'month',
    type: Number,
    description: 'Le mois de départ (1-12, optionnel)',
    example: 3,
    required: false,
  })
  @ApiQuery({
    name: 'periodMonths',
    type: Number,
    description: 'Durée en mois (optionnel, défaut: 12)',
    example: 6,
    required: false,
  })
  @Get('plan/:soleId')
  async getCulturePlan(
    @Param('soleId', ParseIntPipe) soleId: number,
    @Query() query: CulturePlanQueryDto,
  ) {
    const { year, month, periodMonths } = query;

    return this.rotationService.getCulturePlan(
      soleId,
      year,
      month,
      periodMonths,
    );
  }

  /**
   * Vérifier la Faisabilité de la Plantation
   * POST /rotations/can
   */
  @ApiOperation({
    summary:
      'Vérifie si un légume peut être planté sur une planche en respectant les règles de rotation de 5 ans et de cohabitation.',
  })
  @ApiBody({
    type: PlantingValidationDto,
    examples: {
      example1: {
        summary: 'Vérification simple',
        value: {
          boardId: 1,
          vegetableId: 21,
          bypass: false,
        },
      },
    },
  })
  @Post('can')
  async canPlantVegetable(@Body() body: PlantingValidationDto) {
    const { boardId, vegetableId, bypass } = body;

    const result = await this.rotationService.canPlantVegetable(
      boardId,
      vegetableId,
      bypass,
    );

    return result;
  }

  /**
   * Trouver les Sections Plantables
   * GET /rotations/plantable-sections?vegetableId=21&startDate=2025-03-01&endDate=2025-07-31
   */
  @ApiOperation({
    summary:
      'Trouve toutes les sections plantables pour un légume donné sur une période.',
    description:
      'Retourne uniquement les sections qui sont disponibles (non occupées) et qui respectent les règles de rotation.',
  })
  @ApiQuery({
    name: 'vegetableId',
    type: Number,
    description: 'ID du légume à planter',
    example: 21,
    required: true,
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    description: 'Date de début de la plantation (YYYY-MM-DD)',
    example: '2025-03-01',
    required: true,
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    description: 'Date de fin de la plantation (YYYY-MM-DD)',
    example: '2025-07-31',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des sections disponibles pour la plantation.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sectionPlanId: { type: 'number', example: 1 },
          boardId: { type: 'number', example: 1 },
          boardName: { type: 'string', example: 'Bande 101' },
          sectionNumber: { type: 'number', example: 1 },
          totalSections: { type: 'number', example: 3 },
          lastPlantedVegetable: {
            type: 'string',
            nullable: true,
            example: 'Tomate',
          },
          neverPlanted: { type: 'boolean', example: false },
        },
      },
    },
  })
  @Get('plantable-sections')
  async findPlantableSections(
    @Query('vegetableId', ParseIntPipe) vegetableId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any[]> {
    // 1. Vérification des dates
    if (!startDate || !endDate) {
      throw new BadRequestException(
        'Les dates de début (startDate) et de fin (endDate) sont obligatoires.',
      );
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new BadRequestException(
        'Format de date invalide. Utilisez YYYY-MM-DD.',
      );
    }

    if (startDateObj > endDateObj) {
      throw new BadRequestException(
        'La date de début doit être antérieure à la date de fin.',
      );
    }

    // 2. Appel du service (sans boardId)
    const plantableSections = await this.rotationService.findPlantableSections(
      vegetableId,
      startDateObj,
      endDateObj,
    );

    return plantableSections;
  }
}
