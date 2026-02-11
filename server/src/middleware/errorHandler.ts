import type { Request, Response, NextFunction } from 'express';

import AppError from '../AppError.js';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, fields: error.fields, errorCode: error.errorCode });
  }

  return res.status(500).json({ message: 'Something went wrong' });
};
