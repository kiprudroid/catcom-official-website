import pool from "../config/db.config.js";

export const createEvent = async (data) => {
  const { title, event_date, event_time, venue } = data;
  const query = `
    INSERT INTO events (title, event_date, event_time, venue)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, event_date, event_time, venue];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findAllEvents = async () => {
  const query = `
    SELECT * FROM events
    ORDER BY event_date ASC, event_time ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};
