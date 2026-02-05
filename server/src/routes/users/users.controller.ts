import type { Request, Response } from 'express';

import { createNewUser } from '../../models/users/users.model.js';

import type { CreateUserDto } from '../../types/user.js';

const httpCreateNewUser = async (
  req: Request<Record<string, never>, Record<string, never>, CreateUserDto>,
  res: Response,
) => {
  const { username, password, email } = req.body;

  await createNewUser({ username, password, email });
  return res.status(201).json({ message: 'User created successfully' });
};

export { httpCreateNewUser };
