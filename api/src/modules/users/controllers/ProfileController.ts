import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '../services/UpdateProfileService';
import ShowProfileService from '../services/ShowProfileService';
import UpdatePasswordService from '../services/UpdatePasswordService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({
      userId,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { name, email, avatar } = req.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      userId,
      email,
      name,
      avatar,
    });

    return res.json(classToClass(user));
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { password, oldPassword } = req.body;

    const updatePasswordService = new UpdatePasswordService();

    await updatePasswordService.execute({
      userId,
      oldPassword,
      password,
    });

    return res.status(204).json();
  }
}
