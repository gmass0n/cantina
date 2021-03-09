import { Router } from 'express';

import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:productId', productsController.show);

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.put('/:productId', productsController.update);
productsRouter.delete('/:productId', productsController.delete);

export default productsRouter;
