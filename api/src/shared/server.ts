/* eslint-disable no-console */
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import 'reflect-metadata';
import 'es6-shim';

import './database';

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (error: AppError, request: Request, response: Response, _: NextFunction) => {
    console.error(`⚠️  AppError - ${error.message} - ${error.statusCode}`);

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internar server error',
    });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started at port ${process.env.PORT}!`);
});
