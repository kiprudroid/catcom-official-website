import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  getProfile,
  createAdmin,
} from "../controllers/auth.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);
router.get("/profile", authenticateToken, getProfile);

router.post(
  "/admin/create",
  authenticateToken,
  authorizeRoles("admin"), // only admins can hit this
  createAdmin,
);

export default router;
