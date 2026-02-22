import type { Request, Response } from 'express';

import { tryCatch } from '../../utils/tryCatch.js';

import {
  createUser,
  sendVerificationEmail,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
} from '../../models/users/users.model.js';

export const createUserHandler = tryCatch(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const result = await createUser({ username, password, email });
  return res.status(201).json(result);
});

export const sendVerificationEmailHandler = tryCatch(async (req: Request, res: Response) => {
  const { email } = req.body;
  const response = await sendVerificationEmail(email);
  return res.status(200).json(response);
});

export const resendVerificationEmailHandler = tryCatch(async (req: Request, res: Response) => {
  const { token } = req.body;
  const response = await resendVerificationEmail(token);
  return res.status(200).json(response);
});

export const verifyEmailHandler = tryCatch(async (req: Request, res: Response) => {
  const tokenParam = req.params.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const response = await verifyEmail(token);
  return res.status(200).json(response);
});

export const loginUserHandler = tryCatch(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const response = await loginUser(username, password);
  return res.status(200).json(response);
});

export const logoutUserHandler = tryCatch(async (req: Request, res: Response) => {
  console.log('logout');
});

export const refreshSessionTokenHandler = tryCatch(async (req: Request, res: Response) => {
  console.log('refresh session token');
});
