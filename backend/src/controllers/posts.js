import { pool } from '../config/db.js';

export const createPost = async (req, res) => {
  const { userId, content } = req.body;
  await pool.query('INSERT INTO posts (user_id, content) VALUES ($1, $2)', [userId, content]);
  res.status(201).send();
};

export const getRecommendations = async (req, res) => {
  // ... (code existant de la route /recommendations)
};