#!/usr/bin/node

import { Schema, model } from 'mongoose';
import Category from './chatCategories';
import User from './users';

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ChatCategories',
    required: [true, 'category is required'],
  },
}, { timestamps: true });

chatSchema.methods.toJSON = function toJSON() {
  const chat = this.toObject();
  chat.id = chat._id;
  delete chat._id;
  delete chat.__v;
  return chat;
};

chatSchema.post('findOneAndDelete', async (doc, next) => {
  try {
    const category = await this.model('ChatCategories').findById(doc.category).exec();
    const user = await this.model('Users').findById(doc.user).exec();

    if (category && !category.chats.length) {
      await Category.deleteOne({ _id: doc.category });
    }
    if (user) {
      await User.updateOne({ _id: doc.user }, { $pull: { chats: doc._id } });
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

export default model('Chats', chatSchema);
