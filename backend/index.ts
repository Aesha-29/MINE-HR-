// No-op for logging in production

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import getPrismaClient, { testDatabaseConnection } from "./config/db.js";

dotenv.config();

const prisma = getPrismaClient();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}

const app = express();
app.use(cors());
app.use(express.json());

const frontendDistPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../dist"
);
const frontendIndexPath = path.join(frontendDistPath, "index.html");
const hasFrontendBuild = fs.existsSync(frontendIndexPath);

const log = (msg: string) => {
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
import templateRoutes from "./routes/templateRoutes.js";
import templateQuestionRoutes from "./routes/templateQuestionRoutes.js";
import productCategoryRoutes from "./routes/productCategoryRoutes.js";
import productSubCategoryRoutes from "./routes/productSubCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productVariantRoutes from "./routes/productVariantRoutes.js";
import distributorRoutes from "./routes/distributorRoutes.js";
import retailerRoutes from "./routes/retailerRoutes.js";
import superDistributorRoutes from "./routes/superDistributorRoutes.js";
import customerCategoryRoutes from "./routes/customerCategoryRoutes.js";
import customerSubCategoryRoutes from "./routes/customerSubCategoryRoutes.js";
import beatPlanRoutes from "./routes/beatPlanRoutes.js";
import jobLocationRoutes from "./routes/jobLocationRoutes.js";
import dailySalesReportRoutes from "./routes/dailySalesReportRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import unitMeasureRoutes from "./routes/unitMeasureRoutes.js";
import productStockRoutes from "./routes/productStockRoutes.js";
import geoRoutes from "./routes/geoRoutes.js";
import expenseCategoryRoutes from "./routes/expenseCategoryRoutes.js";
import expenseSubCategoryRoutes from "./routes/expenseSubCategoryRoutes.js";
import visitExpenseAssignmentRoutes from "./routes/visitExpenseAssignmentRoutes.js";
import expenseSettingRoutes from "./routes/expenseSettingRoutes.js";
import expenseTemplateRoutes from "./routes/expenseTemplateRoutes.js";
import expenseEntryRoutes from "./routes/expenseEntryRoutes.js";
import expenseAdvanceRoutes from "./routes/expenseAdvanceRoutes.js";

// -- Advance Payments --
import advanceSalaryRoutes from "./routes/advanceSalaryRoutes.js";
import advanceRequestRoutes from "./routes/advanceRequestRoutes.js";

// -- New Modules --
import taskRoutes from "./routes/taskRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import quotationConfigRoutes from "./routes/quotationConfigRoutes.js";
import celebrationTemplateRoutes from "./routes/celebrationTemplateRoutes.js";
import engagementRoutes from "./routes/engagementRoutes.js";
import faceXRoutes from "./routes/faceXRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import penaltyRoutes from "./routes/penaltyRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import distributorAssignmentRoutes from "./routes/distributorAssignmentRoutes.js";
import nomineeRoutes from "./routes/nomineeRoutes.js";
import lostAndFoundRoutes from "./routes/lostAndFoundRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import appBannerRoutes from "./routes/appBannerRoutes.js";
import lmsRoutes from "./routes/lmsRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import adminSettingsRoutes from "./routes/adminSettingsRoutes.js";

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
app.use("/api/retirements", retirementRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/bulk-update", bulkUpdateRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/template-questions", templateQuestionRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/product-sub-categories", productSubCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-variants", productVariantRoutes);
app.use("/api/distributors", distributorRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/api/super-distributors", superDistributorRoutes);
app.use("/api/customer-categories", customerCategoryRoutes);
app.use("/api/customer-sub-categories", customerSubCategoryRoutes);
app.use("/api/beat-plans", beatPlanRoutes);
app.use("/api/job-locations", jobLocationRoutes);
app.use("/api/daily-sales-report", dailySalesReportRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/units", unitMeasureRoutes);
app.use("/api/product-stock", productStockRoutes);
app.use("/api/geo", geoRoutes);
app.use("/api/expense-categories", expenseCategoryRoutes);
app.use("/api/expense-sub-categories", expenseSubCategoryRoutes);
app.use("/api/visit-expense-assignments", visitExpenseAssignmentRoutes);
app.use("/api/expense-settings", expenseSettingRoutes);
app.use("/api/expense-templates", expenseTemplateRoutes);
app.use("/api/expense-entries", expenseEntryRoutes);
app.use("/api/expense-advances", expenseAdvanceRoutes);

app.use("/api/advance-salaries", advanceSalaryRoutes);
app.use("/api/advance-requests", advanceRequestRoutes);

// New Module Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/quotation-config", quotationConfigRoutes);
app.use("/api/celebration-templates", celebrationTemplateRoutes);
app.use("/api/engagement", engagementRoutes);
app.use("/api/facex", faceXRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/penalty", penaltyRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/distributor-assignments", distributorAssignmentRoutes);
app.use("/api/nominees", nomineeRoutes);
app.use("/api/lost-and-found", lostAndFoundRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/app-banners", appBannerRoutes);
app.use("/api/lms", lmsRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/admin-settings", adminSettingsRoutes);

app.get("/api", (req, res) => {
    res.json({
        message: "MineHR API",
        version: "1.0.0",
        status: "running",
        endpoints: [
            "/api/employees",
            "/api/auth",
            "/api/attendance",
            "/api/payroll",
            "/api/leaves",
            "/api/health"
        ]
    });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

app.get("/", (req, res) => {
    if (hasFrontendBuild) {
        res.sendFile(frontendIndexPath);
        return;
    }

    res.json({ 
        message: "MineHR Backend API", 
        version: "1.0.0",
        status: "running",
        endpoints: "/api/*"
    });
});

if (hasFrontendBuild) {
    app.use(express.static(frontendDistPath));

    app.get(/^(?!\/api).*/, (req, res, next) => {
        if (req.method !== "GET") {
            next();
            return;
        }

        res.sendFile(frontendIndexPath);
    });
}

app.get("/api/db-status", async (req, res) => {
    try {
        const client = getPrismaClient();
        console.log("[DB-STATUS] Testing database connection...");
        console.log("[DB-STATUS] Using database URL:", process.env.DATABASE_URL ? "Custom URL from env" : "Default TiDB URL");
        
        // Test database connection directly
        const result = await client.$queryRaw`SELECT 1`;
        
        res.json({
            status: "✅ Database Connected",
            message: "TiDB Cloud connection is working!",
            database: "minehr_db",
            cluster: "minehr-db (us-east-1)",
            timestamp: new Date(),
            hint: "You can now add employees and save data!"
        });
    } catch (error: any) {
        console.error("[DB-STATUS] Connection error:", error.message);
        res.status(503).json({
            status: "❌ Database Connection Failed",
            message: error.message || "Cannot connect to TiDB Cloud",
            errorCode: error.code,
            errorState: error.state,
            hint: "Please check TiDB Cloud IP whitelist (0.0.0.0/0) and SSL configuration",
            link: "https://tidbcloud.com/console/clusters",
            timestamp: new Date()
        });
    }
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        time: new Date()
    });
});

const PORT = process.env.PORT || 5000;

// Initialize database connection on startup
(async () => {
    log("Initializing database connection...");
    const dbConnected = await testDatabaseConnection();
    
    if (dbConnected) {
        log("✅ Backend ready - database connected");
    } else {
        console.warn("⚠️  WARNING: Database connection failed. Retrying on first API call...");
    }
})();

// Only start the HTTP server when running locally (not on Vercel serverless)
if (!process.env.VERCEL) {
    app.listen(PORT as number, () => {
        log(`Server listening on port ${PORT}`);
        setInterval(() => log("Server Heartbeat..."), 30000);
    });
}

export default app;
