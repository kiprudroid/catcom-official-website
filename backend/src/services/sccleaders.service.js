// import * as sccLeadersModel from "../models/scc-leaders.model.js"
//
import {
  createSccLeaderModel as createSccLeader,
  getSccLeadersModel as getSccLeaders,
  updateSccLeaderModel as updateSccLeader,
  deleteSccLeaderModel as deleteSccLeader,
} from "../models/scc-leaders.model.js";

export const createSccLeadersServices = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }
  if (!data.exec_full_name || !data.scc_name || !data.position) {
    throw new Error("Missing required fields");
  }

  return await createSccLeader(data);
};

export const getSccLeadersServices = async (scc_name) => {
  return await getSccLeaders(scc_name);
};

export const updateSccLeadersServices = async (id, data) => {
  if (!id || !data) {
    throw new Error("Leader ID and data required");
  }
  if (!data.exec_full_name || !data.scc_name || !data.position) {
    throw new Error("Missing required fields");
  }

  return await updateSccLeader(id, data);
};

export const deleteSccLeadersServices = async (id, scc_name) => {
  if (!id) throw new Error("Leader ID required");

  // Backwards compatible:
  // - old route: DELETE /scc-leaders/:scc_name/:id (passes scc_name)
  // - new route: DELETE /scc-leaders/:id (no scc_name)
  return await deleteSccLeader(id, scc_name);
};
