import { EntityRepository, Repository, getRepository } from 'typeorm';

import Order from '../entities/Order';

import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';

interface IOrdersRepository {
  findAll(): Promise<Order[]>;
  findAllByCustomer(customerId: string): Promise<Order[]>;
  findById(id: string): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
}

@EntityRepository(Order)
export default class OrdersRepository implements IOrdersRepository {
  private ordersRepository: Repository<Order>;

  constructor() {
    this.ordersRepository = getRepository(Order);
  }

  public async findAll(): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      relations: ['customer', 'orderProducts', 'orderProducts.product'],
    });

    return orders;
  }

  public async findAllByCustomer(customerId: string): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      relations: ['customer', 'orderProducts', 'orderProducts.product'],
      where: { customerId },
    });

    return orders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['customer', 'orderProducts', 'orderProducts.product'],
    });

    return order;
  }

  public async create({
    customerId,
    total,
    products,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ordersRepository.create({
      customerId,
      orderProducts: products,
      total,
    });

    await this.ordersRepository.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }
}
