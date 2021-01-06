import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Order } from 'src/entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Order> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Omit<Order, 'id'>): Promise<Order> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: Partial<Omit<Order, 'id'>>,
  ): Promise<Order> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Order> {
    return this.service.delete(id);
  }
}
