require('dotenv').config();
const mysql = require('mysql2/promise');

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_SCHEMA,
  JWT_SALTROUNDS,
  JWT_SECRET,
} = process.env;

const db = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

module.exports = {
  db,
  backPort: PORT,
  jwtRounds: parseInt(JWT_SALTROUNDS, 10),
  jwtSecret: JWT_SECRET,
};
