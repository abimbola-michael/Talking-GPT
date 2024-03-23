#!/usr/bin/node

import express from 'express';
import morgan from 'morgan';
import httpStatusCode from 'http-status-codes';
import 'dotenv/config';
import startServer from './config/startServer';
import ApiRoutes from './routes/ApiRoute';
import ApiError, { errorResponse } from './middleware/error';

const app = express();
const logger = morgan('combined');

app.use(logger);
app.use('/api/v1', ApiRoutes);
app.all('*', (req, res, next) => {
  errorResponse(new ApiError(httpStatusCode.NOT_FOUND, 'Not found'), req, res, next);
});
app.use(errorResponse);

startServer(app);

export default app;
