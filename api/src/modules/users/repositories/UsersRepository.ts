import { EntityRepository, Repository, getRepository } from 'typeorm';

import User from '../entities/User';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

@EntityRepository(User)
export default class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.usersRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async update(data: IUpdateUserDTO): Promise<User | undefined> {
    const { userId, email, name, avatar, password } = data;

    await this.usersRepository.update(userId, {
      name,
      email,
      ...(avatar && { avatar }),
      ...(password && { password }),
    });

    const user = await this.findById(userId);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
