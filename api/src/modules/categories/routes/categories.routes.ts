import { Router } from 'express';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/:categoryId', categoriesController.show);

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:categoryId', categoriesController.update);
categoriesRouter.delete('/:categoryId', categoriesController.delete);

export default categoriesRouter;
