#!/usr/bin/node

import { Schema, model } from 'mongoose';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import hashPassword from '../utils/authentication';

const passwordSchema = new PasswordValidator();

passwordSchema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: [2, 'Must be at least 2, got {VALUE}'],
    maxLength: [100, 'Must be at most 100, got {VALUE}'],
  },
  lastName: {
    type: String,
    minLength: [2, 'Must be at least 2, got {VALUE}'],
    maxLength: [100, 'Must be at most 100, got {VALUE}'],
  },
  userName: { type: String, unique: true, index: true },
  email: {
    type: String,
    unique: true,
    index: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `expect email, got ${props.value}`,
    },
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    validate: {
      validator: (v) => passwordSchema.validate(v),
      message: 'password must include uppercase, digits, symbols and no spaces',
    },
    required: [true, 'user password required'],
  },
  googleId: {
    type: String,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'ChatCategories' }],
}, { timestamps: true });

userSchema.pre('save', async function beforeSave() {
  this.password = await hashPassword(this.password);
});

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.password;
  delete obj.__v;
  delete obj.categories;
  return obj;
};

export default model('Users', userSchema);
