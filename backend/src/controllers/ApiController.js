#!/usr/bin/node
import Users from '../models/users';
import Chats from '../models/chats';
import Category from '../models/chatCategories';

/**
 * ApiControllers.
 */
class ApiControllers {
  /**
   * getStatus.
   *
   * @param {express.request} req - express request object
   * @param {express.response} res - express response object
   */
  static getStatus(req, res) {
    res.status(200).json({ status: 'ok' });
  }

  /**
   * getStats.
   *
   * @param {request} req - express request object
   * @param {response} res - express response object
   */
  static async getStats(req, res) {
    res.status(200).json({
      users: await Users.countDocuments(),
      chats: await Chats.countDocuments(),
      categories: await Category.countDocuments(),
    });
  }
}

export default ApiControllers;
