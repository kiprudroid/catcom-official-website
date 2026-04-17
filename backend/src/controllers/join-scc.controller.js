import {
  getAllJoinSCCServices as getAllJoinSCC,
  createJoinSCCServices as createJoinSCC,
  assignSCCServices as assignSCC,
  deleteJoinSCCServices as deleteJoinSCC,
} from "../services/join-scc.service.js";

export const getAllJoinSCCController = async (req, res) => {
  try {
    const joinscc = await getAllJoinSCC();
    res.status(200).json(joinscc);
  } catch (err) {
  console.error("FULL DB ERROR:", err); 
  res.status(500).json({ message: `Database error: ${err.message}` });
}
};

export const createJoinSCCController = async (req, res) => {
  try {
    const joinscc = await createJoinSCC(req.body);
    res.status(201).json(joinscc);
  } catch (err) {
  console.error("FULL DB ERROR:", err); 
  res.status(500).json({ message: `Database error: ${err.message}` });
}
};

export const assignSCCController = async (req, res) => {
  try {
    const { id } = req.params;
    const { scc_name } = req.body;

    if (!scc_name) {
      return res.status(400).json({ message: "scc_name is required" });
    }
    const updated = await assignSCC(id, scc_name); 
    res.status(200).json(updated);
  } catch (err) {
    console.error("Assign SCC error:", err);
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};

export const deleteJoinSCCController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinSCC(id);
    res.status(204).end(); // No content on successful delete
  } catch (err) {
  console.error("FULL DB ERROR:", err); 
  res.status(500).json({ message: `Database error: ${err.message}` });
}
};
