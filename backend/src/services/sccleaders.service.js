// import * as sccLeadersModel from "../models/scc-leaders.model.js"
// 
import {
  createSccLeaderModel as createSccLeader,
  getSccLeadersModel as getSccLeaders,
  updateSccLeaderModel as updateSccLeader,
  deleteSccLeaderModel as deleteSccLeader
} from "../models/scc-leaders.model.js"

export const createSccLeadersServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.exec_first_name || !data.exec_last_name ||!data.scc_name|| !data.position ) {  
        throw new Error("Missing required fields");
    }

    return await createSccLeader(data)

}
export const getSccLeadersServices = async (scc_name) => {
    return await getSccLeaders(scc_name)

}
export const updateSccLeadersServices = async (id, data) => {
    if (!id || !data) {
        throw new Error("Leader ID and data required");
    }
    if (!data.exec_first_name || !data.exec_last_name ||!data.scc_name|| !data.position ) {  
        throw new Error("Missing required fields");
    }

  return await updateSccLeader(id, data)
  
}

export const deleteSccLeadersServices = async (id, scc_name) => {
    if (!id || !scc_name) throw new Error("Leader ID and SCC name required");
    return await deleteSccLeader(id, scc_name);
}

