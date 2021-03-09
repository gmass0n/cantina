import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../entities/User';

import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  avatar: string | null;
}

export default class UpdateProfileService {
  public async execute(data: IRequest): Promise<User | undefined> {
    const { userId, email } = data;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const findUserByEmail = await usersRepository.findByEmail(email);

    if (findUserByEmail && findUserByEmail.id !== userId) {
      throw new AppError('E-mail already in use', 409);
    }

    user.email = data.email;
    user.name = data.name;
    user.avatar = data.avatar;

    return usersRepository.save(user);
  }
}
