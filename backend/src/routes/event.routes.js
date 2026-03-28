import { Router } from "express";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
} from "../controllers/event.controller.js";

const router = Router();

router.get("/events", getAllEventsController);
router.get("/events/:id", getEventByIdController);
router.post("/events", createEventController);
router.put("/events/:id", updateEventController);
router.delete("/events/:id", deleteEventController);

export default router;
