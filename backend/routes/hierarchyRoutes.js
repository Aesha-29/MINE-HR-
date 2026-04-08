import express from "express";
import { getHierarchy, getLevelHierarchy } from "../controllers/hierarchyController.js";
const router = express.Router();
router.get("/", getHierarchy);
router.get("/levels", getLevelHierarchy);
export default router;
//# sourceMappingURL=hierarchyRoutes.js.map