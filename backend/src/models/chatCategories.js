#!/usr/bin/node

import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'category name is required'],
    min: [2, 'expected name gt 2, got {VALUE}'],
  },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chats' }],
}, { timestamps: true });

export default model('chatCategories', categoriesSchema);
