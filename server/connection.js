const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env_DB_USER,
  password: process.env.DB_PASS,
  port: process.env.PORT,
  database: process.env.DB_NAME
});

module.exports = pool;