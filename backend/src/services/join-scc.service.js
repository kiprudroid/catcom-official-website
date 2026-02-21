import * as JoinSCCModel from '../models/join-scc.model.js';

export const createJoinSCCServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.first_name || !data.last_name || !data.phone_number || !data.email || !data.year_joined || !data.gender || !data.scc_name) {  
        throw new Error("Missing required fields");
    }
    return await JoinSCCModel.createJoinSCC(data);
};
export const getJoinSCCServices = async () => {
    return await JoinSCCModel.getJoinSCC();
}

export const deleteJoinSCCServices = async (id) => {
    return await JoinSCCModel.deleteJoinSCC(id);
}