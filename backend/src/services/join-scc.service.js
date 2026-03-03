<<<<<<< HEAD:backend/src/services/joinscc.service.js
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
=======
import * as JoinSCCModel from '../models/join-scc.model.js';

export const createJoinSCCServices = async (data) => {
    if (!data) {
        throw new Error("No data provided");
    }
    if (!data.first_name || !data.last_name || !data.phone_number || !data.email || !data.year_joined || !data.gender || !data.scc_name) {  
        throw new Error("Missing required fields");
    }
    return await JoinSCCModel.createJoinSCC(data);
>>>>>>> cf3e1a90b3de206b5fd100cdba1eebb44f9df8d2:backend/src/services/join-scc.service.js
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
