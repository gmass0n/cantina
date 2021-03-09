import { Response, Request } from 'express';

import CreateOrderService from '../services/CreateOrderService';
import ListOrdersService from '../services/ListOrdersService';
import ShowOrderService from '../services/ShowOrderService';
import UpdateOrderStatusService from '../services/UpdateOrderStatusService';

export default class OrdersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const customerId = req.query.customerId as string;

    const listOrdersService = new ListOrdersService();

    const orders = await listOrdersService.execute(customerId);

    return res.json(orders);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const customerId = req.customer.id;
    const { products } = req.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
      customerId,
      products,
    });

    return res.json(order);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;

    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute(orderId);

    return res.json(order);
  }

  public async updateStatusToPreparing(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { orderId } = req.params;

    const updateOrderStatusService = new UpdateOrderStatusService();

    const order = await updateOrderStatusService.execute({
      orderId,
      status: 'preparing',
    });

    return res.json(order);
  }

  public async updateStatusToCanceled(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { orderId } = req.params;

    const updateOrderStatusService = new UpdateOrderStatusService();

    const order = await updateOrderStatusService.execute({
      orderId,
      status: 'canceled',
    });

    return res.json(order);
  }

  public async updateStatusToReady(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { orderId } = req.params;

    const updateOrderStatusService = new UpdateOrderStatusService();

    const order = await updateOrderStatusService.execute({
      orderId,
      status: 'ready',
    });

    return res.json(order);
  }
}
