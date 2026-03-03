import { Router } from "express";
import {
  createEvents,
  getAllEvents,
} from "../controllers/event.controller.js";

const router = Router();

/**
 * GET /api/events
 * Fetch all events
 */
router.get("/events", getAllEvents);

/**
 * POST /api/events
 * Create event from admin form
 */
router.post("/events", createEvents);

export default router;
