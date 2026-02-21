import {Router} from 'express';
import joinGroupsController from "../controllers/join-group.controller.js";

const router = Router();

// ENDPOINTS FOR JOIN GROUPS

// GET JOIN GROUPS

router.get('/join-group', joinGroupsController.getJoinGroups)

//POST JOIN GROUPS
router.post('/join-group', joinGroupsController.createJoinGroup)
//DELETE JOIN GROUPS
router.delete('/join-group/:id', joinGroupsController.deleteJoinGroup)

export default router;