import { Router } from 'express';

import ensureAdminAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import ensureCustomerAuthenticated from '@modules/customers/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.get('/', ensureAdminAuthenticated, ordersController.index);
ordersRouter.get('/:orderId', ordersController.show);

ordersRouter.post('/', ensureCustomerAuthenticated, ordersController.create);
ordersRouter.patch(
  '/:orderId/prepare',
  ensureAdminAuthenticated,
  ordersController.updateStatusToPreparing,
);
ordersRouter.patch(
  '/:orderId/cancel',
  ensureAdminAuthenticated,
  ordersController.updateStatusToCanceled,
);
ordersRouter.patch(
  '/:orderId/finish',
  ensureAdminAuthenticated,
  ordersController.updateStatusToReady,
);

export default ordersRouter;
