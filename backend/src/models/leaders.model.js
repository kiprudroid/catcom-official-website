import db from "../config/db.config.js";

export const createLeaderModel = async (data) => {
    const { full_name, post_title, exec_description, image_url } = data; 
    const query = `
    INSERT INTO executive_leaders (full_name, post_title, exec_description, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    const values = [full_name, post_title, exec_description, image_url];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const getLeadersModel = async () => {
    try {
        const result = await db.query(
        "SELECT * FROM executive_leaders ORDER BY full_name ASC"
    );
    return result.rows;
    } catch (error) {
        console.log(`Database Error : ${error.message}`);
        throw new Error(`Failed to retrieve your records`);
    }
    
    
};

export const updateLeaderModel = async (id, data) => {
    const { full_name, post_title, exec_description, image_url } = data;
    const query = `
    UPDATE executive_leaders SET full_name = $1, post_title = $2, exec_description = $3, image_url = $4 WHERE user_id = $5
    RETURNING *
    `;

    const values = [full_name, post_title, exec_description, image_url, id];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const deleteLeaderModel = async (id) => {
    const query = `
    DELETE FROM executive_leaders WHERE user_id = $1
    `;
    const values = [id];
    await db.query(query, values);
};

