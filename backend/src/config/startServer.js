#!/usr/bin/node

import mongoose from "mongoose";

function startServer(api) {
  const port = process.env.PORT || 5000;
  const env = process.env.ENV || "DEV";
  const host = process.env.HOST || "0.0.0.0";
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = process.env.DB_PORT || 27017;
  const dbName = process.env.DB_NAME || "talking_gpt_db";
  const username = process.env.DB_USERNAME || "";
  const password = process.env.DB_PASSWORD || "";

  try {
    api.listen(port, host, () => {
      //const url = `mongodb+srv://${username}:${password}@cluster0.6700hdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
      //mongoose.connect(url);
      mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

      console.log(`[${env}] API listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

export default startServer;
