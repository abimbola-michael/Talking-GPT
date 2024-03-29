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
      return res.status(201).json({
        user: user.toJSON(),
        actions: {
          postUpdate: { methods: 'PUT', url: `${hostName}/users` },
          postCategory: { methods: 'POST', url: `${hostName}/categories/` },
          deleteUser: { methods: 'DELETE', url: `${hostName}/users` },
          getUser: { methods: 'GET', url: `${hostName}/users` },
          genToken: { methods: 'POST', url: `${hostName}/login` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * getUser.
   *
   * @param {} req
   * @param {} res
   */
  static async getUser(req, res) {
    let { user } = req;

    user = await User.findById(user._id).populate('categories');

    res.status(200).json({
      user: user.toJSON(),
      actions: {
        postUser: { methods: 'POST', url: `${hostName}/users` },
        postCategory: { methods: 'POST', url: `${hostName}/categories` },
        deleteUser: { methods: 'DELETE', url: `${hostName}/users` },
      },
    });
  }

  /**
   * updateUser.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async updateUser(req, res, next) {
    try {
      const { user } = req;

      const updateValidator = schemaValidator.getSchema('updateUser');
      if (!updateValidator(req.body)) {
        return next(new ApiError(400, updateValidator.errors[0].message));
      }
      await User.updateOne({ _id: user._id }, req.body);
      const updatedUser = await User.findById(user._id).populate('categories');
      return res.status(200).json({
        user: updatedUser.toJSON(),
        actions: {
          postUpdate: { methods: 'PUT', url: `${hostName}/users` },
          postCategory: { methods: 'POST', url: `${hostName}/categories/` },
          deleteUser: { methods: 'DELETE', url: `${hostName}/users` },
          getUser: { methods: 'GET', url: `${hostName}/users` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * deleteUser.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async deleteUser(req, res, next) {
    try {
      const { user } = req;

      await User.findOneAndDelete({ _id: user._id });
      return res.status(204).end();
    } catch (err) {
      return next(err);
    }
  }
}
