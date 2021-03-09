import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';

import Product from '../entities/Product';

import ProductsRepository from '../repositories/ProductsRepository';

export default class UpdateProductService {
  public async execute(data: IUpdateProductDTO): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findById(data.id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    const findProductByName = await productsRepository.findByName(data.name);

    if (findProductByName && findProductByName.id !== data.id) {
      throw new AppError(
        'A product with this name has already been registered',
        409,
      );
    }

    product.name = data.name;
    product.price = data.price;
    product.categoryId = data.categoryId;
    product.description = data.description;
    product.picture = data.picture;
    product.quantity = data.quantity;

    return productsRepository.save(product);
  }
}
