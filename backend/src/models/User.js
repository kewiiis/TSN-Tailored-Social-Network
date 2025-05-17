// backend/src/models/User.js
import { pool } from '../config/db.js';

export class User {
  static async create(name, email, hashedPassword) {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(`SELECT id, name, email FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
}
