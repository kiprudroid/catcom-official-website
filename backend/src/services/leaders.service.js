//import * as LeadersModel from "../models/leaders.model.js"

import {
  createLeaderModel as createLeader,
  getLeadersModel as getLeaders,
  updateLeaderModel as updateLeader,
  deleteLeaderModel as deleteLeader
} from "../models/leaders.model.js";

export const createLeadersServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.user_id || !data.full_name || !data.exec_description) {  
        throw new Error("Missing required fields");
    }

    return await createLeader(data)

}
export const getLeadersServices = async () => {
    
    return await getLeaders()
    
}

export const updateLeadersServices = async (id, data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.full_name || !data.post_title || !data.exec_description || !data.image_url) {  
        throw new Error("Missing required fields");
    }

    return await updateLeader(id, data)

}

export const deleteLeadersServices = async (id) => {
    return await deleteLeader(id)
}

