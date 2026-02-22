import { rateLimit } from 'express-rate-limit';

const MESSAGE = 'Too many requests, please try again later.';
const WINDOW_MS = 15 * 60 * 1000;

export const appLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 100,
  message: MESSAGE,
  standardHeaders: true,
});

export const registrationLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 10,
  message: MESSAGE,
  standardHeaders: true,
});

export const verificationLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 10,
  message: MESSAGE,
  standardHeaders: true,
});
