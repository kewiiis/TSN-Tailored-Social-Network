import pool from '../config/db.js';

// ✅ Créer un post
export const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO posts (content, author_id) VALUES ($1, $2) RETURNING *',
      [content, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du post.' });
  }
};


// 🔄 Modifier un post (autorisation + update)
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id; // extrait depuis le token JWT
  const { content } = req.body;

  try {
    // Vérifie que le post appartient bien à l'utilisateur
    const check = await pool.query(
      'SELECT * FROM posts WHERE id = $1 AND author_id = $2',
      [postId, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ message: 'Non autorisé à modifier ce post.' });
    }

    await pool.query(
      'UPDATE posts SET content = $1 WHERE id = $2',
      [content, postId]
    );

    res.status(200).json({ message: 'Post mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// ❌ Supprimer un post (autorisation + suppression)
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const check = await pool.query(
      'SELECT * FROM posts WHERE id = $1 AND author_id = $2',
      [postId, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ message: 'Non autorisé à supprimer ce post.' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);

    res.status(200).json({ message: 'Post supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Récupérer tous les posts
export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT posts.*, users.username AS author_name FROM posts JOIN users ON posts.author_id = users.id ORDER BY posts.created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des posts.' });
  }
};

