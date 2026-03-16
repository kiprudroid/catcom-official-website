import {
  getAllJoinSCCServices as getAllJoinSCC,
  createJoinSCCServices as createJoinSCC,
  deleteJoinSCCServices as deleteJoinSCC,
} from "../services/join-scc.service.js";

export const getAllJoinSCCController = async (req, res) => {
  try {
    const joinscc = await getAllJoinSCC();
    res.status(200).json(joinscc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJoinSCCController = async (req, res) => {
  try {
    const joinscc = await createJoinSCC(req.body);
    res.status(201).json(joinscc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJoinSCCController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinSCC(id);
    res.status(204).end(); // No content on successful delete
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
