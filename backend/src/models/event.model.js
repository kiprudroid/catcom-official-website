import pool from "../config/db.config.js";

export const createEventModel = async (data) => {
  const { title, event_date, event_time, venue } = data;
  const query = `
    INSERT INTO events (title, event_date, event_time, venue)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    title,
    event_date,
    event_time,
    venue,
  ]);
  return rows[0];
};

export const findAllEventsModel = async () => {
  const query = `
    SELECT * FROM events
    ORDER BY event_date ASC, event_time ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const findEventByIdModel = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return rows[0];
};

export const updateEventModel = async (id, data) => {
  const { title, event_date, event_time, venue } = data;

  const query = `
    UPDATE events
    SET title = $1, event_date = $2, event_time = $3, venue = $4
    WHERE id = $5
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    title,
    event_date,
    event_time,
    venue,
    id,
  ]);

  return rows[0];
};

export const deleteEventModel = async (id) => {
  const { rowCount } = await pool.query(`DELETE FROM events WHERE id = $1`, [
    id,
  ]);
  return rowCount;
};

const dbCheck = await pool.query("SELECT current_database()");
console.log("DB NAME:", dbCheck.rows);

const tables = await pool.query(`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
`);
console.log("TABLES:", tables.rows);
