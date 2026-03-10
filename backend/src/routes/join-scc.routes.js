import { Router } from "express";
import {
  getJoinSCCController,
  createJoinSCCController,
  deleteJoinSCCController,
} from "../controllers/join-scc.controller.js";

const router = Router();

router.get("/join-sccs", getJoinSCCController);
router.post("/join-sccs", createJoinSCCController);
router.delete("/join-sccs/:id", deleteJoinSCCController);

export default router;
