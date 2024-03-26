#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import Chat from '../models/chats';
import Category from '../models/chatCategories';

export default class ChatController {
  static async postChat(req, res, next) {
    try {
      const { user } = req;

      const chatValidator = schemaValidator('postChat');
      req.body.user = user._id.toString();
      if (!chatValidator(req.body)) {
        return next(new ApiError(400, chatValidator.errors[0].message));
      }

      const chat = new Chat(req.body);
      const category = await Category.findById(req.body.category);
      if (!category) {
        return next(new ApiError(400, 'category must be valid'));
      }
      await chat.save();
      category.chats.push(chat._id);
      await category.save();
      return res.status(201).json(chat.toJSON());
    } catch (err) {
      return next(err);
    }
  }
}
