import {
  createJoinScc as createJoinSccModel,
  findAllJoinScc,
  deleteJoinSccById,
} from "../models/joinScc.model.js";

/**
 *  logic + validation for creating Join SCC
 */
export const createJoinScc = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  const { full_name, phone_number, email, year_study, gender, scc_name } = data;

  if (
    !full_name ||
    !phone_number ||
    !email ||
    !year_study ||
    !gender ||
    !scc_name
  ) {
    throw new Error("Missing required fields");
  }

  return await createJoinSccModel(data);
};

/**
 * Get all Join SCC entries
 */
export const getAllJoinScc = async () => {
  return await findAllJoinScc();
};

/**
 * Delete Join SCC entry by ID
 */
export const deleteJoinScc = async (id) => {
  if (!id) {
    throw new Error("ID is required");
  }

  return await deleteJoinSccById(id);
};
