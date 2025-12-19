import db from "../config/db.config.js";

export const createLeader = async (data) => {
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

export const getLeaders = async () => {
    try {
        const result = await db.query(
        "SELECT * FROM executive_leaders ORDER BY full_name ASC"
    );
    return result.rows;
    } catch (error) {
        console.log("Database Error " + error.message);
        
    }
    
    
};

export const deleteLeader = async (id) => {
    const query = `
    DELETE FROM executive_leaders WHERE user_id = $1
    `;
    const values = [id];
    await db.query(query, values);
};

