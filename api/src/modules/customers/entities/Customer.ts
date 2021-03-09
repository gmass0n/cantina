import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICustomerAddress } from '../interfaces/ICustomerAddress';

@Entity('customers')
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'json', nullable: true })
  address: ICustomerAddress | null;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string | null;

  @Column()
  document: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
