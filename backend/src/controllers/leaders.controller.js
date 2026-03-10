import {
  getLeadersServices as getLeader,
  createLeadersServices as createLeader,
  updateLeadersServices as updateLeader,
  deleteLeadersServices as deleteLeader,
} from "../services/leaders.service.js";

export const getLeaderController = async (req, res) => {
  try {
    const leaders = await getLeader();
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: "Server Error : " + error.message });
  }
};

export const createLeaderController = async (req, res) => {
  try {
    const leader = await createLeader(req.body);
    res.status(201).json(leader);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const updateLeaderController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await updateLeader(id, data);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const deleteLeaderController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteLeader(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


