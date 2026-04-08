import express from "express";
import { getUpcomingRetirements } from "../controllers/retirementController.js";
const router = express.Router();
router.get("/", getUpcomingRetirements);
export default router;
//# sourceMappingURL=retirementRoutes.js.map