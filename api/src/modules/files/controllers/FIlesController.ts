import { Request, Response } from 'express';

export default class FilesContoller {
  public async upload(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;

    const fileUrl = `${process.env.APP_API_URL}/files/${filename}`;

    return res.json({ fileUrl });
  }
}
