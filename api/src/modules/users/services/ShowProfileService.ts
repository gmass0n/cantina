import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../entities/User';

import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  userId: string;
}

export default class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
