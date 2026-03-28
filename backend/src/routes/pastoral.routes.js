import express from "express";
import * as PastoralController from "../controllers/pastoral.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

// ── Members ───────────────────────────────────────────────────────
router.get("/pastoral/members", PastoralController.getMembers);
router.get("/pastoral/members/:id", PastoralController.getMember);
router.post("/pastoral/members", PastoralController.createMember);
router.put("/pastoral/members/:id", PastoralController.editMember);
router.delete("/pastoral/members/:id", PastoralController.deleteMember);

// ── Attendance ────────────────────────────────────────────────────
router.get("/pastoral/attendance/:date", PastoralController.getAttendance);
router.post("/pastoral/attendance", PastoralController.upsertAttendance); // ← was updateAttendance

export default router;
