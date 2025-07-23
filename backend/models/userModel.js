const pool = require('../config/db');

async function createUser({ username, email, password, locale }) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password, locale)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, locale`,
    [username, email, password, locale]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

module.exports = { createUser, getUserByEmail };
