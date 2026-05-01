import express from "express";
import * as C from "../controllers/attendance.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { verifyGroupAdmin } from "../middleware/groupAdmin.middleware.js";

const router = express.Router();

router.post("/attendance/login", C.loginGroupAdmin);
router.get("/attendance/groups", C.getGroups);

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

router.get("/attendance/members", verifyGroupAdmin, C.getMembers);
router.post("/attendance/members", verifyGroupAdmin, C.createMember);
router.put("/attendance/members/:id", verifyGroupAdmin, C.updateMember);
router.put(
  "/attendance/members/:id/follow-up",
  verifyGroupAdmin,
  C.markFollowUp,
);
router.delete("/attendance/members/:id", verifyGroupAdmin, C.deleteMember);

// /range MUST come before /:date — Express matches routes top to bottom,
// so if /:date came first it would capture the word "range" as a date param
// and getAttendanceRange would never be reached.
router.get("/attendance/records/range", verifyGroupAdmin, C.getAttendanceRange);
router.get("/attendance/records/:date", verifyGroupAdmin, C.getAttendance);

router.post("/attendance/records", verifyGroupAdmin, C.upsertAttendance);

export default router;
