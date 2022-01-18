require('dotenv').config();
const mysql = require('mysql2/promise');

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

module.exports = {
  db,
  backPort: PORT,
};
