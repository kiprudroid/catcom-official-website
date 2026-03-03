import {
  getJoinSCC,
  createJoinSCC,
  deleteJoinSCC,
} from "../services/join-scc.service.js";

export const getJoinScc = async (req, res) => {
  try {
    const joinscc = await getJoinSCC();
    res.status(200).json(joinscc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createJoinScc = async (req, res) => {
  try {
    const joinscc = await createJoinSCC(req.body);
    res.status(201).json(joinscc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteJoinScc = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinSCC(id);
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
