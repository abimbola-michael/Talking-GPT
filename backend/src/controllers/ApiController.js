#!/usr/bin/node
import express from 'express';

/**
 * ApiControllers.
 */
class ApiControllers {
  /**
   * getStatus.
   *
   * @param {express.request} req - express request object
   * @param {express.response} res - express response object
   */
  static getStatus(req, res) {
    res.status(200).json({ status: 'ok' });
  }

  /**
   * getStats.
   *
   * @param {request} req - express request object
   * @param {response} res - express response object
   */
  static getStats(req, res) {

  }
}

export default ApiControllers;
