import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findById(id: number): Promise<User> {
    return this.repo.findOne(id);
  }

  create(dto: Omit<User, 'id'>): Promise<User> {
    const user = { ...new User(), ...dto };
    return this.repo.save(user);
  }

  async update(id: number, dto: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = { ...(await this.findById(id)), ...dto };
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);
    await this.repo.remove(user);
    return user;
  }
}
