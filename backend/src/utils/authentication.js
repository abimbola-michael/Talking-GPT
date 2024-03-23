#!/usr/bin/node

import bcrypt from 'bcryptjs';

export default async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
