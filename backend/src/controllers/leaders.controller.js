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
    // When using multipart/form-data with multer:
    // - text fields are in req.body (strings)
    // - uploaded file is in req.file
    const data = { ...(req.body || {}) };

    if (req.file?.filename) {
      // Stored by multer in: uploads/leaders/<filename>
      // Served by express static as: /uploads/leaders/<filename>
      data.image_url = `/uploads/leaders/${req.file.filename}`;
    }

    const leader = await createLeader(data);
    res.status(201).json(leader);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const updateLeaderController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...(req.body || {}) };

    // If a new file was uploaded, update image_url. Otherwise keep existing.
    if (req.file?.filename) {
      data.image_url = `/uploads/leaders/${req.file.filename}`;
    }

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
