import pkg from 'pg';
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
    await pool.query(`
      INSERT INTO users (name, email, password) VALUES
      ('Alice', 'alice@example.com', 'hash1'),
      ('Bob', 'bob@example.com', 'hash2'),
      ('Charlie', 'charlie@example.com', 'hash3');

      INSERT INTO relationships (user_id, friend_id) VALUES
      (1, 2),  -- Alice connaît Bob
      (2, 3);  -- Bob connaît Charlie
    `);

    console.log("✅ Données de test insérées !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur d’insertion :", err);
    process.exit(1);
  }
};

seed();
