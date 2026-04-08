import express from "express";
import { generateTemplate, validateBulkUpdate, applyBulkUpdate } from "../controllers/bulkUpdateController.js";
const router = express.Router();
router.get("/template", generateTemplate);
router.post("/validate", validateBulkUpdate);
router.post("/apply", applyBulkUpdate);
export default router;
//# sourceMappingURL=bulkUpdateRoutes.js.map