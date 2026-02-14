import { Router } from 'express';
import { createUserHandler } from './users.controller.js';

const userRouter = Router();

userRouter.post('/', createUserHandler);

export default userRouter;
