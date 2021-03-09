import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import Order from '../entities/Order';

import OrdersRepository from '../repositories/OrdersRepository';

export default class ListOrdersService {
  public async execute(customerId?: string): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    let orders = [];

    if (customerId) {
      orders = await ordersRepository.findAllByCustomer(customerId);
    } else {
      orders = await ordersRepository.findAll();
    }

    return classToClass(orders);
  }
}
