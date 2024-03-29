#!/usr/bin/node

import { Router } from 'express';
import requireAuth from '../middleware/authentication';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/users', UserController.postUser);
userRouter.get('/user', requireAuth, UserController.getUser);
userRouter.put('/user', requireAuth, UserController.updateUser);
userRouter.delete('/user', requireAuth, UserController.deleteUser);

export default userRouter;
