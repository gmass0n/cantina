import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import { IUpdatePasswordDTO } from '../dtos/IUpdatePasswordDTO';

import UsersRepository from '../repositories/UsersRepository';

export default class UpdatePasswordService {
  public async execute({
    userId,
    oldPassword,
    password,
  }: IUpdatePasswordDTO): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (password && !oldPassword) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    const checkOldPassword = await compare(oldPassword, user.password);

    if (!checkOldPassword) {
      throw new AppError('Old password does not match', 403);
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await userRepository.save(user);
  }
}
