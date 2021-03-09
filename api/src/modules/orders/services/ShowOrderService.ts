import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import Order from '../entities/Order';

import OrdersRepository from '../repositories/OrdersRepository';

export default class ShowOrderService {
  public async execute(orderId: string): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(orderId);

    return classToClass(order);
  }
}
