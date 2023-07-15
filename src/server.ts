/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let serverStatus: Server;
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢 Database is connected successfully`);
    serverStatus = app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', err => {
    console.error(err);

    if (serverStatus) {
      serverStatus.close(() => {
        console.error('server closed due to Unhandled Rejection.... ', err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

server();

process.on('uncaughtException', err => {
  console.error('server closed due to Unhandled Exception.... ', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM is received of server is shutting down........');
  if (serverStatus) {
    serverStatus.close();
  }
});
