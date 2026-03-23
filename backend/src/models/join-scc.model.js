import db from "../config/db.config.js";


export const createJoinSCC = async (payload) => {
  const { full_name, phone_number, email, year_study, gender, scc_name } = payload;

  const query = `
    INSERT INTO join_scc (full_name, phone_number, email, year_study, gender, scc_name)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [full_name, phone_number, email, year_study, gender, scc_name];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

/**
 * Fetch all Join SCC records
 */
export const getJoinSCC = async () => {
  const query = `
    SELECT * FROM join_scc
    ORDER BY full_name ASC;
  `;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};
export const assignSCC = async (id, scc_name) => {
  const query = `
    UPDATE join_scc
    SET scc_name = $1
    WHERE user_id = $2
    RETURNING *;
  `;
  try {
    const { rows } = await db.query(query, [scc_name, id]);
    return rows[0];
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const deleteJoinSCC = async (id) => {
  const query = `
    DELETE FROM join_scc WHERE user_id = $1;
  `;
  try {
    await db.query(query, [id]);
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};
