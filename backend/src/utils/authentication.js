#!/usr/bin/node

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const JWTSecret = process.env.JWT_SECRET || 'secret';

export default async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verifyPassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

export function generateToken(payload) {
  return jwt.sign(payload, JWTSecret);
}

export async function getUserFromRequest(req) {
  const token = req.get('Authorization');

  if (!token) {
    return null;
  }

  const tokenSplit = token.split(' ');
  if (tokenSplit.length !== 2 || tokenSplit[0].toLowerCase() !== 'bearer') {
    return null;
  }

  const jwtToken = tokenSplit[1];
  const payload = jwt.verify(jwtToken, JWTSecret);
  const user = await User.findById(payload._id);
  return user;
}
