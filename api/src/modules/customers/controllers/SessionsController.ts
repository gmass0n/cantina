import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateCustomerService from '../services/AuthenticateCustomerService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateCustomerService = new AuthenticateCustomerService();

    const { customer, token } = await authenticateCustomerService.execute({
      email,
      password,
    });

    return response.json({ customer: classToClass(customer), token });
  }
}
