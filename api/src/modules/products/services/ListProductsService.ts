import { getCustomRepository } from 'typeorm';

import Product from '../entities/Product';

import ProductsRepository from '../repositories/ProductsRepository';

export default class ListProductsService {
  public async execute(categoryId?: string): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.findAll(categoryId);

    products.forEach(product => {
      const newProduct = product;

      delete newProduct.categoryId;
    });

    return products;
  }
}
