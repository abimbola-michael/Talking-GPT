#!/usr/bin/node

import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chats' }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default model('chatCategories', categoriesSchema);
