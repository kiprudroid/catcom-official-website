//db connection
import pg from "pg";
import env from "dotenv";

env.config();

const { Pool } = pg;
// Neon connection

const db = new Pool({
  // user: process.env.PG_USER,
  // host: process.env.PG_HOST,
  // database: process.env.PG_DATABASE,
  // password: process.env.PG_PASSWORD,
  // port: process.env.PG_PORT,

  connectionString: process.env.DATABASE_URL,
  statement_timeout: 0, // No timeout
  idle_in_transaction_session_timeout: 600000, // 10 minutes
  ssl: {
    require: true,
  },
});

export default db;
