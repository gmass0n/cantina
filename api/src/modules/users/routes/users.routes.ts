import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import sessionsRouter from './sessions.routes';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.use('/sessions', sessionsRouter);

export default usersRouter;
