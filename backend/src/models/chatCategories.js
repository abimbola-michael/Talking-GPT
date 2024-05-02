#!/usr/bin/node

import { Schema, model } from 'mongoose';
import  Chats from './chats';

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

categoriesSchema.pre('findOneAndDelete', async function remove(next) {
  const query = this.getQuery('_id');
  await Chats.deleteMany({ category: query._id, user: query.user });
  next();
});
export default model('ChatCategories', categoriesSchema);
