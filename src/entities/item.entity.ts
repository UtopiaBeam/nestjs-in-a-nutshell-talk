import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Currency {
  BHT = 'BHT',
  USD = 'USD',
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column('enum', { enum: Currency })
  currency: Currency;
}
