import { Router } from "express";

import {
  getLeaderController as getLeader,
  createLeaderController as createLeader,
  updateLeaderController as updateLeader,
  deleteLeaderController as deleteLeader,
} from "../controllers/leaders.controller.js";

import { uploadLeaderImage } from "../middleware/upload.middleware.js";

const router = Router();

// ENDPOINTS FOR LEADERS

// GET LEADERS
router.get("/leaders", getLeader);

// POST LEADERS (multipart form: fields + image)
router.post("/leaders", uploadLeaderImage.single("image"), createLeader);

// UPDATE LEADERS (multipart form: fields + image (optional))
router.put("/leaders/:id", uploadLeaderImage.single("image"), updateLeader);

// DELETE LEADERS
router.delete("/leaders/:id", deleteLeader);

export default router;
