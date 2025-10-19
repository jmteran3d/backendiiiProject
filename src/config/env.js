import dotenv from "dotenv";
dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

export const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: isTestEnvironment ? process.env.MONGO_URL_TEST : process.env.MONGO_URL,
  DB_NAME: isTestEnvironment ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV || 'development'
};