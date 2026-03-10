import * as sccLeadersModel from "../models/scc-leaders.model.js"

export const createsccLeadersServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.exec_first_name || !data.exec_last_name ||!data.scc_name|| !data.position ) {  
        throw new Error("Missing required fields");
    }

    return await sccLeadersModel.createsccLeader(data)

}
export const getsccLeadersServices = async (scc_name) => {
    return await sccLeadersModel.getsccLeaders(scc_name)

}
export const updatesccLeadersServices = async (id, data) => {
    if (!id || !data) {
        throw new Error("Leader ID and data required");
    }
    if (!data.exec_first_name || !data.exec_last_name ||!data.scc_name|| !data.position ) {  
        throw new Error("Missing required fields");
    }

  return await sccLeadersModel.updatesccLeader(id, data)
  
}

export const deletesccLeadersServices = async (id, scc_name) => {
    if (!id || !scc_name) throw new Error("Leader ID and SCC name required");
    return await sccLeadersModel.deletesccLeader(id, scc_name);
}

