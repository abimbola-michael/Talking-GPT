#!/usr/bin/node

import apiRoutes from './apiRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import categoryRouter from './categoryRoutes';

export default {
  apiRoutes, authRoutes, userRoutes, categoryRouter,
};
