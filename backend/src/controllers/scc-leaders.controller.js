import {
  getSccLeadersServices as getsccLeader,
  createSccLeadersServices as createsccLeader,
  updateSccLeadersServices as updatesccLeader,
  deleteSccLeadersServices as deletesccLeader,
} from "../services/sccleaders.service.js";

export const getsccLeaderController = async (req, res) => {
  const { scc_name } = req.params;
  try {
    const leaders = await getsccLeader(scc_name);
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: "Server Error : " + error.message });
  }
};

export const createsccLeaderController = async (req, res) => {
  try {
    // When using multipart/form-data with multer:
    // - text fields are in req.body (strings)
    // - uploaded file is in req.file
    const data = { ...(req.body || {}) };

    if (req.file?.filename) {
      // Stored by multer in: uploads/scc-leaders/<filename>
      // Served by express static as: /uploads/scc-leaders/<filename>
      data.exec_image = `/uploads/scc-leaders/${req.file.filename}`;
    }

    const sccleader = await createsccLeader(data);
    res.status(201).json(sccleader);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const updatesccLeaderController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...(req.body || {}) };

    // If a new file was uploaded, update exec_image. Otherwise keep existing.
    if (req.file?.filename) {
      data.exec_image = `/uploads/scc-leaders/${req.file.filename}`;
    }

    const updated = await updatesccLeader(id, data);

    // Return the updated row if service/model returns it; otherwise return a minimal payload.
    if (updated) return res.status(200).json(updated);

    res.status(200).json({ message: "SCC Leader updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const deletesccLeaderController = async (req, res) => {
  try {
    const { id } = req.params;

    // Route signature updated to: DELETE /scc-leaders/:id
    await deletesccLeader(id, undefined);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
