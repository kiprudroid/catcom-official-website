//db connection
import pg from "pg";
import env from "dotenv";

env.config();

const { Pool } = pg;

// Neon connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  statement_timeout: 0, // No timeout
  idle_in_transaction_session_timeout: 600000, // 10 minutes
  ssl: {
    require: false,
  },
});

db.on('connect', (client) => {
  console.log('Connected to the database');
});

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

export default db;
