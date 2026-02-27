import db from "../config/db.config.js";

export const createsccLeader = async (data) => {
    const { exec_first_name, exec_last_name, scc_name, position, phone_number, exec_image} = data; 
    const query = `
    INSERT INTO scc_executive (exec_first_name, exec_last_name, scc_name, position, phone_number, exec_image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

    const values = [exec_first_name, exec_last_name, scc_name, position, phone_number, exec_image];
    const result = await db.query(query, values);

    return result.rows[0];
};

export const getsccLeaders = async (scc_name) => {
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

export const deletesccLeader = async (id, scc_name) => {
    const query = `
    DELETE FROM scc_executive WHERE exec_id = $1 AND scc_name = $2;
    `;
    const values = [id, scc_name];
    await db.query(query, values);
};

