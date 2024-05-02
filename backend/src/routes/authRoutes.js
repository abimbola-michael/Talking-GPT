#!/usr/bin/node

import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/login', AuthController.genToken);
export default authRouter;
