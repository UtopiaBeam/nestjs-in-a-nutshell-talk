import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @OneToMany(
    () => Order,
    order => order.user,
  )
  orders: Order[];
}
