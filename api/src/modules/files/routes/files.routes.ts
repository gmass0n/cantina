import express, { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import FilesContoller from '../controllers/FIlesController';

const filesRouter = Router();
const upload = multer(uploadConfig);

const filesController = new FilesContoller();

filesRouter.use('/', express.static(uploadConfig.directory));

filesRouter.post('/', upload.single('file'), filesController.upload);

export default filesRouter;
