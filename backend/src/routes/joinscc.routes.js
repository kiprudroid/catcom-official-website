import { Router } from "express";
import {
  createJoinSccController,
  getAllJoinSccController,
  deleteJoinSccController,
} from "../controllers/joinscc.controller.js";

const router = Router();

/**
 * GET /api/join-sccs
 */
router.get("/join-sccs", getAllJoinSccController);

/**
 * POST /api/join-sccs
 */
router.post("/join-sccs", createJoinSccController);

/**
 * DELETE /api/join-sccs/:id
 */
router.delete("/join-sccs/:id", deleteJoinSccController);

export default router;
