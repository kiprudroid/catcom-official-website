import {Router} from 'express';
//import sccleadersController from "../controllers/scc-leaders.controller.js";

import {
  getsccLeaderController as getsccLeader,
  createsccLeaderController as createsccLeader,
  updatesccLeaderController as updatesccLeader,
  deletesccLeaderController as deletesccLeader,
} from "../controllers/scc-leaders.controller.js";


const router = Router();

// ENDPOINTS FOR LEADERS

// GET LEADERS
router.get('/scc-leaders', getsccLeader)

// GET SPECIFIC SCC LEADERS
router.get('/scc-leaders/:scc_name', getsccLeader)

//POST LEADERS
router.post('/scc-leaders', createsccLeader)

//UPDATE LEADERS
router.put('/scc-leaders/:id',updatesccLeader)

//DELETE LEADERS
router.delete('/scc-leaders/:scc_name/:id',deletesccLeader)

export default router;
