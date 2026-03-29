import express from "express";
import * as C from "../controllers/attendance.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
import { verifyGroupAdmin } from "../middleware/groupAdmin.middleware.js";

const router = express.Router();

// ── Public: group admin login ─────────────────────────────────────
router.post("/attendance/login", C.loginGroupAdmin);

// ── Public: list groups (for OtherTools display) ──────────────────
router.get("/attendance/groups", C.getGroups);

// ── Super admin: group + admin account management ─────────────────
// Protected by existing authenticateToken (main admin JWT)
router.post("/attendance/groups", authenticateToken, C.createGroup);
router.put("/attendance/groups/:id", authenticateToken, C.updateGroup);
router.delete("/attendance/groups/:id", authenticateToken, C.deleteGroup);
router.get(
  "/attendance/groups/:group_id/admin",
  authenticateToken,
  C.getGroupAdmin,
);
router.post(
  "/attendance/groups/:group_id/admin",
  authenticateToken,
  C.createGroupAdmin,
);
router.put(
  "/attendance/groups/:group_id/admin",
  authenticateToken,
  C.updateGroupAdminPassword,
);
router.delete(
  "/attendance/groups/:group_id/admin",
  authenticateToken,
  C.deleteGroupAdmin,
);

// ── Group admin: members + attendance ─────────────────────────────
// Protected by verifyGroupAdmin (group admin JWT)
router.get("/attendance/members", verifyGroupAdmin, C.getMembers);
router.post("/attendance/members", verifyGroupAdmin, C.createMember);
router.put("/attendance/members/:id", verifyGroupAdmin, C.updateMember);
router.delete("/attendance/members/:id", verifyGroupAdmin, C.deleteMember);
router.get("/attendance/records/:date", verifyGroupAdmin, C.getAttendance);
router.post("/attendance/records", verifyGroupAdmin, C.upsertAttendance);

export default router;
