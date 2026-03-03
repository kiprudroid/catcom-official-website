import { Router } from 'express';
import getReadings from '../controllers/readings.controllers.js';

const router = Router();

// ENDPOINTS FOR READINGS

// GET READINGS

router.get('/readings', getReadings);

export default router;
