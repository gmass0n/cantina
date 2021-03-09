import { Response, Request } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';
import ShowCategoryService from '../services/ShowCategoryService';

export default class CategoriesController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listCategoriesService = new ListCategoriesService();

    const categories = await listCategoriesService.execute();

    return res.json(categories);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const showCategoryService = new ShowCategoryService();

    const category = await showCategoryService.execute(categoryId);

    return res.json(category);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, picture } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      picture,
    });

    return res.json(category);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, picture } = req.body;
    const { categoryId } = req.params;

    const upateCategoryService = new UpdateCategoryService();

    const category = await upateCategoryService.execute({
      id: categoryId,
      name,
      picture,
    });

    return res.json(category);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const deleteCategoryService = new DeleteCategoryService();

    await deleteCategoryService.execute(categoryId);

    return res.status(204).send();
  }
}
