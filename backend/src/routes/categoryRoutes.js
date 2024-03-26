#!/usr/bin/node
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import requireAuth from '../middleware/authentication';

const categoryRouter = Router();

categoryRouter.post('/categories', requireAuth, CategoryController.postCategory);

export default categoryRouter;
