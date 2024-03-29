#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import Chat from '../models/chats';
import Category from '../models/chatCategories';

const hostname = process.env.API_HOST_NAME || 'http://0.0.0.0/api/v1';

/**
 * ChatController.
 */
export default class ChatController {
  /**
   * postChat.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async postChat(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const chatValidator = schemaValidator.getSchema('postChat');
      if (!chatValidator(req.body)) {
        return next(new ApiError(400, chatValidator.errors[0].message));
      }
      req.body.user = user._id.toString();
      const category = await Category.findById(id).exec();
      if (!category) {
        return next(new ApiError(400, 'category must exists'));
      }
      req.body.category = category._id;
      const chat = new Chat(req.body);
      await chat.save();
      category.chats.push(chat._id);
      await category.save();
      return res.status(201).json({
        chat: chat.toJSON(),
        actions: {
          getChat: { method: 'GET', url: `${hostname}/chat/${chat._id.toString()}` },
          deleteChat: { method: 'DELETE', url: `${hostname}/chat/${chat._id.toString()}` },
          updateChat: { method: 'PUT', url: `${hostname}/chat/${chat._id.toString()}` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * getChat.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async getChat(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req;

      const chat = await Chat.findOne({ _id: id, user: user._id }).exec();

      if (!chat) {
        return next(new ApiError(404, 'Chat not found'));
      }
      return res.status(200).json({
        chat: chat.toJSON(),
        actions: {
          deleteChat: { method: 'DELETE', url: `${hostname}/api/v1/chats/${chat._id}` },
          updateChat: { method: 'PUT', url: `${hostname}/api/v1/chats/${chat._id}` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * deleteChat.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async deleteChat(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      await Chat.findOneAndDelete({ _id: id, user: user._id });
      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  }

  /**
   * updateChat.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async updateChat(req, res, next) {
    try {
      const { user } = req;
      const { id } = req;
      const validateChat = schemaValidator.getSchema('updateChat');
      if (!validateChat.validate(req.body)) {
        return next(validateChat.errors[0].message);
      }

      const chat = await Chat.findOneAndUpdate({ _id: id, user: user._id }, req.body);
      if (!chat) {
        return next(new ApiError(404, 'Chat not found'));
      }
      const updatedChat = await Chat.findById(id).exec();
      return res.status(200).json({
        chat: updatedChat.toJSON(),
        actions: {
          getChat: { method: 'GET', url: `${hostname}/chats/${chat._id.toString()}` },
          deleteChat: { method: 'DELETE', url: `${hostname}/chats/${chat._id.toString()}` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getCategoryChats(req, res) {
    const { user } = req;
    const { id } = req.params;

    const chats = await Chat.find({ user: user._id, category: id }).exec();
    return res.status(200).json({
      chats: chats.map((c) => c.toJSON()),
      actions: {
        postChat: { method: 'POST', url: `${hostname}/chats/${id}` },
      },
    });
  }
}
