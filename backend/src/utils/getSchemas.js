#!/usr/bin/node
import fs from "fs";
import path from "path";

export default function getSchemas(schemasPath) {
  const schemas = [];
  const schPath = path.resolve(__dirname, "..", "..", schemasPath);

  for (const file of fs.readdirSync(schPath)) {
    const schema = JSON.parse(fs.readFileSync(`${schPath}/${file}`, "utf8"));
    schemas.push(schema);
  }
  return schemas;
}
