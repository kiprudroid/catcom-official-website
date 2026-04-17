import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as C from "../controllers/media.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { uploadPosterImage } from "../middleware/upload.middleware.js";

// ── Multer setup ──────────────────────────────────────────────────
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/posters");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────
router.get("/media", C.getPublicMedia);

// ── Admin (protected) ─────────────────────────────────────────────
router.get("/media/admin", authenticateToken, C.getAdminMedia);
router.post(
  "/media",
  authenticateToken,
  uploadPosterImage.single("poster"),
  C.createMedia,
);

router.put(
  "/media/:id",
  authenticateToken,
  uploadPosterImage.single("poster"),
  C.updateMedia,
);
router.delete("/media/:id", authenticateToken, C.deleteMedia);
router.patch("/media/:id/publish", authenticateToken, C.togglePublished);

export default router;
