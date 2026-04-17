import db from "../config/db.config.js";

const PENDING_PREFIX = "PENDING: ";

export const createJoinGroup = async (data) => {
  const { full_name, phone_number, email, gender, college, group_joined } =
    data;
  const pendingValue = `${PENDING_PREFIX}${group_joined}`;
  const query = `
    INSERT INTO groups (full_name, phone_number, email, gender, college, group_joined)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

  const values = [
    full_name,
    phone_number,
    email,
    gender,
    college,
    pendingValue,
  ];
  const result = await db.query(query, values);

  return result.rows[0];
};

export const getJoinGroups = async () => {
  try {
    const result = await db.query(
      "SELECT * FROM groups ORDER BY full_name ASC",
    );
    return result.rows;
  } catch (error) {
    console.log("Database Error " + error.message);
    throw new Error("Failed to retrieve your records");
  }
};

export const assignJoinGroup = async (id, group_joined) => {
  const query = `
    UPDATE groups
    SET group_joined = $1
    WHERE user_id = $2
    RETURNING *;
    `;
  const values = [group_joined, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const deleteJoinGroups = async (id) => {
  const query = `
    DELETE FROM groups WHERE user_id = $1
    `;
  const values = [id];
  await db.query(query, values);
};
