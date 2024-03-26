#!/usr/bin/node

import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'category name is required'],
    min: [2, 'expected name gt 2, got {VALUE}'],
  },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chats' }],
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: [true, 'user is required'] },
}, { timestamps: true });

categoriesSchema.methods.toJSON = function toJSON() {
  const category = this.toObject();
  category.id = category._id.toString();
  delete category._id;
  delete category.__v;
  return category;
};

export default model('ChatCategories', categoriesSchema);
