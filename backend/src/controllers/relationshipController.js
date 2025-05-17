import pool from '../config/db.js';

export const addRelationship = async (req, res) => {
  const { user_id, friend_id } = req.body;

  if (!user_id || !friend_id) {
    return res.status(400).json({ message: 'user_id et friend_id sont requis.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO relationships (user_id, friend_id) VALUES ($1, $2) RETURNING *',
      [user_id, friend_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de l’ajout de la relation :', err);
    res.status(500).json({ message: 'Erreur lors de l’ajout de la relation.' });
  }
};


export const getRelationships = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT u.id, u.name, u.email
         FROM relationships r
         JOIN users u ON u.id = r.friend_id
         WHERE r.user_id = $1`,
        [user_id]
      );
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Erreur lors de la récupération des relations :', err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
  