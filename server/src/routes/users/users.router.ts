import { Router } from 'express';
import { httpCreateNewUser } from './users.controller.js';

const userRouter = Router();

userRouter.post('/', httpCreateNewUser);

export default userRouter;
