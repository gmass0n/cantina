import { EntityRepository, Repository, getRepository } from 'typeorm';

import Category from '../entities/Category';

import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO';

interface ICategoriesRepository {
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  update(data: IUpdateCategoryDTO): Promise<Category | undefined>;
  delete(id: string): Promise<void>;
  save(category: Category): Promise<Category>;
}

@EntityRepository(Category)
export default class CategoriesRespository implements ICategoriesRepository {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOne(id);

    return category;
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.create(data);

    await this.categoryRepository.save(category);

    return category;
  }

  public async update(data: IUpdateCategoryDTO): Promise<Category | undefined> {
    const { id, name, picture } = data;

    await this.categoryRepository.update(id, { name, picture });

    const category = this.findById(id);

    return category;
  }

  public async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  public async save(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }
}
