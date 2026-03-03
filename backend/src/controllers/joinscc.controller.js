import {
  createJoinScc,
  getAllJoinScc,
  deleteJoinScc,
} from "../services/joinScc.service.js";

/**
 * POST /join-sccs
 */
export const createJoinSccController = async (req, res) => {
  try {
    const result = await createJoinScc(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * GET /join-sccs
 */
export const getAllJoinSccController = async (req, res) => {
  try {
    const result = await getAllJoinScc();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /join-sccs/:id
 */
export const deleteJoinSccController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJoinScc(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
