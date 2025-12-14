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
import { PlantingValidationDto } from '../dtos/planting.validation.dto';
import { CulturePlanQueryDto } from '../dtos/culture.plan.query.dto';
import { PlantableVegetableDto } from '../dtos/plantable.vegetable.dro';
import { AddVegetableToBoardDto } from '../dtos/add.vegetable.section';
import {
  PlantingSuccessResponse,
  PlantingWarningResponse,
} from '../dtos/planting.succes.warning.dto';
import { Section } from 'src/entities/section.entity';

export interface PlantingResult {
  status: 'OK' | 'WARNING';
  section?: Section;
  reason?: string;
  neededBypass?: boolean;
}

@ApiTags('Rotations')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('rotations')
export class RotationController {
  constructor(
    private readonly rotationService: RotationService,
    @InjectRepository(Vegetable)
    private readonly vegetableRepository: Repository<Vegetable>,
  ) {}

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
  })
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

  // ----------------- canPlantVegetable -----------------
  @Post('can')
  @ApiOperation({
    summary: 'Vérifie si un légume peut être planté sur une planche.',
  })
  @ApiBody({
    type: PlantingValidationDto,
    description: 'Données pour vérifier la faisabilité de la plantation.',
  })
  @ApiResponse({
    status: 200,
    description: 'Résultat de la vérification de plantation.',
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

  // ----------------- addVegetableToBoard -----------------
  @Post('add-vegetable')
  @ApiOperation({
    summary: 'Ajouter un légume (avec variété) à une section de planche.',
  })
  @ApiBody({
    type: AddVegetableToBoardDto,
    description: 'Données nécessaires à la plantation.',
  })
  @ApiResponse({
    status: 201,
    description: 'Section créée avec succès (Status: OK).',
    type: PlantingSuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description:
      'Requête invalide (Section déjà active, règles de rotation non respectées nécessitant un contournement).',
  })
  @ApiResponse({
    status: 404,
    description: 'Ressource non trouvée.',
  })
  async addVegetableToBoard(
    @Body() dto: AddVegetableToBoardDto,
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

      // OK
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
