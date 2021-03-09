import { getCustomRepository } from 'typeorm';

import Category from '../entities/Category';

import CategoriesRepository from '../repositories/CategoriesRepository';

export default class ShowCategoryService {
  public async execute(categoryId: string): Promise<Category | undefined> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findById(categoryId);

    return category;
  }
}
