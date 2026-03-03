import { Router } from "express";
// import joinSCCController from "../controllers/join-scc.controller.js";

import {
  getJoinScc,
  createJoinScc,
  deleteJoinScc,
} from "../controllers/join-scc.controller.js";

const router = Router();

router.get("/join-scc", getJoinScc);
router.post("/join-scc", createJoinScc);
router.delete("/join-scc/:id", deleteJoinScc);

export default router;
