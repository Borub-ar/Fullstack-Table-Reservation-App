import { Router } from 'express';
import { createUserHandler, sendVerificationEmailHandler, verifyEmailHandler } from './users.controller.js';

const userRouter = Router();

userRouter.post('/create', createUserHandler);
userRouter.post('/send-verification-email', sendVerificationEmailHandler);
userRouter.get('/verify-email/:token', verifyEmailHandler);

export default userRouter;
