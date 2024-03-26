#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import Category from '../models/chatCategories';

/**
 * CategoryController.
 */
export default class CategoryController {
  /**
   * postCategory.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async postCategory(req, res, next) {
    try {
      const { user } = req;

      const validateCategory = schemaValidator.getSchema('createCategory');
      req.body.user = user._id.toString();
      if (!validateCategory(req.body)) {
        return next(new ApiError(400, validateCategory.errors[0].message));
      }
      const category = new Category(req.body);
      await category.save();

      user.categories.push(category._id);
      await user.save();
      return res.status(201).json({ data: category.toJSON() });
    } catch (err) {
      return next(err);
    }
  }
}
