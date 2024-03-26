#!/usr/bin/node

import express from 'express';

import 'dotenv/config';
import AppConfig from './config';

const app = express();

AppConfig.setupSchema();
AppConfig.setupApp(app);
AppConfig.startServer(app);

export default app;
