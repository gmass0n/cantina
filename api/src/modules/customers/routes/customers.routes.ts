import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

import sessionsRouter from './sessions.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.post('/', customersController.create);

customersRouter.use('/sessions', sessionsRouter);

customersRouter.use(ensureAuthenticated);

customersRouter.get('/', customersController.show);
customersRouter.put('/', customersController.update);
customersRouter.patch('/password', customersController.updatePassword);

export default customersRouter;
