// ✅ backend/src/controllers/authController.js
import dotenv from 'dotenv';
dotenv.config();


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
  console.error("❌ Erreur d'inscription :", err);
    res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Requête de login reçue :", req.body);

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Email incorrect' });
    }

    const user = result.rows[0]; // ✅ Initialisé ici, AVANT de l’utiliser
    console.log("🔑 Mot de passe reçu :", password);
    console.log("🧠 Mot de passe haché stocké :", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (err) {
    console.error("❌ Erreur login :", err);
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};
