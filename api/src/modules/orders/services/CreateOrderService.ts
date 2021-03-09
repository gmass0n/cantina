import CustomersRepository from '@modules/customers/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Order from '../entities/Order';

import OrdersRepository from '../repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customerId, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const findCustomer = await customersRepository.findById(customerId);

    if (!findCustomer) {
      throw new AppError('Customer not found', 404);
    }

    const existentProducts = await productsRepository.findAllById(products);

    if (existentProducts.length === 0) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length > 0) {
      throw new AppError(
        `The quantity ${findProductsWithNoQuantityAvailable[0].quantity} is not available for ${findProductsWithNoQuantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price:
        existentProducts.filter(p => p.id === product.id)[0].price *
        product.quantity,
    }));

    const total = serializedProducts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);

    const order = await ordersRepository.create({
      customerId,
      products: serializedProducts,
      total,
    });

    await productsRepository.updateQuantity(products);

    return order;
  }
}
