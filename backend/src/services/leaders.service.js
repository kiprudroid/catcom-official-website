import * as LeadersModel from "../models/leaders.model.js"

export const createLeadersServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.user_id || !data.full_name || !data.exec_description) {  
        throw new Error("Missing required fields");
    }

    return await LeadersModel.createLeader(data)

}
export const getLeadersServices = async () => {
    
    return await LeadersModel.getLeaders()
    
}

export const deleteLeadersServices = async (id) => {
    return await LeadersModel.deleteLeader(id)
}

