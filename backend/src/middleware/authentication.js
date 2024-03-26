#!/usr/bin/node

import { getUserFromRequest } from '../utils/authentication';
import ApiError from './error';

export default async function requireAuth(req, res, next) {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return next(new ApiError(401, 'Unauthorized'));
    }
    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}
