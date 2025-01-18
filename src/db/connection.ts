import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<Connection> => {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hacker_news',
  });
};
