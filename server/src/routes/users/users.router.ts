import { Router } from 'express';
import {
  createUserHandler,
  resendVerificationEmailHandler,
  sendVerificationEmailHandler,
  verifyEmailHandler,
} from './users.controller.js';

import { registrationLimiter, verificationLimiter } from '../../middleware/rateLimit.js';

const userRouter = Router();

userRouter.get('/verify-email/:token', verificationLimiter, verifyEmailHandler);

userRouter.post('/create', registrationLimiter, createUserHandler);
userRouter.post('/send-verification-email', verificationLimiter, sendVerificationEmailHandler);
userRouter.post('/resend-verification-email', verificationLimiter, resendVerificationEmailHandler);

export default userRouter;
