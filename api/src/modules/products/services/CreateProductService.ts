import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';

import Product from '../entities/Product';

import ProductsRepository from '../repositories/ProductsRepository';

export default class CreateProductService {
  public async execute(data: ICreateProductDTO): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const findProduct = await productsRepository.findByName(data.name);

    if (findProduct) {
      throw new AppError(
        'A product with this name has already been registered',
        409,
      );
    }

    const products = await productsRepository.create(data);

    return products;
  }
}
