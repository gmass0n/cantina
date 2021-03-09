import { EntityRepository, Repository, getRepository, In } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Product from '../entities/Product';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';
import { IUpdateProductsQuantityDTO } from '../dtos/IUpdateProductsQuantityDTO';

interface IFindProducts {
  id: string;
}

interface IProductsRepository {
  findAll(categoryId?: string): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: IUpdateProductDTO): Promise<Product | undefined>;
  delete(id: string): Promise<void>;
  save(product: Product): Promise<Product>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
}

@EntityRepository(Product)
export default class ProductsRepository implements IProductsRepository {
  private productsRepository: Repository<Product>;

  constructor() {
    this.productsRepository = getRepository(Product);
  }

  public async findAll(categoryId?: string): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: ['category'],
      where: categoryId ? { categoryId } : {},
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne(id);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const idList = products.map(product => product.id);
    const orderList = await this.productsRepository.find({ id: In(idList) });

    if (idList.length !== orderList.length) {
      throw new AppError('Missing Product');
    }

    return orderList;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.productsRepository.create(data);

    await this.productsRepository.save(product);

    return product;
  }

  public async update(data: IUpdateProductDTO): Promise<Product | undefined> {
    const { id, ...rest } = data;

    await this.productsRepository.update(id, rest);

    const product = await this.findById(id);

    return product;
  }

  public async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  public async save(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsData = await this.findAllById(products);
    const newProducts = productsData.map(productData => {
      const productFind = products.find(
        product => product.id === productData.id,
      );

      if (!productFind) {
        throw new AppError('Product not find');
      }

      if (productData.quantity < productFind.quantity) {
        throw new AppError('Insufficient product quantity');
      }

      const newProduct = productData;

      newProduct.quantity -= productFind.quantity;

      return newProduct;
    });

    await this.productsRepository.save(newProducts);

    return newProducts;
  }
}
