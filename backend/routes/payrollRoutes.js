import express from "express";
import { getPayrollRuns, generatePayroll, getPayslips, deletePayrollRun } from "../controllers/payrollController.js";
import { authenticateToken as authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/runs", authenticate, getPayrollRuns);
router.post("/generate", authenticate, generatePayroll);
router.get("/runs/:runId/payslips", authenticate, getPayslips);
router.delete("/runs/:runId", authenticate, deletePayrollRun);
export default router;
//# sourceMappingURL=payrollRoutes.js.map