import db from "../config/db.config.js";

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

export const deleteJoinSCC = async (id) => {
    const query = `
    DELETE FROM join_scc WHERE id = $1  
    `;
    const values = [id];
    await db.query(query, values);
};

