import pool from "../config/db.js";

export const createEvent = async (data) => {
  const { event_date, activity, venue } = data;

  const query = `
    INSERT INTO events (event_date, activity, venue)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [event_date, activity, venue];
  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllEvents = async () => {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY event_date ASC"
  );
  return result.rows;
};
