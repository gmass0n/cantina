import { Router } from 'express';

import usersRouter from '@modules/users/routes/users.routes';
import categoriesRouter from '@modules/categories/routes/categories.routes';
import productsRouter from '@modules/products/routes/products.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import filesRouter from '@modules/files/routes/files.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/files', filesRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
