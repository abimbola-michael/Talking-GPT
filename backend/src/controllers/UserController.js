#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import User from '../models/users';
import ApiError from '../middleware/error';

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
      const validate = schemaValidator.getSchema('createUser');
      if (!validate(req.body)) {
        return next(new ApiError(400, validate.errors[0].message));
      }
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({ user: user.toJSON() });
    } catch (err) {
      return next(err);
    }
  }

  static async getUser(req, res) {
    const { user } = req;

    res.status(200).json({
      user: user.toJSON(),
      actions: {
        postUser: { methods: 'POST', url: `${hostName}/users` },
        postCategory: { methods: 'POST', url: `${hostName}/categories` },
        postChat: { methods: 'POST', url: `${hostName}/chats` },
      },
    });
  }
}
