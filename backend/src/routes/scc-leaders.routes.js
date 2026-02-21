import {Router} from 'express';
import sccleadersController from "../controllers/scc-leaders.controller.js";

const router = Router();

// ENDPOINTS FOR LEADERS

// GET LEADERS
router.get('/scc-leaders', sccleadersController.getsccLeader)

// GET SPECIFIC SCC LEADERS
router.get('/scc-leaders/:scc_name', sccleadersController.getsccLeader)

//POST LEADERS
router.post('/scc-leaders', sccleadersController.createsccLeader)

//DELETE LEADERS
router.delete('/scc-leaders/:scc_name/:id', sccleadersController.deletesccLeader)

export default router;
