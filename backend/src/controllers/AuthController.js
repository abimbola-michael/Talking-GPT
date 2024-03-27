#!/usr/bin/node

import { generateToken, verifyPassword } from '../utils/authentication';
import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import User from '../models/users';

export default class AuthController {
  static async genToken(req, res, next) {
    try {
      let exp = (Date.now() / 1000) + 60 * 60;
      const userValidator = schemaValidator.getSchema('userLogin');
      if (!userValidator(req.body)) {
        return next(new ApiError(400, userValidator.errors[0].message));
      }

      if (req.query.exp) {
        exp = (Date.now() / 1000) + Number(req.query.exp);
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(new ApiError(401, 'Unauthorized'));
      }

      if (!verifyPassword(req.body.password, user.password)) {
        return next(new ApiError(401, 'Unauthorized'));
      }
      const token = generateToken({ _id: user._id.toString(), exp });

      return res.status(200).json({ token, actions: {}, exp: new Date(exp * 1000) });
    } catch (err) {
      return next(err);
    }
  }
}
