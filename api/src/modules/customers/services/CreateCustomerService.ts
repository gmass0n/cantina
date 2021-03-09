import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import CustomersRepository from '../repositories/CustomersRepository';

import Customer from '../entities/Customer';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

export default class CreateCustomerService {
  public async execute({
    name,
    email,
    document,
    password,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const findCustomerByEmail = await customersRepository.findByEmail(email);

    if (findCustomerByEmail) {
      throw new AppError('This email has alredy registred');
    }

    const hashedPassword = await hash(password, 8);

    const customer = await customersRepository.create({
      name,
      email,
      document,
      password: hashedPassword,
    });

    return customer;
  }
}
