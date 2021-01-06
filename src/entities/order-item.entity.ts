import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  itemId: number;

  @Column('int')
  amount: number;

  @ManyToOne(
    () => Order,
    order => order.orderItems,
  )
  order: Order;

  @ManyToOne(() => Item)
  item: Item;
}
