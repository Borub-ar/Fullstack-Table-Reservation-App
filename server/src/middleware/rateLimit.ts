import { rateLimit } from 'express-rate-limit';
import type { Request, Response } from 'express';

const MESSAGE = 'Too many requests, please try again later.';
const WINDOW_MS = 15 * 60 * 1000;

const jsonLimiterHandler = (_req: Request, res: Response) => {
  res.status(429).json({ success: false, message: MESSAGE });
};

export const appLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 100,
  standardHeaders: true,
  handler: jsonLimiterHandler,
});

export const registrationLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 5,
  standardHeaders: true,
  handler: jsonLimiterHandler,
});

export const verificationLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 5,
  standardHeaders: true,
  handler: jsonLimiterHandler,
});

export const loginLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 15,
  standardHeaders: true,
  handler: jsonLimiterHandler,
});

export const refreshSessionTokenLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 60,
  standardHeaders: true,
  handler: jsonLimiterHandler,
});