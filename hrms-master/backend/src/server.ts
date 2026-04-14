import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import prisma from './lib/prismaClient';

// CORS origins: allow Vercel deployments and local dev
const allowedOrigins = [
    /\.vercel\.app$/,           // any *.vercel.app subdomain
    /^http:\/\/localhost(:\d+)?$/,   // localhost dev
    /^http:\/\/127\.0\.0\.1(:\d+)?$/ // 127.0.0.1 dev
];

import authRoutes from './routes/auth';
import companyRoutes from './routes/company';
import companiesRoutes from './routes/companies';
import employeeLevelsRoutes from './routes/employee-levels';
import employeeGradesRoutes from './routes/employee-grades';
import adminRightsRoutes from './routes/admin-rights';
import branchesRoutes from './routes/branches';
import departmentRoutes from './routes/departments';
import dashboardRoutes from './routes/dashboard';
import zonesRoutes from './routes/zones';
import subDepartmentRoutes from './routes/sub-departments';
import { logActivity } from './services/activityLogger';
import timelineRoutes from './routes/timeline/posts';
import engagementRoutes from './routes/timeline/engagement';
import templateRoutes from './routes/timeline/templates';
import timelineSettingRoutes from './routes/timeline/settings';
import designationRoutes from './routes/designations';
import notificationRoutes from './routes/notifications';
import idCardTemplatesRoutes from './routes/id-card-templates';
import dailyAttendanceEmailRoutes from './routes/daily-attendance-email';
import employeeParkingRoutes from './routes/employee-parking';
import emergencyNumbersRoutes from './routes/emergency-numbers';
import settingsRoutes from './routes/settings';
import whatsappAlertsRoutes from './routes/whatsapp-alerts';
import shiftsRoutes from './routes/shifts';
import attendanceRoutes from './routes/attendance';
import attendanceRequestsRoutes from './routes/attendance-requests';
import documentRequestsRoutes from './routes/document-requests';
import expensesRoutes from './routes/expenses';
import breaksRoutes from './routes/breaks';
import geofencesRoutes from './routes/geofences';
import trackingRoutes from './routes/tracking';
import trackingExceptionsRoutes from './routes/tracking-exceptions';
import trackingConfigRoutes from './routes/tracking-config';
import dailyWorkReportsRoutes from './routes/daily-work-reports';
import visitRoutes from './routes/visit';
import visitStatusRoutes from './routes/visit/visit-status';
import visitManagerApprovalRoutes from './routes/visit/manager-approval';
import visitReportsRoutes from './routes/visit/visit-reports';
import searchRoutes from './routes/search';
import payrollSettingsRoutes from './routes/payroll-settings';
import earningDeductionTypesRoutes from './routes/earning-deduction-types';
import salaryGroupsRoutes from './routes/salary-groups';
import incentiveTypesRoutes from './routes/payroll/incentive-types';
import gratuitySettingsRoutes from './routes/payroll/gratuity-settings';
import employeeCTCRoutes from './routes/payroll/employee-ctc';
import salarySlipsRoutes from './routes/payroll/salary-slips';
import otherEarningsRoutes from './routes/payroll/other-earnings';
import employeeIncentivesRoutes from './routes/payroll/employee-incentives';
import ffSettlementRoutes from './routes/payroll/ff-settlement';
import employeeBankDetailsRoutes from './routes/payroll/employee-bank-details';
import salaryGroupSwipeRoutes from './routes/payroll/salary-group-swipe';
import salaryHoldRoutes from './routes/payroll/salary-hold';
import payrollReportsRoutes from './routes/payroll/reports';
import taxRegimeRoutes from './routes/payroll/tax-regime';
import tdsRulesRoutes from './routes/payroll/tds-rules';
import taxBenefitCategoryRoutes from './routes/payroll/tax-benefit-category';
import taxBenefitSubCategoryRoutes from './routes/payroll/tax-benefit-sub-category';
import taxSlabRoutes from './routes/payroll/tax-slabs';
import taxDocumentsRoutes from './routes/payroll/tax-documents';
import otherIncomeLossRoutes from './routes/payroll/other-income-loss';
import form12bRoutes from './routes/payroll/form12b';
import tdsChallanRoutes from './routes/payroll/tds-challan';
import form16Routes from './routes/payroll/form16';
import taxReportsRoutes from './routes/payroll/tax-reports';

// General Utilities
import uploadRoutes from './routes/upload';

// Work Allocation System
import workAllocationCategoriesRoutes from './routes/work-allocation/categories';
import workAllocationAccessRoutes from './routes/work-allocation/access';
import workAllocationTasksRoutes from './routes/work-allocation/tasks';
import workAllocationReportsRoutes from './routes/work-allocation/reports';

// Site Management System
import siteManagementSitesRoutes from './routes/site-management/sites';
import siteManagementEmployeesRoutes from './routes/site-management/site-employees';
import siteManagementAttendanceRoutes from './routes/site-management/site-attendance';
import siteManagementPurchasesRoutes from './routes/site-management/site-purchases';
import siteManagementReportsRoutes from './routes/site-management/site-reports';

// PMS – Performance Matrix
import pmsDimensionsRoutes from './routes/pms/dimensions';
import pmsSubGroupsRoutes from './routes/pms/sub-groups';
import pmsScoreBandsRoutes from './routes/pms/score-bands';
import pmsAssignRoutes from './routes/pms/assign';
import pmsEvaluationsRoutes from './routes/pms/evaluations';
import pmsSummaryRoutes from './routes/pms/summary';

// Employee Vehicles
import vehicleCategoriesRoutes from './routes/vehicles/categories';
import vehiclesRoutes from './routes/vehicles/vehicles';
import vehicleReportsRoutes from './routes/vehicles/reports';

// Idea Box Module
import ideaBoxCategoriesRoutes from './routes/idea-box/categories';
import ideaBoxIdeasRoutes from './routes/idea-box/ideas';
import ideaBoxApprovalsRoutes from './routes/idea-box/approvals';
import ideaBoxAnalyticsRoutes from './routes/idea-box/analytics';

// SOS Management Module
import sosTypesRoutes from './routes/sos/types';
import sosAlertsRoutes from './routes/sos/alerts';
import sosActionsRoutes from './routes/sos/actions';

// Holiday Management
import holidayRoutes from './routes/holidays/holidays';
import holidayGroupRoutes from './routes/holidays/groups';
import holidayRequestRoutes from './routes/holidays/requests';

// Mobile Device Bind Module
import mobileDeviceSettingsRoutes from './routes/mobile-device/settings';
import mobileDeviceRequestsRoutes from './routes/mobile-device/requests';

// Vendor Management Module
import vendorCategoriesRoutes from './routes/vendors/categories';
import vendorSubCategoriesRoutes from './routes/vendors/sub-categories';
import vendorsRoutes from './routes/vendors/vendors';

// Background Verification Module
import bgvTypesRoutes from './routes/bgv/verification-types';
import bgvManageRoutes from './routes/bgv/manage';
import bgvReportsRoutes from './routes/bgv/reports';

// Visitors Module
import visitorSubTypesRoutes from './routes/visitors/sub-types';
import visitorManageRoutes from './routes/visitors/manage';
import visitorSettingsRoutes from './routes/visitors/settings';
import visitorReportsRoutes from './routes/visitors/reports';

// Chat Group Module
import chatGroupsRoutes from './routes/chat/groups';
import chatMembersRoutes from './routes/chat/members';

// Discussion Forum Module
import discussionManageRoutes from './routes/discussions/manage';
import discussionThreadRoutes from './routes/discussions/thread';

// Complaints
import complaintCategoriesRoutes from './routes/complaints/categories';
import complaintManageRoutes from './routes/complaints/manage';
import complaintCommentsRoutes from './routes/complaints/comments';
import complaintConfigRoutes from './routes/complaints/config';

// Escalations Module
import escalationRoutes from './routes/escalationRoutes';
import meetingRoutes from './routes/meetingRoutes';


const app = express();

const PORT = process.env.PORT || 5000;

console.log('--- MineHR Backend Diagnostic ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL defined:', !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL prefix:', process.env.DATABASE_URL.substring(0, 10) + '...');
}
console.log('---------------------------------');

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
}));
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Vercel SSR)
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.some(pattern =>
            typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
        );
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true); // permissive for now — restrict once domain confirmed
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter); // Apply to all /api/ endpoints

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/timeline/engagement', engagementRoutes);
app.use('/api/timeline/templates', templateRoutes);
app.use('/api/timeline/settings', timelineSettingRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/employee-levels', employeeLevelsRoutes);
app.use('/api/employee-grades', employeeGradesRoutes);
app.use('/api/admin-rights', adminRightsRoutes);
app.use('/api/branches', branchesRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/zones', zonesRoutes);
app.use('/api/sub-departments', subDepartmentRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/id-card-templates', idCardTemplatesRoutes);
app.use('/api/daily-attendance-email', dailyAttendanceEmailRoutes);
app.use('/api/employee-parking', employeeParkingRoutes);
app.use('/api/emergency-numbers', emergencyNumbersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/whatsapp-alerts', whatsappAlertsRoutes);
app.use('/api/shifts', shiftsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/attendance-requests', attendanceRequestsRoutes);
app.use('/api/document-requests', documentRequestsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/breaks', breaksRoutes);
app.use('/api/geofences', geofencesRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/tracking-exceptions', trackingExceptionsRoutes);
app.use('/api/tracking-config', trackingConfigRoutes);
app.use('/api/daily-work-reports', dailyWorkReportsRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/visit-status', visitStatusRoutes);
app.use('/api/manager-approval', visitManagerApprovalRoutes);
app.use('/api/visit-reports', visitReportsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/payroll-settings', payrollSettingsRoutes);
app.use('/api/earning-deduction-types', earningDeductionTypesRoutes);
app.use('/api/salary-groups', salaryGroupsRoutes);
app.use('/api/incentive-types', incentiveTypesRoutes);
app.use('/api/gratuity-settings', gratuitySettingsRoutes);
app.use('/api/employee-ctc', employeeCTCRoutes);
app.use('/api/salary-slips', salarySlipsRoutes);
app.use('/api/other-earnings', otherEarningsRoutes);
app.use('/api/employee-incentives', employeeIncentivesRoutes);
app.use('/api/ff-settlement', ffSettlementRoutes);
app.use('/api/employee-bank-details', employeeBankDetailsRoutes);
app.use('/api/salary-group-swipe', salaryGroupSwipeRoutes);
app.use('/api/salary-hold', salaryHoldRoutes);
app.use('/api/payroll-reports', payrollReportsRoutes);
app.use('/api/payroll/tax-regimes', taxRegimeRoutes);
app.use('/api/payroll/tds-rules', tdsRulesRoutes);
app.use('/api/payroll/tax-categories', taxBenefitCategoryRoutes);
app.use('/api/payroll/tax-sub-categories', taxBenefitSubCategoryRoutes);
app.use('/api/payroll/tax-slabs', taxSlabRoutes);
app.use('/api/payroll/tax-documents', taxDocumentsRoutes);
app.use('/api/payroll/other-income-loss', otherIncomeLossRoutes);
app.use('/api/payroll/form12b', form12bRoutes);
app.use('/api/payroll/tds-challan', tdsChallanRoutes);
app.use('/api/payroll/form16', form16Routes);
app.use('/api/payroll/tax-reports', taxReportsRoutes);

// Work Allocation System
app.use('/api/work-allocation/categories', workAllocationCategoriesRoutes);
app.use('/api/work-allocation/access', workAllocationAccessRoutes);
app.use('/api/work-allocation/tasks', workAllocationTasksRoutes);
app.use('/api/work-allocation/report', workAllocationReportsRoutes); // Note singular report endpoint

// Site Management System
app.use('/api/site-management/sites', siteManagementSitesRoutes);
app.use('/api/site-management/employees', siteManagementEmployeesRoutes);
app.use('/api/site-management/attendance', siteManagementAttendanceRoutes);
app.use('/api/site-management/purchases', siteManagementPurchasesRoutes);
app.use('/api/site-management/reports', siteManagementReportsRoutes);

// PMS – Performance Matrix
app.use('/api/pms/dimensions', pmsDimensionsRoutes);
app.use('/api/pms/sub-groups', pmsSubGroupsRoutes);
app.use('/api/pms/score-bands', pmsScoreBandsRoutes);
app.use('/api/pms/assign', pmsAssignRoutes);
app.use('/api/pms/evaluations', pmsEvaluationsRoutes);
app.use('/api/pms/summary', pmsSummaryRoutes);

// Employee Vehicles
app.use('/api/vehicles/categories', vehicleCategoriesRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/vehicles/reports', vehicleReportsRoutes);

// Idea Box Module
app.use('/api/idea-box/categories', ideaBoxCategoriesRoutes);
app.use('/api/idea-box/ideas', ideaBoxIdeasRoutes);
app.use('/api/idea-box/approvals', ideaBoxApprovalsRoutes);
app.use('/api/idea-box/analytics', ideaBoxAnalyticsRoutes);

// SOS Management Module
app.use('/api/sos/types', sosTypesRoutes);
app.use('/api/sos/alerts', sosAlertsRoutes);
app.use('/api/sos/actions', sosActionsRoutes);

// Holiday Management
app.use('/api/holidays', holidayRoutes);
app.use('/api/holiday-groups', holidayGroupRoutes);
app.use('/api/holiday-requests', holidayRequestRoutes);

// Mobile Device Bind Module
app.use('/api/mobile-device/settings', mobileDeviceSettingsRoutes);
app.use('/api/mobile-device/requests', mobileDeviceRequestsRoutes);

// Vendor Management Module
app.use('/api/vendors/categories', vendorCategoriesRoutes);
app.use('/api/vendors/sub-categories', vendorSubCategoriesRoutes);
app.use('/api/vendors', vendorsRoutes);

// Background Verification Module
app.use('/api/bgv/types', bgvTypesRoutes);
app.use('/api/bgv/manage', bgvManageRoutes);
app.use('/api/bgv/reports', bgvReportsRoutes);

// Visitors Module
app.use('/api/visitors/sub-types', visitorSubTypesRoutes);
app.use('/api/visitors/manage', visitorManageRoutes);
app.use('/api/visitors/settings', visitorSettingsRoutes);
app.use('/api/visitors/reports', visitorReportsRoutes);

// Chat Group Module
app.use('/api/chat/groups', chatGroupsRoutes);
app.use('/api/chat/members', chatMembersRoutes);

// Complaints
app.use('/api/complaints/categories', complaintCategoriesRoutes);
app.use('/api/complaints/manage', complaintManageRoutes);
app.use('/api/complaints/comments', complaintCommentsRoutes);
app.use('/api/complaints/config', complaintConfigRoutes);

// Discussion Forum Module
app.use('/api/discussions/manage', discussionManageRoutes);
app.use('/api/discussions/thread', discussionThreadRoutes);

// Escalations Module
app.use('/api/escalations', escalationRoutes);
app.use('/api/meetings', meetingRoutes);


// General Upload Utilities
app.use('/api/upload', uploadRoutes);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Health check route — used to verify live deployment
app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', message: 'MineHR Backend is running perfectly!', db: 'connected', env: process.env.NODE_ENV || 'development' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Database connection failed', db: 'disconnected' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
