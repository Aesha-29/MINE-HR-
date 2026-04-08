// No-op for logging in production
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}
const app = express();
app.use(cors());
app.use(express.json());
const log = (msg) => {
    console.log(`[BOOTSTRAP] ${msg}`);
};
log("Starting Backend (ESM)...");
if (!process.env.DATABASE_URL) {
    console.error("[CRITICAL] DATABASE_URL is not defined in environment variables!");
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
}
// Import routes
import employeeRoutes from "./routes/employeeRoutes.js";
import exEmployeeRoutes from "./routes/exEmployeeRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import offboardingRoutes from "./routes/offboardingRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import profileChangeRoutes from "./routes/profileChangeRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import designationRoutes from "./routes/designationRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import bulkUpdateRoutes from "./routes/bulkUpdateRoutes.js";
import hierarchyRoutes from "./routes/hierarchyRoutes.js";
import resignationRoutes from "./routes/resignationRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import retirementRoutes from "./routes/retirementRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import holidayRoutes from "./routes/holidayRoutes.js";
import geoRoutes from "./routes/geoRoutes.js";
app.use("/api/employees", employeeRoutes);
app.use("/api/exemployees", exEmployeeRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/offboarding", offboardingRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/profile-changes", profileChangeRoutes);
app.use("/api/hierarchy", hierarchyRoutes);
app.use("/api/resignations", resignationRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/geo", geoRoutes);
app.use("/api/retirements", retirementRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/bulk-update", bulkUpdateRoutes);
app.use("/api/retirements", retirementRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("UNHANDLED ERROR:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Unknown error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
});
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
});
const PORT = process.env.PORT || 5000;
// Only start the HTTP server when running locally (not on Vercel serverless)
if (!process.env.VERCEL) {
    app.listen(PORT, "127.0.0.1", () => {
        log(`Server listening on http://127.0.0.1:${PORT}`);
        setInterval(() => log("Server Heartbeat..."), 30000);
    });
}
export default app;
//# sourceMappingURL=index.js.map