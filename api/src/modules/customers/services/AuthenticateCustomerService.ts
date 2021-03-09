import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import Customer from '../entities/Customer';

import CustomersRepository from '../repositories/CustomersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  customer: Customer;
  token: string;
}

export default class AuthenticateCustomerService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, customer.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    return {
      customer,
      token,
    };
  }
}
