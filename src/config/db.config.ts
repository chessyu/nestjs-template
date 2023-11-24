import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';

export default registerAs<DatabaseConfig>('db', () => {
  return {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_username: process.env.DB_USER,
    db_passwd: process.env.DB_PASSWD,
    db_database: process.env.DB_DATABASE,
  };
});
