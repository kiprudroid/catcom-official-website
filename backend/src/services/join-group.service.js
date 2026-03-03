//import * as joinGroupModel from "../models/join-group.model.js";
import {
  createJoinGroup,
  getJoinGroups,
  deleteJoinGroups,
} from "../models/join-group.model.js";

export const createJoinGroupsServices = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }
  if (
    !data.full_name ||
    !data.phone_number ||
    !data.email ||
    !data.gender ||
    !data.college ||
    !data.group_joined
  ) {
    throw new Error("Missing required fields");
  }
  return await createJoinGroup(data);
};
export const getJoinGroupsServices = async () => {
  return await getJoinGroups();
};

export const deleteJoinGroupServices = async (id) => {
  return await deleteJoinGroups(id);
};
