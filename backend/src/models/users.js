#!/usr/bin/node

import { Schema, model } from 'mongoose';
import hashPassword from '../utils/hashPassword.js';

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: { type: String, minLength: 2, maxLength: 100 },
  lastName: { type: String, minLength: 2, maxLength: 100 },
  userName: { type: String, unique: true, index: true },
  email: { type: String, unique: true, index: true },
  password: { type: String, set: hashPassword },
  googleId: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default model('users', userSchema);
