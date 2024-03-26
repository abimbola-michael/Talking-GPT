#!/usr/bin/node

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
