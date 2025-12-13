import { Router } from "express";
import { createEvent, getEvents } from "../controllers/event.controller.js";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);

export default router;
