#!/usr/bin/node

function startServer(api) {
  const port = process.env.PORT || 5000;
  const env = process.env.ENV || 'DEV';
  const host = process.env.host || '0.0.0.0';

  api.listen(port, host, () => {
    console.log(`[${env}] API listening on port ${port}`);
  });
}

export default startServer;
