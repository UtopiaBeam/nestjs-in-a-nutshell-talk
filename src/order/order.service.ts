import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}

  find(): Promise<Order[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Order> {
    return this.repo.findOne(id);
  }

  create(dto: Omit<Order, 'id'>): Promise<Order> {
    const order = { ...new Order(), ...dto };
    return this.repo.save(order);
  }

  async update(id: number, dto: Partial<Omit<Order, 'id'>>): Promise<Order> {
    const Order = { ...(await this.findById(id)), ...dto };
    return this.repo.save(Order);
  }

  async delete(id: number): Promise<Order> {
    const order = await this.findById(id);
    await this.repo.remove(order);
    return order;
  }
}
