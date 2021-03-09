import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import { IUpdatePasswordDTO } from '../dtos/IUpdatePasswordDTO';

import CustomersRepository from '../repositories/CustomersRepository';

export default class UpdatePasswordService {
  public async execute({
    customerId,
    oldPassword,
    password,
  }: IUpdatePasswordDTO): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    if (password && !oldPassword) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    const checkOldPassword = await compare(oldPassword, customer.password);

    if (!checkOldPassword) {
      throw new AppError('Old password does not match', 403);
    }

    const hashedPassword = await hash(password, 8);

    customer.password = hashedPassword;

    await customersRepository.save(customer);
  }
}
