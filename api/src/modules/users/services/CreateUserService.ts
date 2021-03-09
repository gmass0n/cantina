import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import UsersRepository from '../repositories/UsersRepository';

import User from '../entities/User';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const findUserByEmail = await usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('This email has alredy registred');
    }

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
