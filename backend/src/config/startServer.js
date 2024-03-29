#!/usr/bin/node

import mongoose from 'mongoose';

function startServer(api) {
  const port = process.env.PORT || 5000;
  const env = process.env.ENV || 'DEV';
  const host = process.env.HOST || '0.0.0.0';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 27017;
  const dbName = process.env.DB_NAME || 'talking_gpt_db';
  const dbPassword = process.env.DB_PWD;
  const dbUser = process.env.DB_USER;

  try {
    api.listen(port, host, async () => {
      try {
        let uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
        if (env === 'DEV') {
          uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.owideev.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
        }
        mongoose.connect(uri);
        console.log(`[${env}] API listening on port ${port}`);
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export default startServer;
