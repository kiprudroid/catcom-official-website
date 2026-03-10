import { Router } from "express";
import {
  createEventController,
  getAllEventsController,
} from "../controllers/event.controller.js";

const router = Router();

router.get("/events", getAllEventsController);
router.post("/events", createEventController);

export default router;
