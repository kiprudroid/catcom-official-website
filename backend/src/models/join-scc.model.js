import db from "../config/db.config.js";

<<<<<<< HEAD:backend/src/models/joinscc.model.js
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
=======
export const createJoinSCC = async (data) => {      
    const { first_name, last_name, phone_number, email, year_joined, gender, scc_name } = data; 
    const query = `
    INSERT INTO join_scc (first_name, last_name, phone_number, email, year_joined, gender, scc_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
    const values = [first_name, last_name, phone_number, email, year_joined, gender, scc_name];
    const result = await db.query(query, values);
    return result.rows[0];
};

export const getJoinSCC = async () => {
    try {
        const result = await db.query(
        "SELECT * FROM join_scc ORDER BY first_name ASC"
    );
    return result.rows;
    } catch (error) {
        console.log(`Database Error ${error.message}`);
        throw new Error(`Failed to retrieve your records`);
    }
};      
>>>>>>> cf3e1a90b3de206b5fd100cdba1eebb44f9df8d2:backend/src/models/join-scc.model.js

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
