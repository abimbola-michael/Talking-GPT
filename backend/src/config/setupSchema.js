#!/usr/bin/node

import Validator from 'ajv';
import addFormats from 'ajv-formats';
import userLogin from '../schemas/userLogin.json';
import createCategory from '../schemas/createCategory.json';

export const schemaValidator = new Validator();
addFormats(schemaValidator);

export default function setupSchema() {
  schemaValidator.addSchema(userLogin);
  schemaValidator.addSchema(createCategory);
}
