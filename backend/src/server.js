// server.js - Version corrigée
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

// 1. Initialiser Express
const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Connexion PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tsn',
  password: 'ton_mot_de_passe', // Remplace par ton vrai mot de passe
  port: 5432,
});

// 4. Route des recommandations
app.get('/api/users/:id/recommendations', async (req, res) => {
  try {
    const query = `
      WITH friend_of_friend AS (
        SELECT k2.friend_id AS recommendation_id
        FROM knows k1
        JOIN knows k2 ON k1.friend_id = k2.user_id
        WHERE k1.user_id = $1
        AND k2.friend_id != $1
        AND NOT EXISTS (
          SELECT 1 FROM knows k3 
          WHERE k3.user_id = $1 AND k3.friend_id = k2.friend_id
        )
      )
      SELECT name FROM users 
      WHERE id IN (SELECT recommendation_id FROM friend_of_friend);
    `;
    const result = await pool.query(query, [req.params.id]);
    res.json({ recommendations: result.rows.map(row => row.name) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 5. Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
    [name, email, hashedPassword]
  );
  res.status(201).json({ userId: result.rows[0].id });
});

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) return res.status(401).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign({ userId: user.rows[0].id }, 'TON_SECRET_JWT');
  res.json({ token });
});

//Route pour créer un post
app.post('/api/posts', async (req, res) => {
  const { userId, content } = req.body;
  await pool.query('INSERT INTO posts (user_id, content) VALUES ($1, $2)', [userId, content]);
  res.status(201).send();
});