import db from "../config/db.config.js";

export const createJoinGroup = async (data) => {
    const { full_name, phone_number, email, gender, college, group_joined } = data; 
    const query = `
    INSERT INTO groups (full_name, phone_number, email, gender, college, group_joined)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

    const values = [full_name, phone_number, email, gender, college, group_joined];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const getJoinGroups = async () => {
    try {
        const result = await db.query(
        "SELECT * FROM groups ORDER BY full_name ASC"
    );
    return result.rows;
    } catch (error) {
        console.log("Database Error " + error.message);
        throw new Error ("Failed to retrieve your records");
    }

};

export const deleteJoinGroups = async (id) => {
    const query = `
    DELETE FROM groups WHERE user_id = $1
    `;
    const values = [id];
    await db.query(query, values);
};