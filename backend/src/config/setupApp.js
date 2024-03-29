#!/usr/bin/node

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import httpStatusCode from 'http-status-codes';
import { rateLimit } from 'express-rate-limit';
import ApiRoutes from '../routes';
import ApiError, { errorResponse } from '../middleware/error';

const logger = morgan('combined');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

export default function setUpApp(app) {
  app.set('trust proxy', 1);
  app.use(limiter);
  app.use(cors(corsOptions));
  app.use(logger);
  app.use(express.json());
  app.use('/api/v1', ApiRoutes.apiRoutes);
  app.use('/api/v1', ApiRoutes.authRoutes);
  app.use('/api/v1', ApiRoutes.userRoutes);
  app.use('/api/v1', ApiRoutes.categoryRouter);
  app.use('/api/v1', ApiRoutes.chatRoutes);
  app.all('*', (req, res, next) => {
    errorResponse(
      new ApiError(httpStatusCode.NOT_FOUND, 'Not found'),
      req,
      res,
      next,
    );
  });
  app.use(errorResponse);
}
