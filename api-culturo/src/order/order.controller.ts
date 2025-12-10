import { CreateOrderDTO } from './dtos/create.order.dto';
import { UpdateOrderDTO } from './dtos/update.order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderService } from './order.service';
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

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   *
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Récupère toutes les commandes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des commandes',
    type: [Order],
  })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupère une commande par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande', type: Number })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  /**
   *
   * @param dto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Crée une nouvelle commande' })
  @ApiBody({ type: CreateOrderDTO })
  @ApiResponse({ status: 201, description: 'Commande créée', type: Order })
  async create(@Body() dto: CreateOrderDTO): Promise<Order> {
    return this.orderService.create(dto);
  }

  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Met à jour une commande existante' })
  @ApiParam({ name: 'id', description: 'ID de la commande', type: Number })
  @ApiBody({ type: UpdateOrderDTO })
  @ApiResponse({
    status: 200,
    description: 'Commande mise à jour',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateOrderDTO,
  ): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande', type: Number })
  @ApiResponse({ status: 200, description: 'Commande supprimée' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
