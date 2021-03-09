import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import CategoriesRepository from '../repositories/CategoriesRepository';

export default class DeleteCategoryService {
  public async execute(categoryId: string): Promise<void> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategory = await categoriesRepository.findById(categoryId);

    if (!findCategory) {
      throw new AppError('Category not found', 404);
    }

    await categoriesRepository.delete(categoryId);
  }
}
