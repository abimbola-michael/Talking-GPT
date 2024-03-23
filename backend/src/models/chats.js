#!/usr/bin/node

import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  name: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['success', 'failed'] },
  createdAt: { type: String, default: Date.now() },
  updatedAt: { type: String, default: Date.now() },
});

export default model('Chats', chatSchema);
