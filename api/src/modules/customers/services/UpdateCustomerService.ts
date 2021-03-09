import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { IUpdateCustomerDTO } from '../dtos/IUpdateCustomerDTO';

import Customer from '../entities/Customer';

import CustomersRepository from '../repositories/CustomersRepository';

export default class UpdateCustomerService {
  public async execute(
    data: IUpdateCustomerDTO,
  ): Promise<Customer | undefined> {
    const {
      customerId,
      email,
      name,
      avatar,
      address,
      phoneNumber,
      document,
    } = data;

    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const findCustomerByEmail = await customersRepository.findByEmail(email);

    if (findCustomerByEmail && findCustomerByEmail.id !== customerId) {
      throw new AppError('E-mail already in use', 409);
    }

    customer.email = email;
    customer.name = name;
    customer.avatar = avatar;
    customer.address = address;
    customer.phoneNumber = phoneNumber;
    customer.document = document;

    return customersRepository.save(customer);
  }
}
