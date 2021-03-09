import { Response, Request } from 'express';

import CreateProductService from '../services/CreateProductService';
import ListProductsService from '../services/ListProductsService';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';
import ShowProductService from '../services/ShowProductService';

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.query;

    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute(
      categoryId as string | undefined,
    );

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;

    const showProductService = new ShowProductService();

    const product = await showProductService.execute(productId);

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      categoryId,
      name,
      price,
      description,
      picture,
      quantity,
    } = req.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      categoryId,
      name,
      price,
      description,
      picture,
      quantity,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;
    const {
      name,
      price,
      description,
      categoryId,
      picture,
      quantity,
    } = req.body;

    const upadteProductService = new UpdateProductService();

    const product = await upadteProductService.execute({
      id: productId,
      name,
      price,
      description,
      categoryId,
      picture,
      quantity,
    });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(productId);

    return res.status(204).send();
  }
}
