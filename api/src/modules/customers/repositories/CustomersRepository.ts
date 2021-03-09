import { EntityRepository, Repository, getRepository } from 'typeorm';

import Customer from '../entities/Customer';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
}

@EntityRepository(Customer)
export default class CustomersRepository implements ICustomersRepository {
  private customersRepository: Repository<Customer>;

  constructor() {
    this.customersRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findOne(id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findUser = await this.customersRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async create({
    name,
    email,
    password,
    document,
  }: ICreateCustomerDTO): Promise<Customer> {
    const user = this.customersRepository.create({
      name,
      email,
      password,
      document,
    });

    await this.customersRepository.save(user);

    return user;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }
}
