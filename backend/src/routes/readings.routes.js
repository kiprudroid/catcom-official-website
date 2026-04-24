import { Router } from "express";
import {
  getReadings,
  getReadingsByDate,
} from "../controllers/readings.controllers.js";

const router = Router();

router.get("/readings", getReadings);
router.get("/readings/:date", getReadingsByDate);

export default router;
