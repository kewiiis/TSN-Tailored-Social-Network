// backend/src/models/User.js
export class User {
  static async create(name, email, password) {
    const query = 'INSERT INTO users (...) VALUES (...) RETURNING id';
    return pool.query(query, [name, email, password]);
  }
}