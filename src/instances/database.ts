import dotenv from 'dotenv';
dotenv.config();

let db = {
  db: process.env.PG_DB as string,
  user: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  port: process.env.PG_PORT as string,
  host: process.env.PG_HOST as string
}

if (process.env.NODE_ENV === 'test'){
  db = {
    db: process.env.PG_TEST_DB as string,
    user: process.env.PG_TEST_USER as string,
    password: process.env.PG_TEST_PASSWORD as string,
    port: process.env.PG_TEST_PORT as string,
    host: process.env.PG_TEST_HOST as string
  }
}

export default db;