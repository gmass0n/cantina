import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';

import CreateCustomerService from '../services/CreateCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import UpdatePasswordService from '../services/UpdatePasswordService';

export default class CustomersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const customerId = req.customer.id;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({
      customerId,
    });

    return res.json(classToClass(customer));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, document } = request.body;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
      password,
      document,
    });

    return response.json(classToClass(customer));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const customerId = req.customer.id;
    const { name, email, avatar, phoneNumber, address, document } = req.body;

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({
      customerId,
      email,
      name,
      avatar,
      phoneNumber,
      address,
      document,
    });

    return res.json(classToClass(customer));
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const customerId = req.customer.id;
    const { password, oldPassword } = req.body;

    const updatePasswordService = new UpdatePasswordService();

    await updatePasswordService.execute({
      customerId,
      oldPassword,
      password,
    });

    return res.status(204).json();
  }
}
