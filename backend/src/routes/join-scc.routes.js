import { Router } from "express";
import {
  getAllJoinSCCController,
  createJoinSCCController,
  assignSCCController,
  deleteJoinSCCController,
} from "../controllers/join-scc.controller.js";

const router = Router();

router.get("/join-sccs", getAllJoinSCCController);
router.post("/join-sccs", createJoinSCCController);
router.patch("/join-sccs/:id", assignSCCController);
router.delete("/join-sccs/:id", deleteJoinSCCController);

export default router;
