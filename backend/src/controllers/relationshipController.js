import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  password: 'kelyan97221', // mot de passe vide
  host: 'localhost',
  database: 'tsn',
  port: 5433,
  ssl: false
});



console.log("Fonction getRecommendations appelée");

export const addRelationship = async (req, res) => {
  const { user_id, friend_id } = req.body;

  if (!user_id || !friend_id) {
    return res.status(400).json({ message: 'user_id et friend_id sont requis.' });
  }

  try {
    console.log("🔍 pool.query en cours...");
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

  export const getRecommendations = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const result = await pool.query(
        `
        SELECT 
          u.id, 
          u.name, 
          u.email,
          COUNT(*) AS mutual_count
        FROM relationships AS r1
        JOIN relationships AS r2 ON r1.friend_id = r2.user_id
        JOIN users u ON u.id = r2.friend_id
        WHERE r1.user_id = $1
          AND u.id != $1
          AND u.id NOT IN (
            SELECT friend_id FROM relationships WHERE user_id = $1
          )
        GROUP BY u.id, u.name, u.email
        ORDER BY mutual_count DESC
        `,
        [user_id]
      );
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Erreur dans la recommandation :', err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };

  export const deleteRelationship = async (req, res) => {
    const { user_id, friend_id } = req.body;
  
    try {
      await pool.query(
        'DELETE FROM relationships WHERE user_id = $1 AND friend_id = $2',
        [user_id, friend_id]
      );
      res.status(200).json({ message: 'Relation supprimée' });
    } catch (err) {
      console.error('Erreur suppression relation :', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  
  
  