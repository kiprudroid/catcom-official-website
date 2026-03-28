import { Router } from "express";
import {
  getJoinGroupController,
  createJoinGroupController,
  deleteJoinGroupController,
} from "../controllers/join-group.controller.js";
const router = Router();

// ENDPOINTS FOR JOIN GROUPS

// GET JOIN GROUPS

router.get("/join-group", getJoinGroupController);

//POST JOIN GROUPS
router.post("/join-group", createJoinGroupController);
//DELETE JOIN GROUPS
router.delete("/join-group/:id", deleteJoinGroupController);

export default router;
