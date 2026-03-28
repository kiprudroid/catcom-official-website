import express from "express";
import * as C from "../controllers/media.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────
router.get("/media", C.getPublicMedia);

// ── Admin (protected) ─────────────────────────────────────────────
router.get("/media/admin", authenticateToken, C.getAdminMedia);
router.post("/media", authenticateToken, C.createMedia);
router.put("/media/:id", authenticateToken, C.updateMedia);
router.delete("/media/:id", authenticateToken, C.deleteMedia);
router.patch("/media/:id/publish", authenticateToken, C.togglePublished);

export default router;
