import pool from '../config/db.js';

// Obtenir les messages entre deux utilisateurs
export const getMessagesBetweenUsers = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const result = await pool.query(`
      SELECT * FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
    `, [userId1, userId2]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(' Erreur lors de la récupération des messages :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Envoyer un message
export const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  if (!sender_id || !receiver_id || !content) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO messages (sender_id, receiver_id, content)
      VALUES ($1, $2, $3) RETURNING *
    `, [sender_id, receiver_id, content]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(' Erreur lors de l’envoi du message :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Récupérer le nombre de messages non lus pour un utilisateur donné
export const getUnreadMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM messages WHERE receiver_id = $1 AND is_read = FALSE`,
      [userId]
    );

    res.json({ unreadCount: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error(" Erreur récupération messages non lus :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    await pool.query(`
      UPDATE messages
      SET is_read = TRUE
      WHERE sender_id = $2 AND receiver_id = $1 AND is_read = FALSE
    `, [userId1, userId2]);

    res.status(200).json({ message: "Messages marqués comme lus." });
  } catch (err) {
    console.error(" Erreur lors de la mise à jour des messages :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
