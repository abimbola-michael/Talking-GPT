#!/usr/bin/node

import User from '../models/users';

const hostName = process.env.API_HOST_NAME || 'http://0.0.0.0/api/v1';

/**
 * UserController.
 */
export default class UserController {
  /**
   * postUser.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async postUser(req, res, next) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ data: user.toJSON() });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res) {
    const { user } = req;

    res.status(200).json({
      data: user.toJSON(),
      actions: {
        postUser: { methods: 'POST', url: `${hostName}/users` },
        postCategory: { methods: 'POST', url: `${hostName}/categories` },
        postChat: { methods: 'POST', url: `${hostName}/chats` },
      },
    });
  }
}
