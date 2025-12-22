import {Router} from 'express';
import leadersController from "../controllers/leaders.controller.js";

const router = Router();

// ENDPOINTS FOR LEADERS

// GET LEADERS

router.get('/leaders', leadersController.getLeader)

//POST LEADERS
router.post('/leaders', leadersController.createLeader)

//DELETE LEADERS
router.delete('/leaders/:id', leadersController.deleteLeader)

export default router;
