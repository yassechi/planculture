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
import { PlantableVegetableDto } from '../dtos/plantable.vegetable.dro';

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
  /**
   *
   * @param soleId
   * @param query
   * @returns
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
  /**
   *
   * @param vegetableId
   * @param startDate
   * @param endDate
   * @returns
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

  // /**
  //  *
  //  * @param sectionPlanId
  //  * @param sectionNumber
  //  * @param startDateStr
  //  * @param endDateStr
  //  * @returns
  //  */
  // @Get(
  //   'section-plan/:sectionPlanId/section/:sectionNumber/plantable-vegetables',
  // )
  // @ApiOperation({
  //   summary: 'Récupérer les légumes plantables dans une section spécifique',
  //   description:
  //     'Retourne la liste des légumes qui peuvent être plantés dans une section donnée pour une période définie, en respectant les règles de rotation et de cohabitation.',
  // })
  // @ApiParam({
  //   name: 'sectionPlanId',
  //   description: 'ID du plan de section (board)',
  //   type: Number,
  // })
  // @ApiParam({
  //   name: 'sectionNumber',
  //   description: 'Numéro de la section dans le plan',
  //   type: Number,
  // })
  // @ApiQuery({
  //   name: 'startDate',
  //   description: 'Date de début de plantation (ISO 8601)',
  //   type: String,
  //   example: '2024-03-15',
  // })
  // @ApiQuery({
  //   name: 'endDate',
  //   description: 'Date de fin de plantation (ISO 8601)',
  //   type: String,
  //   example: '2024-09-30',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Liste des légumes plantables',
  //   type: [PlantableVegetableDto],
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'SectionPlan non trouvé',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Paramètres invalides (dates ou numéro de section)',
  // })
  // async findPlantableVegetables(
  //   @Param('sectionPlanId', ParseIntPipe) sectionPlanId: number,
  //   @Param('sectionNumber', ParseIntPipe) sectionNumber: number,
  //   @Query('startDate') startDateStr: string,
  //   @Query('endDate') endDateStr: string,
  // ): Promise<PlantableVegetableDto[]> {
  //   // Validation des dates
  //   const startDate = new Date(startDateStr);
  //   const endDate = new Date(endDateStr);

  //   if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
  //     throw new BadRequestException(
  //       'Dates invalides. Format attendu: YYYY-MM-DD',
  //     );
  //   }

  //   if (startDate >= endDate) {
  //     throw new BadRequestException(
  //       'La date de début doit être antérieure à la date de fin.',
  //     );
  //   }

  //   return await this.rotationService.findPlantableVegetables(
  //     sectionPlanId,
  //     sectionNumber,
  //     startDate,
  //     endDate,
  //   );
  // }

  /**
   *
   * @param sectionPlanId
   * @param sectionNumber
   * @param startDateStr
   * @param endDateStr
   * @returns
   */
  @Get('plantable-vegetables')
  @ApiOperation({
    summary: 'Récupérer les légumes plantables dans une section spécifique',
    description:
      'Retourne la liste des légumes qui peuvent être plantés dans une section donnée pour une période définie, en respectant les règles de rotation et de cohabitation.',
  })
  @ApiQuery({
    name: 'sectionPlanId',
    description: 'ID du plan de section (board)',
    type: Number,
    example: 3,
  })
  @ApiQuery({
    name: 'sectionNumber',
    description: 'Numéro de la section dans le plan',
    type: Number,
    example: 2,
  })
  @ApiQuery({
    name: 'startDate',
    description: 'Date de début de plantation (ISO 8601)',
    type: String,
    example: '2024-03-15',
  })
  @ApiQuery({
    name: 'endDate',
    description: 'Date de fin de plantation (ISO 8601)',
    type: String,
    example: '2024-09-30',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des légumes plantables',
    type: [PlantableVegetableDto],
  })
  @ApiResponse({
    status: 404,
    description: 'SectionPlan non trouvé',
  })
  @ApiResponse({
    status: 400,
    description: 'Paramètres invalides (dates ou numéro de section)',
  })
  async findPlantableVegetables(
    @Query('sectionPlanId', ParseIntPipe) sectionPlanId: number,
    @Query('sectionNumber', ParseIntPipe) sectionNumber: number,
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string,
  ): Promise<PlantableVegetableDto[]> {
    // Validation des dates
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException(
        'Dates invalides. Format attendu: YYYY-MM-DD',
      );
    }

    if (startDate >= endDate) {
      throw new BadRequestException(
        'La date de début doit être antérieure à la date de fin.',
      );
    }

    return await this.rotationService.findPlantableVegetables(
      sectionPlanId,
      sectionNumber,
      startDate,
      endDate,
    );
  }
}
