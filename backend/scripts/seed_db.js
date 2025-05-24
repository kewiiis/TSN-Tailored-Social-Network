import pkg from 'pg';
import bcrypt from 'bcrypt';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  password: 'tsn1234',
  host: 'localhost',
  port: 5433,
  database: 'tsn',
  ssl: false
});

const seed = async () => {
  try {
    // Supprime les données précédentes
    await pool.query(`
      DELETE FROM relationships;
      DELETE FROM users;
    `);

    // Hash des mots de passe
    const hash = await bcrypt.hash('tsn1234', 10);

    // Insertion des utilisateurs avec mot de passe haché
    await pool.query(`
      INSERT INTO users (name, email, password) VALUES
      ('Alice', 'alice@example.com', $1),
      ('Bob', 'bob@example.com', $1),
      ('Charlie', 'charlie@example.com', $1);
    `, [hash]);

    // Récupération des IDs dynamiquement
    const { rows: users } = await pool.query(`SELECT id, email FROM users`);
    const getId = email => users.find(u => u.email === email)?.id;

    const aliceId = getId('alice@example.com');
    const bobId = getId('bob@example.com');
    const charlieId = getId('charlie@example.com');

    if (aliceId && bobId && charlieId) {
      await pool.query(`
        INSERT INTO relationships (user_id, friend_id) VALUES
        ($1, $2),
        ($2, $1),
        ($2, $3)
        ON CONFLICT DO NOTHING;
      `, [aliceId, bobId, charlieId]);
    }

    console.log("✅ Données de test insérées !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur d’insertion :", err);
    process.exit(1);
  }
};

seed();
