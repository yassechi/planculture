import { UpdateFamilyDTO } from './dtos/update.family.dto';
import { CreateFamilyDTO } from './dtos/create.family.dto';
import { FamilyService } from './family.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Get all Familles' })
  public async getAllFamilies() {
    return this.familyService.getAllFamilies();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Family by Id' })
  public async getFamily(@Param('id') id: number) {
    return this.familyService.getFamilyById(id);
  }

  /**
   *
   * @param payload
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Create a Family' })
  public async createFamily(@Body() payload: CreateFamilyDTO) {
    return this.familyService.createFamily(payload);
  }

  /**
   *
   * @param payload
   * @returns
   */
  @Put()
  @ApiOperation({ summary: 'Update a Family' })
  public async updateFamily(@Body() payload: UpdateFamilyDTO) {
    return this.familyService.updateFamily(payload);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Family' })
  public async delFamily(@Param('id') id: number) {
    return this.familyService.delFamily(id);
  }
}
