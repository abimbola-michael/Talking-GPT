#!/usr/bin/node

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
    res.status(err.code).json({ error: err.message });
  }
  res.status(500).json({ error: err ? err.message || err.toString() : defaultMsg });
};
export default ApiError;
