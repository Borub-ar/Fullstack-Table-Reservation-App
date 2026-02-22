import { Router } from 'express';
import {
  createUserHandler,
  resendVerificationEmailHandler,
  sendVerificationEmailHandler,
  verifyEmailHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshSessionTokenHandler,
} from './users.controller.js';

import {
  refreshSessionTokenLimiter,
  registrationLimiter,
  verificationLimiter,
  loginLimiter,
} from '../../middleware/rateLimit.js';

const userRouter = Router();

userRouter.get('/verify-email/:token', verificationLimiter, verifyEmailHandler);

userRouter.post('/create', registrationLimiter, createUserHandler);
userRouter.post('/send-verification-email', verificationLimiter, sendVerificationEmailHandler);
userRouter.post('/resend-verification-email', verificationLimiter, resendVerificationEmailHandler);

userRouter.post('/login', loginLimiter, loginUserHandler);
userRouter.post('/logout', logoutUserHandler);
userRouter.post('/refresh-session-token', refreshSessionTokenLimiter, refreshSessionTokenHandler);

export default userRouter;
