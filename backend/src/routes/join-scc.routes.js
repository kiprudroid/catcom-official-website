import { Router } from "express";
import joinSCCController from "../controllers/join-scc.controller.js";

const router = Router();

router.get("/join-scc", joinSCCController.getJoinSCC);
router.post("/join-scc", joinSCCController.createJoinSCC);
router.delete("/join-scc/:id", joinSCCController.deleteJoinSCC);

export default router;
