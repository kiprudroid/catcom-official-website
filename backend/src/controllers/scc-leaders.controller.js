import {
  getsccLeadersServices as getsccLeader,
  createsccLeadersServices as createsccLeader,
  updatesccLeadersServices as updatesccLeader,
  deletesccLeadersServices as deletesccLeader,
} from "../services/sccleaders.service.js";

const getsccLeaderController = async (req, res) => {
  const { scc_name } = req.params;
  try {
    const leaders = await getsccLeader(scc_name);
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: "Server Error : " + error.message });
  }
};

const createsccLeaderController = async (req, res) => {
  try {
    const sccleader = await createsccLeader(req.body);
    res.status(201).json(sccleader);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const updatesccLeaderController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      exec_first_name,
      exec_last_name,
      scc_name,
      position,
      phone_number,
      exec_image,
    } = req.body;
    await updatesccLeader(id, {
      exec_first_name,
      exec_last_name,
      scc_name,
      position,
      phone_number,
      exec_image,
    });
    res.status(200).json({ message: "SCC Leader updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const deletesccLeaderController = async (req, res) => {
  try {
    const { id } = req.params;
    const { scc_name } = req.params;
    await deletesccLeader(id, scc_name);
    res.status(204).json({ message: "SCC Leader deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export default {
  getsccLeader: getsccLeaderController,
  createsccLeader: createsccLeaderController,
  updatesccLeader: updatesccLeaderController,
  deletesccLeader: deletesccLeaderController,
};
