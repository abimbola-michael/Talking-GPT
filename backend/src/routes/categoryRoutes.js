#!/usr/bin/node
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import requireAuth from '../middleware/authentication';

const categoryRouter = Router();

categoryRouter.post('/categories', requireAuth, CategoryController.postCategory);
categoryRouter.get('/categories', requireAuth, CategoryController.getCategories);
categoryRouter.put('/categories/:id', requireAuth, CategoryController.updateCategory);
categoryRouter.delete('/categories/:id', requireAuth, CategoryController.deleteCategory);
categoryRouter.get('/categories/:id', requireAuth, CategoryController.getCategory);

export default categoryRouter;
