#!/usr/bin/node

import apiRoutes from './apiRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import categoryRouter from './categoryRoutes';
import chatRoutes from './chatRoutes';

export default {
  apiRoutes, authRoutes, userRoutes, categoryRouter, chatRoutes,
};
