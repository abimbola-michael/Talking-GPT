#!/usr/bin/node

import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import requireAuth from '../middleware/authentication';

const chatRoutes = Router();

chatRoutes.post('/categories/:id/chats', requireAuth, ChatController.postChat);
chatRoutes.get('/chats/:id', requireAuth, ChatController.getChat);
chatRoutes.put('/chat/:id', requireAuth, ChatController.updateChat);
chatRoutes.delete('/chat/:id', requireAuth, ChatController.deleteChat);
export default chatRoutes;
