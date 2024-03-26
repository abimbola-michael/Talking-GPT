#!/usr/bin/node

import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import requireAuth from '../middleware/authentication';

const chatRoutes = Router();

chatRoutes.post('/chats', requireAuth, ChatController.postChat);

export default chatRoutes;
