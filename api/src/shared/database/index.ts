/* eslint-disable no-console */
import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('📦 Database started successfully!'))
  .catch(error => console.log('🚫 Error to start database!', error));
