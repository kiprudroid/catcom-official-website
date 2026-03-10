import {Router} from 'express';

import {
  getLeaderController as getLeader,
  createLeaderController as createLeader,
  updateLeaderController as updateLeader,
  deleteLeaderController as deleteLeader
} from '../controllers/leaders.controller.js'




const router = Router();

// ENDPOINTS FOR LEADERS

// GET LEADERS

router.get('/leaders', getLeader)

//POST LEADERS
router.post('/leaders', createLeader)

//UPDATE LEADERS
router.put('/leaders/:id', updateLeader)

//DELETE LEADERS
router.delete('/leaders/:id', deleteLeader)

export default router;
