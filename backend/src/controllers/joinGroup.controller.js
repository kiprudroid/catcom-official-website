// import {getJoinGroups, createJoinGroup} from "../services/joinGroup.service.js";
import { getJoinGroupsServices as getJoinGroups, createJoinGroupsServices as createJoinGroup, deleteJoinGroupServices as deleteJoinGroup } from "../services/joinGroup.service.js";

const getJoinGroupsController = async (req, res) => {
  try {
    const joinGroups = await getJoinGroups();
    res.json(joinGroups);
  }
    catch (error) {
    res.status(500).json({ message: "Server Error : " + error.message });
  }
};

const createJoinGroupController = async (req, res) => {
  try {
    const joinGroup = await createJoinGroup(req.body);
    res.status(201).json(joinGroup);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
const deleteJoinGroupController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinGroup(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export default {
  getJoinGroups: getJoinGroupsController,
  createJoinGroup: createJoinGroupController,
  deleteJoinGroup: deleteJoinGroupController
};