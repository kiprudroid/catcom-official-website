import pool from "../config/db.config.js";

export const getAllMediaQuery = ({ type, search, limit = 50, offset = 0 }) => {
  const conditions = ["published = true"];
  const values = [];
  let idx = 1;

  if (type && type !== "all") {
    conditions.push(`type = $${idx++}`);
    values.push(type);
  }

  if (search) {
    conditions.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  values.push(limit, offset);

  return pool.query(
    `SELECT * FROM media_items
     ${where}
     ORDER BY created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    values,
  );
};

export const getAllMediaAdminQuery = ({
  type,
  search,
  limit = 100,
  offset = 0,
}) => {
  const conditions = [];
  const values = [];
  let idx = 1;

  if (type && type !== "all") {
    conditions.push(`type = $${idx++}`);
    values.push(type);
  }

  if (search) {
    conditions.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  values.push(limit, offset);

  return pool.query(
    `SELECT * FROM media_items
     ${where}
     ORDER BY created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    values,
  );
};

export const getMediaByIdQuery = (id) =>
  pool.query(`SELECT * FROM media_items WHERE id = $1`, [id]);

export const createMediaQuery = ({
  type,
  title,
  url,
  description,
  thumbnail,
  published,
}) =>
  pool.query(
    `INSERT INTO media_items (type, title, url, description, thumbnail, published)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      type,
      title,
      url || null,
      description || null,
      thumbnail || null,
      published ?? true,
    ],
  );

export const updateMediaQuery = ({
  id,
  type,
  title,
  url,
  description,
  thumbnail,
  published,
}) =>
  pool.query(
    `UPDATE media_items
     SET type = $1, title = $2, url = $3, description = $4,
         thumbnail = $5, published = $6, updated_at = NOW()
     WHERE id = $7
     RETURNING *`,
    [
      type,
      title,
      url || null,
      description || null,
      thumbnail || null,
      published,
      id,
    ],
  );

export const deleteMediaQuery = (id) =>
  pool.query(`DELETE FROM media_items WHERE id = $1 RETURNING *`, [id]);

export const togglePublishedQuery = (id) =>
  pool.query(
    `UPDATE media_items SET published = NOT published, updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id],
  );
