import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
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
import { RotationService } from './rotation.service';
import { Vegetable } from 'src/entities/vegetable.entity';
// Assurez-vous que ces DTOs existent à ces chemins
import { PlantingValidationDto } from '../dtos/planting.validation.dto';
import { CulturePlanQueryDto } from '../dtos/culture.plan.query.dto';
import { PlantableVegetableDto } from '../dtos/plantable.vegetable.dro';
import { AddVegetableToBoardDto } from '../dtos/add.vegetable.section';
import { PlantingSuccessResponse } from '../dtos/planting.succes.warning.dto';
import { Section } from 'src/entities/section.entity';
import { SectionPlan } from 'src/entities/section_plan.entity';

/**
 * Définit la structure de la réponse du service après une tentative de plantation.
 */
export interface PlantingResult {
  status: 'OK' | 'WARNING';
  section?: Section;
  reason?: string;
  neededBypass?: boolean;
}

/**
 * Définit la structure de la réponse de création/activation de plan.
 */
export interface PlanResult {
  sectionPlan: SectionPlan;
  status: 'CREATED' | 'FOUND';
}

@ApiTags('Rotations')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('rotations')
export class RotationController {
  constructor(private readonly rotationService: RotationService) {}

  // ----------------- getCulturePlan -----------------
  @Get('plan/:soleId')
  @ApiOperation({
    summary: 'Obtenir le plan de culture pour une Sole sur une période donnée.',
  })
  @ApiParam({
    name: 'soleId',
    type: Number,
    description: 'ID de la Sole',
    example: 1,
  })
  @ApiQuery({ name: 'year', type: Number, required: true, example: 2025 })
  @ApiQuery({ name: 'month', type: Number, required: false, example: 3 })
  @ApiQuery({ name: 'periodMonths', type: Number, required: false, example: 6 })
  @ApiResponse({
    status: 200,
    description: 'Plan de culture retourné avec succès.',
    type: Object,
  })
  async getCulturePlan(
    @Param('soleId', ParseIntPipe) soleId: number,
    @Query() query: CulturePlanQueryDto,
  ) {
    const { year, month, periodMonths } = query;
    return this.rotationService.getCulturePlan(
      soleId,
      year,
      month ?? null,
      periodMonths,
    );
  }

  // ----------------- canPlantVegetable -----------------
  @Post('can')
  @ApiOperation({
    summary: 'Vérifie si un légume peut être planté sur une planche.',
    description:
      'Vérifie les règles de rotation (5 ans) et de cohabitation (famille primaire unique) pour déterminer si un légume peut être planté sur une planche donnée.',
  })
  @ApiBody({
    type: PlantingValidationDto,
    description:
      "Contient l'ID de la planche, l'ID du légume, et un drapeau pour contourner les règles (bypass).",
    examples: {
      check: {
        value: { boardId: 1, vegetableId: 10, bypass: false },
        summary: 'Vérification simple',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Plantation autorisée (Statut: OK).',
    schema: { example: { status: 'OK' } },
  })
  @ApiResponse({
    status: 200,
    description:
      'Plantation non autorisée, mais possible avec contournement (Statut: WARNING).',
    schema: {
      example: {
        status: 'WARNING',
        reason: 'Règle violée.',
        neededBypass: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Ressource non trouvée (Planche ou Légume).',
  })
  async canPlantVegetable(@Body() body: PlantingValidationDto) {
    return this.rotationService.canPlantVegetable(
      body.boardId,
      body.vegetableId,
      !!body.bypass,
    );
  }

  // ----------------- findPlantableSections -----------------
  @Get('plantable-sections')
  @ApiOperation({
    summary: 'Trouve toutes les sections plantables pour un légume donné.',
    description:
      'Retourne les sections disponibles qui respectent les règles de rotation et ne sont pas occupées durant la période spécifiée.',
  })
  @ApiQuery({ name: 'vegetableId', type: Number, required: true, example: 21 })
  @ApiQuery({
    name: 'startDate',
    type: String,
    required: true,
    example: '2025-03-01',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    required: true,
    example: '2025-07-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des sections disponibles pour la plantation.',
    type: Object,
  })
  async findPlantableSections(
    @Query('vegetableId', ParseIntPipe) vegetableId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      throw new BadRequestException('Dates invalides ou incohérentes.');
    }
    return this.rotationService.findPlantableSections(vegetableId, start, end);
  }

  // ----------------- findPlantableVegetables -----------------
  @Get('plantable-vegetables')
  @ApiOperation({
    summary: 'Récupérer les légumes plantables dans une section spécifique.',
    description:
      "Liste tous les légumes qui peuvent être plantés dans la section spécifiée, compte tenu des contraintes de rotation et d'occupation.",
  })
  @ApiQuery({ name: 'sectionPlanId', type: Number, example: 3 })
  @ApiQuery({ name: 'sectionNumber', type: Number, example: 2 })
  @ApiQuery({ name: 'startDate', type: String, example: '2024-03-15' })
  @ApiQuery({ name: 'endDate', type: String, example: '2024-09-30' })
  @ApiResponse({
    status: 200,
    description: 'Liste des légumes plantables.',
    type: [PlantableVegetableDto],
  })
  async findPlantableVegetables(
    @Query('sectionPlanId', ParseIntPipe) sectionPlanId: number,
    @Query('sectionNumber', ParseIntPipe) sectionNumber: number,
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string,
  ): Promise<PlantableVegetableDto[]> {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new BadRequestException('Dates invalides ou incohérentes.');
    }
    return this.rotationService.findPlantableVegetables(
      sectionPlanId,
      sectionNumber,
      start,
      end,
    );
  }

  // ----------------- createSectionPlan -----------------
  @Post('plan-section')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Crée un nouveau SectionPlan pour une planche ou active/retourne un plan existant.',
  })
  @ApiQuery({
    name: 'boardId',
    type: Number,
    required: true,
    description:
      'ID de la planche à laquelle le plan de section doit être associé.',
  })
  @ApiQuery({
    name: 'numberOfSections',
    type: Number,
    required: false,
    example: 3,
    description:
      "Nombre de sections à créer si aucun plan actif n'est trouvé (par défaut: 3).",
  })
  @ApiResponse({
    status: 200,
    description:
      'Plan de section trouvé ou créé avec succès (Statut: FOUND ou CREATED).',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide (nombre de sections <= 0).',
  })
  @ApiResponse({
    status: 404,
    description: 'Planche non trouvée.',
  })
  async createSectionPlan(
    @Query('boardId', ParseIntPipe) boardId: number,
    @Query('numberOfSections', new ParseIntPipe({ optional: true }))
    initialSections?: number,
  ): Promise<PlanResult> {
    try {
      const numberOfSections = initialSections ?? 4;

      if (numberOfSections <= 0) {
        throw new BadRequestException(
          'Le paramètre numberOfSections doit être un nombre entier positif.',
        );
      }

      return await this.rotationService.createOrActivatePlan(
        boardId,
        numberOfSections,
      );
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Erreur interne lors de la gestion du plan de section.',
      );
    }
  }

  // ----------------- addVegetableToBoard -----------------
  @Post('add-vegetable')
  @ApiOperation({
    summary: 'Ajouter un légume (avec variété) à une section de planche.',
  })
  @ApiQuery({
    name: 'numberOfSection',
    type: Number,
    required: false,
    example: 3,
    description:
      "Nombre de sections à créer si aucun plan n'existe pour la planche (par défaut: 3).",
  })
  @ApiBody({
    type: AddVegetableToBoardDto,
    description:
      'Données nécessaires à la plantation (boardId, vegetableId, sectionNumber, dates, etc.).',
  })
  @ApiResponse({
    status: 201,
    description: 'Section créée avec succès (Status: OK).',
    type: PlantingSuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Requête invalide (Section déjà active, ou violation des règles de rotation nécessitant un contournement).',
  })
  @ApiResponse({
    status: 404,
    description: 'Ressource non trouvée.',
  })
  async addVegetableToBoard(
    @Body() dto: AddVegetableToBoardDto,
    @Query('numberOfSection', new ParseIntPipe({ optional: true }))
    numberOfSection?: number,
  ): Promise<PlantingResult> {
    const {
      boardId,
      sectionNumber,
      vegetableId,
      startDate,
      endDate,
      quantityPlanted,
      unity,
      varietyIdentifier,
      bypass,
    } = dto;

    const sectionsToCreate = numberOfSection ?? 3;

    try {
      const result = await this.rotationService.addVegetableToBoard(
        boardId,
        sectionNumber,
        vegetableId,
        startDate,
        endDate,
        quantityPlanted,
        bypass || false,
        unity,
        varietyIdentifier,
        sectionsToCreate,
      );

      if (result.status === 'WARNING') {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            result.reason ||
            'Violation des règles de rotation. Contournement requis.',
          warningDetails: result,
        });
      }

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        if (
          error instanceof BadRequestException &&
          (error.getResponse() as any)?.warningDetails
        ) {
          throw error;
        }
        throw error;
      }

      console.error(
        "Erreur interne lors de l'ajout du légume à la planche :",
        error,
      );
      throw new InternalServerErrorException(
        'Une erreur interne est survenue lors de la création de la section.',
      );
    }
  }
}
