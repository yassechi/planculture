import { PlantingValidationDto } from '../dtos/planting.validation.dto';
import { CulturePlanQueryDto } from '../dtos/culture.plan.query.dto';
import { RotationService } from './rotation.service';
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

@ApiTags('Rotations')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('rotations')
export class RotationController {
  constructor(private readonly rotationService: RotationService) {}

  /**
   * Obtenir le Plan de Culture par Sole
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
  })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
    description: "L'année du plan de culture (ex: 2025).",
  })
  @ApiQuery({
    name: 'month',
    type: Number,
    required: false,
    description: 'Le mois de départ (1=Janvier, 12=Décembre).',
  })
  @ApiQuery({
    name: 'periodMonths',
    type: Number,
    required: false,
    description:
      'La durée en mois à couvrir à partir du mois de départ (par défaut 12).',
  })
  @ApiResponse({
    status: 200,
    description: 'Plan de culture réussi.',
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
   * @param body
   * @returns
   */
  @ApiOperation({
    summary:
      'Vérifie si un légume peut être planté sur une planche en respectant les règles de rotation de 5 ans et de cohabitation.',
  })
  @ApiBody({
    type: PlantingValidationDto,
    description: 'ID de la planche, du légume et statut du bypass.',
  })
  @ApiResponse({
    status: 200,
    description: 'Vérification réussie.',
  })
  @Post('can')
  async canPlantVegetable(@Body() body: PlantingValidationDto) {
    const { boardId, vegetableId, bypass } = body;

    const result = await this.rotationService.canPlantVegetable(
      boardId,
      vegetableId,
      bypass,
    );

    if (result.status === 'WARNING') {
      return result;
    }

    return result;
  }

  /**
   * Trouver les Sections Plantables
   * @param vegetableId
   * @param startDateString
   * @param endDateString
   * @returns
   */
  @ApiOperation({
    summary:
      "Trouve les sections disponibles pour la plantation d'un légume donné sur une plage de dates (tenant compte de l'historique et des chevauchements).",
  })
  @ApiParam({
    name: 'vegetableId',
    type: Number,
    description: "L'ID unique du légume à planter.",
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    description: 'Date de début de plantation souhaitée (format YYYY-MM-DD).',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    description: 'Date de fin de récolte souhaitée (format YYYY-MM-DD).',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des sections plantables réussie.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dates de début ou de fin invalides.',
  })
  @Get('plantable-sections/:vegetableId')
  async findPlantableSections(
    @Param('vegetableId', ParseIntPipe) vegetableId: number,
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Dates de début ou de fin invalides.');
    }

    return this.rotationService.findPlantableSections(
      vegetableId,
      startDate,
      endDate,
    );
  }
}
