#!/usr/bin/node

import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
  },
  category: {
    type: String,
    ref: 'ChatCategories',
    required: [true, 'category is required'],
  },
}, { timestamps: true });

export default model('Chats', chatSchema);
