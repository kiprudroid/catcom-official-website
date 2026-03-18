import { Router } from "express";

import {
  getsccLeaderController as getsccLeader,
  createsccLeaderController as createsccLeader,
  updatesccLeaderController as updatesccLeader,
  deletesccLeaderController as deletesccLeader,
} from "../controllers/scc-leaders.controller.js";

import { uploadSccLeaderImage } from "../middleware/upload.middleware.js";

const router = Router();

// ENDPOINTS FOR SCC LEADERS

// GET ALL SCC LEADERS
router.get("/scc-leaders", getsccLeader);

// GET SCC LEADERS BY SCC NAME
router.get("/scc-leaders/:scc_name", getsccLeader);

// CREATE SCC LEADER (multipart form: fields + image)
router.post(
  "/scc-leaders",
  uploadSccLeaderImage.single("image"),
  createsccLeader,
);

// UPDATE SCC LEADER (multipart form: fields + image (optional))
router.put(
  "/scc-leaders/:id",
  uploadSccLeaderImage.single("image"),
  updatesccLeader,
);

// DELETE SCC LEADER (by id)
router.delete("/scc-leaders/:id", deletesccLeader);

export default router;
