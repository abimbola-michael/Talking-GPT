#!/usr/bin/node

import { Error } from 'mongoose';
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

/**
 * ApiError.
 *
 * @extends {Error}
 */
class ApiError extends Error {
  /**
   * constructor.
   *
   * @param {number} code
   * @param {string} message
   */
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

export const errorResponse = (err, req, res, next) => {
  const defaultMsg = 'server error';
  if (err instanceof ApiError) {
    return res.status(err.code).json({ error: err.message });
  }
  if (err instanceof Error.ValidationError) {
    return res.status(400).json({ errors: err.errors });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ error: err.message });
  }

  if (err instanceof NotBeforeError) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: err ? err.message || err.toString() : defaultMsg });
};
export default ApiError;
