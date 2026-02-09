import type { Request, Response, NextFunction } from 'express';
import AppError from '../AppError.js';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send(error.message);
  }

  return res.status(500).send('Something went wrong');
};
