import {Router} from 'express';
import joinGroupsController from "../controllers/joinGroup.controller.js";

const router = Router();

// ENDPOINTS FOR JOIN GROUPS

// GET JOIN GROUPS

router.get('/joingroups', joinGroupsController.getJoinGroups)

//POST JOIN GROUPS
router.post('/joingroups', joinGroupsController.createJoinGroup)
//DELETE JOIN GROUPS
router.delete('/joingroups/:id', joinGroupsController.deleteJoinGroup)

export default router;