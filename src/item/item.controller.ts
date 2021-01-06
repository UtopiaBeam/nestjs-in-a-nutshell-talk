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
import { Item } from 'src/entities/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Item> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Omit<Item, 'id'>): Promise<Item> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: Partial<Omit<Item, 'id'>>,
  ): Promise<Item> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<Item> {
    return this.service.delete(id);
  }
}
