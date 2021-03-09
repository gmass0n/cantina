import { getCustomRepository } from 'typeorm';

import Category from '../entities/Category';

import CategoriesRepository from '../repositories/CategoriesRepository';

export default class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const categories = await categoriesRepository.findAll();

    return categories;
  }
}
