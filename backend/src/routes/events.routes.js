import { Router } from "express";
import { createEvent, getEvents } from "../controllers/event.controller.js";

const router = Router();

router.get("/events", getEvents);
router.post("/events", createEvent);

export default router;
