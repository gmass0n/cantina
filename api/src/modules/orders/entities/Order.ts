import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/entities/Customer';
import ColumnNumericTransformer from '@shared/utils/ColumnNumericTransformer';

import { IOrderStatus } from '../types/IOrderStatus';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column('integer')
  code: number;

  @Column({ type: 'uuid', nullable: true })
  @Exclude()
  customerId: string | null;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @Column('varchar')
  status: IOrderStatus;

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.order, {
    cascade: true,
  })
  orderProducts: OrdersProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
