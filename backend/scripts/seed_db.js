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
    console.log("🚀 Début du seed...");

    await pool.query(`
      DELETE FROM relationships;
      DELETE FROM users;
    `);
    console.log("🧹 Tables vidées");

    // Hash des mots de passe
    const hash = await bcrypt.hash('tsn1234', 10);

    // Ajout des utilisateurs
    const userData = [
      ['Alice', 'alice@example.com'],
      ['Bob', 'bob@example.com'],
      ['Charlie', 'charlie@example.com'],
      ['David', 'david@example.com'],
      ['Eva', 'eva@example.com'],
      ['Fay', 'fay@example.com'],
      ['George', 'george@example.com'],
      ['Hannah', 'hannah@example.com'],
      ['Isaac', 'isaac@example.com'],
      ['Jade', 'jade@example.com'],
      ['Kevin', 'kevin@example.com'],
      ['Luna', 'luna@example.com']
    ];

    for (const [name, email] of userData) {
      console.log(`➡️ Insertion de ${name}`);
      await pool.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hash]
      );
    }

    // Relations de test (juste Alice connaît Bob et Charlie pour déclencher les suggestions)
    const { rows: users } = await pool.query(`SELECT id, email FROM users`);
    const getId = email => users.find(u => u.email === email)?.id;

    const alice = getId('alice@example.com');
    const bob = getId('bob@example.com');
    const charlie = getId('charlie@example.com');

    if (alice && bob && charlie) {
      await pool.query(`
        INSERT INTO relationships (user_id, friend_id) VALUES
        ($1, $2),
        ($2, $1),
        ($1, $3),
        ($3, $1)
      `, [alice, bob, charlie]);
    }

    console.log("✅ Données de test insérées !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur d’insertion :", err);
    process.exit(1);
  }
};

seed();
