#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import Category from '../models/chatCategories';

export default class CategoryController {
  static async postCategory(req, res, next) {
    try {
      const validateCategory = schemaValidator.getSchema('createCategory');
      if (!validateCategory(req.body)) {
        return next(new ApiError(400, validateCategory.errors[0].message));
      }
      const category = new Category(req.body);
      await category.save();

      return res.status(201).json({ data: category.toJSON() });
    } catch (err) {
      return next(err);
    }
  }
}
