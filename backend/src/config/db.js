import pkg from 'pg';
const { Pool } = pkg;

console.log("🔎 URL DE CONNEXION POSTGRES UTILISÉE");

const pool = new Pool({
  connectionString: 'postgresql://postgres@localhost:5433/tsn',
  ssl: false
});

export default pool;
