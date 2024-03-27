#!/usr/bin/node

import { Router } from 'express';
import ApiControllers from '../controllers/ApiController';

const ApiRouter = Router();

ApiRouter.get('/status', ApiControllers.getStatus);
ApiRouter.get('/stats', ApiControllers.getStats);

export default ApiRouter;
