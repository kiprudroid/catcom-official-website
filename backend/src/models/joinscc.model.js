import db from "../config/db.config.js";

/**
 * Insert a new Join SCC record into the database
 */
export const createJoinScc = async (payload) => {
  const { full_name, phone_number, email, year_study, gender, scc_name } =
    payload;

  const query = `
    INSERT INTO join_scc (full_name, phone_number, email, year_study, gender, scc_name)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [full_name, phone_number, email, year_study, gender, scc_name];
  const { rows } = await db.query(query, values);

  return rows[0];
};

/**
 * Fetch all Join SCC records
 */
export const findAllJoinScc = async () => {
  const query = `
    SELECT * FROM join_scc
    ORDER BY full_name ASC;
  `;

  const { rows } = await db.query(query);
  return rows;
};

/**
 * Delete a Join SCC record by ID
 */
export const deleteJoinSccById = async (id) => {
  const query = `
    DELETE FROM join_scc
    WHERE user_id = $1;
  `;

  await db.query(query, [id]);
};
