import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import CategoriesRepository from '../repositories/CategoriesRepository';

import Category from '../entities/Category';

import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';

export default class CreateCategoryService {
  public async execute(data: ICreateCategoryDTO): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategory = await categoriesRepository.findByName(data.name);

    if (findCategory) {
      throw new AppError(
        'A category with this name has already been registered',
        409,
      );
    }

    const category = await categoriesRepository.create(data);

    return category;
  }
}
