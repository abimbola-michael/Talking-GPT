#!/usr/bin/node

import { Router } from 'express';
import requireAuth from '../middleware/authentication';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/users', UserController.postUser);
userRouter.get('/user', requireAuth, UserController.getUser);

export default userRouter;
