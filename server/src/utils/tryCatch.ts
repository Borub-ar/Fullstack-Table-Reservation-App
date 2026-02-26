import type { NextFunction, Request, Response } from 'express';

type ControllerHandler = (req: Request, res: Response, next?: NextFunction) => Promise<unknown> | unknown;

const tryCatch = (controller: ControllerHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default tryCatch;
