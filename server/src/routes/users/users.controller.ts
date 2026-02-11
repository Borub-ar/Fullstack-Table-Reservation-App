import type { Request, Response } from 'express';

import { registrationSchema } from '../../../../shared/validation/registrationSchema.js';

import { createNewUser } from '../../models/users/users.model.js';

import AppError from '../../AppError.js';
import { tryCatch } from '../../utils/tryCatch.js';
import { USER_INVALID_DATA } from '../../constants/errorCodes.js';

export const httpCreateNewUser = tryCatch(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const validationResult = registrationSchema.safeParse({ username, password, email });

  if (!validationResult.success) {
    throw new AppError(USER_INVALID_DATA, 'Invalid data', 400);
  }

  await createNewUser({ username, password, email });
  return res.status(201).json({ message: 'User created successfully' });
});
