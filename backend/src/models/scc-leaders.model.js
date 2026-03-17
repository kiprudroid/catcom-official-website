import db from "../config/db.config.js";

export const createSccLeaderModel = async (data) => {
    const { exec_full_name, scc_name, position, phone_number, exec_image} = data; 
    const query = `
    INSERT INTO scc_executive (exec_full_name, scc_name, position, phone_number, exec_image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    const values = [exec_full_name, scc_name, position, phone_number, exec_image];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const getSccLeadersModel = async (scc_name) => {
    if (scc_name) {
        try {      

            const result = await db.query("SELECT *  FROM scc_executive WHERE scc_name = $1 ORDER BY exec_id ASC", [scc_name]);
            return result.rows;
            
        } catch (error) {
            console.error(`Database Error ${error.message}`);
            throw new Error (`Cannot fetch scc leaders for ${scc_name}`);
        }
    }

    try {      

        const result = await db.query("SELECT *  FROM scc_executive ORDER BY exec_id ASC");
        return result.rows;
        
    } catch (error) {
        console.error(`Database Error ${error.message}`);
        throw new Error (`Cannot fetch scc leaders`);
    }
    
};

//update scc leaders
export const updateSccLeaderModel = async (id, data) => {
    const { exec_full_name, scc_name, position, phone_number, exec_image } = data;
    const query = `
    UPDATE scc_executive SET exec_full_name = $1, scc_name = $2, position = $3, phone_number = $4, exec_image = $5 WHERE exec_id = $6
    RETURNING *
    `;

    const values = [exec_full_name, scc_name, position, phone_number, exec_image, id];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const deleteSccLeaderModel = async (id, scc_name) => {
    const query = `
    DELETE FROM scc_executive WHERE exec_id = $1 AND scc_name = $2;
    `;
    const values = [id, scc_name];
    await db.query(query, values);
};

