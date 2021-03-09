import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import Order from '../entities/Order';
import { IOrderStatus } from '../types/IOrderStatus';

import OrdersRepository from '../repositories/OrdersRepository';

interface IRequest {
  status: IOrderStatus;
  orderId: string;
}

export default class UpdateOrderStatusService {
  public async execute({
    orderId,
    status,
  }: IRequest): Promise<Order | undefined> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    order.status = status;

    await ordersRepository.save(order);

    return classToClass(order);
  }
}
