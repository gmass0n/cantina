import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import ProductsRepository from '../repositories/ProductsRepository';

export default class DeleteProductService {
  public async execute(productId: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const findProduct = await productsRepository.findById(productId);

    if (!findProduct) {
      throw new AppError('Product not found', 404);
    }

    await productsRepository.delete(productId);
  }
}
