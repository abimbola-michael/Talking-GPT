#!/usr/bin/node

import Validator from 'ajv';
import addFormats from 'ajv-formats';
import getSchemas from '../utils/getSchemas';

export const schemaValidator = new Validator();
addFormats(schemaValidator);

export default function setupSchema() {
  schemaValidator.addSchema(getSchemas('schemas'));
}
