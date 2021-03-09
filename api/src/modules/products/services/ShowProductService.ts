import { getCustomRepository } from 'typeorm';

import Product from '../entities/Product';

import ProductsRepository from '../repositories/ProductsRepository';

export default class ShowProductService {
  public async execute(productId: string): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findById(productId);

    return product;
  }
}
