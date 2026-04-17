import pg from "pg";

const { Pool } = pg;

const globalForDb = globalThis;

const db =
  globalForDb.__pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    statement_timeout: 0,
    idle_in_transaction_session_timeout: 600000,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__pgPool = db;
}

db.on("error", (err) => {
  console.error("Unexpected DB error", err);
});

export default db;
