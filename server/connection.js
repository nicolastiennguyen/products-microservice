const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env_PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env_DB_USER,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME
// });

module.exports = pool;