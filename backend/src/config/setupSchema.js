#!/usr/bin/node

import Validator from 'ajv';
import addFormats from 'ajv-formats';
import userLogin from '../schemas/userLogin.json';
import createCategory from '../schemas/createCategory.json';
import updateChat from '../schemas/updateChat.json';
import updateCategory from '../schemas/updateCategory.json';
import createUsers from '../schemas/createUser.json';
import postChat from '../schemas/postChat.json';
import updateUser from '../schemas/updateUser.json';

export const schemaValidator = new Validator();
addFormats(schemaValidator);

export default function setupSchema() {
  schemaValidator.addSchema(userLogin);
  schemaValidator.addSchema(createCategory);
  schemaValidator.addSchema(updateChat);
  schemaValidator.addSchema(updateCategory);
  schemaValidator.addSchema(createUsers);
  schemaValidator.addSchema(postChat);
  schemaValidator.addSchema(updateUser);
}
