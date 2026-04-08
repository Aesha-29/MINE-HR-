import express from "express";
import {
  createDistributorAssignments,
  deleteDistributorAssignment,
  getDistributorAssignments,
} from "../controllers/distributorAssignmentController.js";

const router = express.Router();

router.get("/", getDistributorAssignments);
router.post("/", createDistributorAssignments);
router.delete("/:id", deleteDistributorAssignment);

export default router;