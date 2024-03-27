#!/usr/bin/node

import { schemaValidator } from '../config/setupSchema';
import ApiError from '../middleware/error';
import Category from '../models/chatCategories';

const hostname = process.env.API_HOST_NAME || 'http://0.0.0.0:5000/api/v1';

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
      return res.status(201).json({
        category: category.toJSON(),
        actions: {

        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * getCategories.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async getCategories(req, res, next) {
    try {
      const { user } = req;
      const {
        limit = 10, before, sort = 'createdAt', order = 'asc', after, starts,
      } = req.query;

      const query = { user: user._id };
      if (before) {
        query.createdAt = { $lt: before };
      }
      if (after) {
        query.createdAt = { $gt: after };
      }
      if (starts) {
        query.name = { $regex: `^${starts}`, $options: 'i' };
      }
      const categories = await Category.find(query)
        .limit(parseInt(limit, 10))
        .sort({ [sort]: order })
        .exec();
      return res.status(200).json({
        data: categories.map((category) => category.toJSON()),
        pagination: {
          limit: parseInt(limit, 10),
          before,
          after,
          sort,
          order,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * getCategory.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async getCategory(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const category = await Category.findOne({ _id: id, user: user._id }).populate('chats').exec();
      if (!category) {
        return next(new ApiError(404, 'category must exists'));
      }
      return res.status(200).json({
        category: category.toJSON(),
        actions: {
          deleteCategory: { methods: 'DELETE', url: `${hostname}/categories/${category._id}` },
          updateCategory: { methods: 'PUT', url: `${hostname}/categories/${category._id}` },
          getCategoryChats: { methods: 'GET', url: `${hostname}/categories/${category._id}/chats` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * updateCategory.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async updateCategory(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const validateCategory = schemaValidator.getSchema('updateCategory');
      if (!validateCategory(req.body)) {
        return next(new ApiError(400, validateCategory.errors[0].message));
      }
      let category = await Category
        .updateOne({ _id: id, user: user._id }, req.body)
        .exec();
      if (!category) {
        return next(new ApiError(404, 'category must exists'));
      }
      category = await Category.findOne({ _id: id, user: user._id }).populate('chats').exec();
      return res.status(200).json({
        category: category.toJSON(),
        actions: {
          deleteCategory: { methods: 'DELETE', url: `${hostname}/categories/${category._id}` },
          getCategory: { methods: 'GET', url: `${hostname}/categories/${category._id}` },
          getCategoryChats: { methods: 'GET', url: `${hostname}/categories/${category._id}/chats` },
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * deleteCategory.
   *
   * @param {} req
   * @param {} res
   * @param {} next
   */
  static async deleteCategory(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const category = await Category.findOneAndDelete({ _id: id, user: user._id }).exec();
      if (!category) {
        return next(new ApiError(404, 'category must exists'));
      }

      return res.status(204).json({});
    } catch (err) {
      return next(err);
    }
  }
}
