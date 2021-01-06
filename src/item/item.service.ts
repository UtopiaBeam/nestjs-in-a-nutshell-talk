import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  find(): Promise<Item[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Item> {
    return this.repo.findOne(id);
  }

  create(dto: Omit<Item, 'id'>): Promise<Item> {
    const item = { ...new Item(), ...dto };
    return this.repo.save(item);
  }

  async update(id: number, dto: Partial<Omit<Item, 'id'>>): Promise<Item> {
    const item = { ...(await this.findById(id)), ...dto };
    return this.repo.save(item);
  }

  async delete(id: number): Promise<Item> {
    const item = await this.findById(id);
    await this.repo.remove(item);
    return item;
  }
}
