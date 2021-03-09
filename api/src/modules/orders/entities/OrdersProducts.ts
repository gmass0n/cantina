import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import ColumnNumericTransformer from '@shared/utils/ColumnNumericTransformer';

import Product from '@modules/products/entities/Product';

import { Exclude } from 'class-transformer';

import Order from './Order';

@Entity('ordersProducts')
export default class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  productId: string;

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  @Exclude()
  orderId: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column('int')
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
