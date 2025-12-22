import * as joinGroupModel from "../models/joinGroup.model.js";

export const createJoinGroupsServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }   
    if (!data.user_id || !data.full_name || !data.phone_number || !data.email || !data.gender || !data.college || !data.group_joined) {
        throw new Error("Missing required fields");
    }
    return await joinGroupModel.createJoinGroup(data);
}
export const getJoinGroupsServices = async () => {
    return await joinGroupModel.getJoinGroups();
}

export const deleteJoinGroupServices = async (id) => {
    return await joinGroupModel.deleteJoinGroup(id);
}
