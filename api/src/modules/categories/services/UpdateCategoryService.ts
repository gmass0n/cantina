import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO';

import CategoriesRepository from '../repositories/CategoriesRepository';

import Category from '../entities/Category';

export default class UpdateCategoryService {
  public async execute({
    name,
    id,
    picture,
  }: IUpdateCategoryDTO): Promise<Category | undefined> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const findCategoryByName = await categoriesRepository.findByName(name);

    if (findCategoryByName && findCategoryByName.id !== id) {
      throw new AppError(
        'A category with this name has already been registered',
        409,
      );
    }

    category.name = name;
    category.picture = picture;

    return categoriesRepository.save(category);
  }
}
