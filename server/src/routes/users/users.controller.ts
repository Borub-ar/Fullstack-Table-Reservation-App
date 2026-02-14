import type { Request, Response } from 'express';

import { tryCatch } from '../../utils/tryCatch.js';

import { createUser } from '../../models/users/users.model.js';

export const createUserHandler = tryCatch(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  await createUser({ username, password, email });
  return res.status(201).json({ success: true, message: 'User created successfully' });
});
