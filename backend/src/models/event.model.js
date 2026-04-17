import pool from "../config/db.config.js";

export const createEventModel = async (data) => {
  const { title, event_date, event_time, venue, category } = data;
  const query = `
    INSERT INTO events (title, event_date, event_time, venue, category)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    title,
    event_date,
    event_time,
    venue,
    category,
  ]);
  return rows[0];
};

export const findAllEventsModel = async () => {
  const query = `SELECT * FROM events ORDER BY event_date ASC, event_time ASC;`;
  const { rows } = await pool.query(query);
  return rows;
};

export const findEventByIdModel = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return rows[0];
};

export const updateEventModel = async (id, data) => {
  const { title, event_date, event_time, venue, category } = data;
  const query = `
    UPDATE events
    SET title = $1, event_date = $2, event_time = $3, venue = $4, category = $5
    WHERE id = $6
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    title,
    event_date,
    event_time,
    venue,
    category,
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
