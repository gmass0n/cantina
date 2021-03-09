import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Customer from '../entities/Customer';

import CustomersRepository from '../repositories/CustomersRepository';

interface IRequest {
  customerId: string;
}

export default class ShowCustomerService {
  public async execute({ customerId }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}
