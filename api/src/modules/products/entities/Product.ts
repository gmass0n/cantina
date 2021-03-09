import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import Category from '@modules/categories/entities/Category';
import OrdersProducts from '@modules/orders/entities/OrdersProducts';
import ColumnNumericTransformer from '@shared/utils/ColumnNumericTransformer';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column()
  picture: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrdersProducts, orderProducts => orderProducts.product)
  orderProducts: OrdersProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
