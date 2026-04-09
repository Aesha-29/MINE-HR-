import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { ToastContainer } from "./components/Toast";
import ModuleErrorBoundary from "./components/ModuleErrorBoundary";

import Dashboard from "./pages/Dashboard/dashboard";
import FinanceDashboard from "./pages/Dashboard/financeDashboard";
import Employees from "./pages/HR/employees";
import AddEmployee from "./pages/HR/addEmployee";
import Onboarding from "./pages/HR/onboarding";
import ExEmployees from "./pages/HR/exEmployees";
import Managers from "./pages/Structure/managers";
import ViewEmployee from "./pages/HR/viewEmployee"; // NEW
import Offboarding from "./pages/HR/offboarding";
import LevelMaster from "./pages/Structure/levelMaster";
import LevelHierarchy from "./pages/Structure/levelHierarchy";
import UpcomingRetirements from "./pages/HR/upcomingRetirements";
import ProfileChangeRequests from "./pages/HR/profileChangeRequests"; // NEW
import StructureManagement from "./pages/Structure/structureManagement";
import Resignation from "./pages/HR/resignation";
import Promotion from "./pages/HR/promotion"; // NEW
import Login from "./pages/Auth/login";
import AttendanceGrid from "./pages/HR/attendanceGrid"; // NEW
import PayrollDashboard from "./pages/Dashboard/payrollDashboard"; // NEW
import BulkUpdate from "./pages/HR/bulkUpdate"; // NEW
import ManagerRole from "./pages/Structure/managerRole";
import AssignLevel from "./pages/Structure/assignLevel";
import ShiftManagement from "./pages/Shift/shiftManagement";
import ShiftList from "./pages/Shift/shiftList";
import ShiftAssignment from "./pages/Shift/shiftAssignment";
import ShiftRotation from "./pages/Shift/shiftRotation";
import ShiftCalendar from "./pages/Shift/shiftCalendar";
import ShiftReports from "./pages/Shift/shiftReports";
import LeaveTypes from "./pages/Leave/leaveTypes";
import LeavePolicy from "./pages/Leave/leavePolicy";
import LeaveBalance from "./pages/Leave/leaveBalance";
import ApplyLeave from "./pages/Leave/applyLeave";
import LeaveRequests from "./pages/Leave/leaveRequests";
import LeaveApproval from "./pages/Leave/leaveApproval";
import LeaveCalendar from "./pages/Leave/leaveCalendar";
import LeaveReports from "./pages/Leave/leaveReports";
import LeaveSettings from "./pages/Leave/leaveSettings";
import LeaveReasons from "./pages/Leave/leaveReasons";
import LeaveGroups from "./pages/Leave/leaveGroups";
import AutoLeaves from "./pages/Leave/autoLeaves";
import LeavePayouts from "./pages/Leave/leavePayouts";
import ShortLeaves from "./pages/Leave/shortLeaves";
import HolidayManagement from "./pages/Leave/holidayManagement";
import ShiftPenaltyRules from "./pages/Shift/shiftPenaltyRules";
import ShiftChangeRequests from "./pages/Shift/shiftChangeRequests";
import HolidayExchangeRequests from "./pages/Leave/holidayExchangeRequests";
import Templates from "./pages/Templates/Templates";
import AddTemplate from "./pages/Templates/AddTemplate";
import ManageTemplate from "./pages/Templates/ManageTemplate";
import ManageTemplateQuestions from "./pages/Templates/ManageTemplateQuestions";
import SalesDashboard from "./pages/Sales/SalesDashboard";
import OrderSettings from "./pages/Sales/OrderSettings";
import ManageArea from "./pages/Distribution/ManageArea";
import ManageCities from "./pages/Distribution/ManageCities";
import CountryList from "./pages/Distribution/CountryList";
import AssignedDistributors from "./pages/Distribution/AssignedDistributors";
import UnitMeasurement from "./pages/Products/UnitMeasurement";
import ViewOrders from "./pages/Sales/ViewOrders";
import ManageProductStock from "./pages/Products/ManageProductStock";
import OrderRouteMap from "./pages/Sales/OrderRouteMap";
import SalesSummaryReport from "./pages/Sales/SalesSummaryReport";
import StockInOutReport from "./pages/Products/StockInOutReport";
import SalesDumpReport from "./pages/Sales/SalesDumpReport";
import AvailableProductStockReport from "./pages/Products/AvailableProductStockReport";
import ManageRoute from "./pages/Distribution/ManageRoute";
import ManageEmployeeRoute from "./pages/Distribution/ManageEmployeeRoute";
import OrdersJobLocation from "./pages/Sales/OrdersJobLocation";
import ProductCategory from "./pages/Products/ProductCategory";
import ProductSubCategory from "./pages/Products/ProductSubCategory";
import ManageProduct from "./pages/Products/ManageProduct";
import ManageProductVariant from "./pages/Products/ManageProductVariant";
import DailySalesReport from "./pages/Sales/DailySalesReport";
import RetailerBeatPlan from "./pages/Distribution/RetailerBeatPlan";
import ManageRetailer from "./pages/Distribution/ManageRetailer";
import ManageDistributor from "./pages/Distribution/ManageDistributor";
import ManageSuperDistributor from "./pages/Distribution/ManageSuperDistributor";
import CustomerCategories from "./pages/Customer/CustomerCategories";
import CustomerSubCategory from "./pages/Customer/CustomerSubCategory";
import ExpenseCategories from "./pages/Expense/expenseCategories";
import ExpenseSubCategories from "./pages/Expense/expenseSubCategories";
import AssignVisitExpense from "./pages/Expense/assignVisitExpense";
import ExpenseSettings from "./pages/Expense/expenseSettings";

// Expense Module (new)
import ManageExpenseTemplate from "./pages/Expense/manageExpenseTemplate";
import AddExpense from "./pages/Expense/addExpense";
import PendingExpense from "./pages/Expense/pendingExpense";
import UnpaidExpense from "./pages/Expense/unpaidExpense";
import PaidExpense from "./pages/Expense/paidExpense";
import RejectedExpense from "./pages/Expense/rejectedExpense";
import GroupWiseExpense from "./pages/Expense/groupWiseExpense";
import DayWiseExpense from "./pages/Expense/dayWiseExpense";
import ManageExpenseAdvance from "./pages/Expense/manageExpenseAdvance";
import AdvanceExpenseRequest from "./pages/Expense/advanceExpenseRequest";
import GenerateVoucher from "./pages/Expense/generateVoucher";
import { PaidExpenseHistoryReport, EmployeeExpenseReport, UnpaidExpenseReport, ApprovedExpenseReport, AdvanceExpenseReport } from "./pages/Expense/expenseReports";

// Advance Payments
import AdvanceSalary from "./pages/AdvanceSalary/advanceSalary";
import BulkAdvanceSalary from "./pages/AdvanceSalary/bulkAdvanceSalary";
import AdvanceCarryForward from "./pages/AdvanceSalary/advanceCarryForward";
import AdvanceSalaryRequests from "./pages/AdvanceSalary/advanceSalaryRequests";
import AdvanceSalaryReport from "./pages/AdvanceSalary/advanceSalaryReport";

// Task Sheet Module
import TaskDashboard from "./pages/TaskSheet/TaskDashboard";
import TaskCategory from "./pages/TaskSheet/TaskCategory";
import TaskPriority from "./pages/TaskSheet/TaskPriority";
import MyTaskCategory from "./pages/TaskSheet/MyTaskCategory";
import TaskCategoryAssign from "./pages/TaskSheet/TaskCategoryAssign";
import ManageMainTaskSheet from "./pages/TaskSheet/ManageMainTaskSheet";
import ManageTaskSheet from "./pages/TaskSheet/ManageTaskSheet";
import TaskReport from "./pages/TaskSheet/TaskReport";
import TaskSheetReport from "./pages/TaskSheet/TaskSheetReport";
import ProjectWiseTaskSheetReport from "./pages/TaskSheet/ProjectWiseTaskSheetReport";
import EmployeeTaskSheetReport from "./pages/TaskSheet/EmployeeTaskSheetReport";
import TaskSetting from "./pages/TaskSheet/TaskSetting";

// Quotation Module
import QuotationTemplates from "./pages/Quotation/QuotationTemplates";
import QuotationLabels from "./pages/Quotation/QuotationLabels";
import QuotationTableColumn from "./pages/Quotation/QuotationTableColumn";
import ManageQuotation from "./pages/Quotation/ManageQuotation";
import QuotationGenerate from "./pages/Quotation/QuotationGenerate";

// LMS Module
import Courses from "./pages/LMS/Courses";
import CoursesViewReport from "./pages/LMS/CoursesViewReport";
import ManageAssignLMS from "./pages/LMS/ManageAssignLMS";

// Logs Module
import ActivityLogs from "./pages/Logs/ActivityLogs";
import EmployeeLogs from "./pages/Logs/EmployeeLogs";
import SessionLogs from "./pages/Logs/SessionLogs";

// Balance Sheet Module
import AddBalanceSheet from "./pages/BalanceSheet/AddBalanceSheet";
import BalanceSheetType from "./pages/BalanceSheet/BalanceSheetType";
import ManageBalanceSheet from "./pages/BalanceSheet/ManageBalanceSheet";
import WFHBalanceSheet from "./pages/BalanceSheet/WFHBalanceSheet";
import BalanceSheetReport from "./pages/BalanceSheet/BalanceSheetReport";

// Employee Engagement Module
import EngagementEvents from "./pages/EmployeeEngagement/EngagementEvents";
import AdvancedEngagementEvents from "./pages/EmployeeEngagement/AdvancedEngagementEvents";
import CelebrationTemplates from "./pages/EmployeeEngagement/CelebrationTemplates";

// FaceX App Module
import FaceAppAdmin from "./pages/FaceXApp/FaceAppAdmin";
import FaceAppDevice from "./pages/FaceXApp/FaceAppDevice";
import UserFaceData from "./pages/FaceXApp/UserFaceData";
import FaceChangeRequest from "./pages/FaceXApp/FaceChangeRequest";

// Events Module
import AddEvent from "./pages/Events/AddEvent";
import ViewEvents from "./pages/Events/ViewEvents";
import EventsReport from "./pages/Events/EventsReport";

// Penalty Module
import PenaltyRules from "./pages/Penalty/PenaltyRules";
import PenaltyToLeave from "./pages/Penalty/PenaltyToLeave";
import ManagePenalties from "./pages/Penalty/ManagePenalties";
import PendingPenalties from "./pages/Penalty/PendingPenalties";
import PenaltiesReport from "./pages/Penalty/PenaltiesReport";

// Company Gallery Module
import AddGallery from "./pages/Gallery/AddGallery";
import ManageGallery from "./pages/Gallery/ManageGallery";

// Assets Setup Module
import AssetDashboard from "./pages/Assets/AssetDashboard";
import AssetCategory from "./pages/Assets/AssetCategory";
import ManageAssets from "./pages/Assets/ManageAssets";
import AssetBulkUpload from "./pages/Assets/AssetBulkUpload";
import AssetMaintenance from "./pages/Assets/AssetMaintenance";
import AssetScrap from "./pages/Assets/AssetScrap";
import AssetHistory from "./pages/Assets/AssetHistory";
import AssetReports from "./pages/Assets/AssetReports";
import AssetSettings from "./pages/Assets/AssetSettings";

// Settings Module
import AppSettings from "./pages/Settings/AppSettings";
import AdminViewAccess from "./pages/Settings/AdminViewAccess";
import CheckAdminAccess from "./pages/Settings/CheckAdminAccess";

// App Banner Module
import AppBanner from "./pages/AppBanner/AppBanner";

// Survey Module
import AddSurvey from "./pages/Survey/AddSurvey";
import ManageSurvey from "./pages/Survey/ManageSurvey";

// Poll Management Module
import AddPoll from "./pages/PollManagement/AddPoll";
import PollSummary from "./pages/PollManagement/PollSummary";

// Nominee Module
import NominationTypeSetup from "./pages/Nominee/NominationTypeSetup";
import ManageNominees from "./pages/Nominee/ManageNominees";

// Lost & Found Module
import ReportLostItem from "./pages/LostAndFound/ReportLostItem";
import ReportFoundItem from "./pages/LostAndFound/ReportFoundItem";
import ManageLostAndFound from "./pages/LostAndFound/ManageLostAndFound";
import ClaimVerification from "./pages/LostAndFound/ClaimVerification";
import LostAndFoundReport from "./pages/LostAndFound/LostAndFoundReport";

const RENDER_BYPASS_USER = {
  id: 0,
  firstName: "Render",
  lastName: "Admin",
  role: "Admin",
  type: "Manager",
  bypassAllAccess: true,
  email: "render-admin@minehr.local"
};

type OverviewSection = {
  title: string;
  description: string;
  items: Array<{
    label: string;
    page: string;
    detail: string;
  }>;
};

const PROJECT_OVERVIEW_SECTIONS: OverviewSection[] = [
  {
    title: "Core",
    description: "Start here for the operational home screen and finance summaries.",
    items: [
      { label: "Dashboard", page: "dashboard", detail: "Live employee and department overview" },
      { label: "Finance", page: "finance", detail: "Cash flow and profitability panels" },
      { label: "App Banner", page: "appBanner", detail: "Homepage notices and announcements" },
      { label: "Admin Settings", page: "appSettings", detail: "Platform configuration" },
    ],
  },
  {
    title: "HR",
    description: "Employee lifecycle, attendance, leave, and organization controls.",
    items: [
      { label: "Employees", page: "employees", detail: "Employee directory and records" },
      { label: "Add Employee", page: "addEmployee", detail: "Create or update employee profiles" },
      { label: "Attendance", page: "attendanceGrid", detail: "Attendance grid and logs" },
      { label: "Leave", page: "leaveRequests", detail: "Requests, policy, balances, and approvals" },
      { label: "Shift", page: "shiftManagement", detail: "Shift setup and assignment tools" },
      { label: "Payroll", page: "payrollDashboard", detail: "Payroll dashboard and reporting" },
      { label: "Onboarding", page: "onboarding", detail: "Joiner workflow" },
      { label: "Offboarding", page: "offboarding", detail: "Exit workflow" },
    ],
  },
  {
    title: "Operations",
    description: "Field work, orders, logistics, and route planning.",
    items: [
      { label: "Sales", page: "salesDashboard", detail: "Commercial dashboard" },
      { label: "Orders", page: "viewOrders", detail: "Order management" },
      { label: "Route Map", page: "orderRouteMap", detail: "Route planning map" },
      { label: "Daily Sales", page: "dailySalesReport", detail: "Daily sales tracking" },
      { label: "Products", page: "manageProduct", detail: "Product catalog" },
      { label: "Stock", page: "manageProductStock", detail: "Inventory levels" },
      { label: "Retailers", page: "manageRetailer", detail: "Retailer management" },
      { label: "Distributors", page: "manageDistributor", detail: "Distributor management" },
    ],
  },
  {
    title: "Engagement",
    description: "Templates, surveys, polls, events, and people engagement tools.",
    items: [
      { label: "Templates", page: "templates", detail: "Reusable workflow templates" },
      { label: "Survey", page: "manageSurvey", detail: "Survey creation and management" },
      { label: "Polls", page: "pollSummary", detail: "Poll workflows and summary" },
      { label: "Events", page: "viewEvents", detail: "Event scheduling and reports" },
      { label: "Engagement", page: "engagementEvents", detail: "Employee engagement program" },
      { label: "LMS", page: "lmsCourses", detail: "Learning module" },
    ],
  },
  {
    title: "Records",
    description: "Logs, balance sheets, assets, assets, and compliance-oriented modules.",
    items: [
      { label: "Logs", page: "activityLog", detail: "Activity, employee, and session logs" },
      { label: "Balance Sheet", page: "balanceSheetManage", detail: "Balance sheet operations" },
      { label: "Assets", page: "assetDashboard", detail: "Asset setup and maintenance" },
      { label: "Penalty", page: "penaltyRules", detail: "Penalty rules and reports" },
      { label: "Quotation", page: "quotationTemplates", detail: "Quotation setup" },
      { label: "Task Sheet", page: "taskDashboard", detail: "Task management hub" },
      { label: "Nominee", page: "nominationType", detail: "Nominee configuration" },
      { label: "Lost & Found", page: "manageLostAndFound", detail: "Claims and reporting" },
    ],
  },
];

function ProjectOverview({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="project-overview" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">MineHR Project Overview</h1>
          <p style={{ margin: "8px 0 0", color: "var(--color-text-muted)" }}>
            A complete map of the main application areas. Use these shortcuts to open any module directly.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-primary" type="button" onClick={() => setActivePage("dashboard")}>Open Dashboard</button>
          <button className="btn-secondary" type="button" onClick={() => setActivePage("employees")}>Open Employees</button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {PROJECT_OVERVIEW_SECTIONS.map((section) => (
          <section
            key={section.title}
            className="lm-card"
            style={{
              padding: "18px",
              borderRadius: "20px",
              background: "white",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ marginBottom: "14px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "var(--color-text)" }}>{section.title}</h3>
              <p style={{ margin: "6px 0 0", color: "var(--color-text-muted)", fontSize: "13px", lineHeight: 1.5 }}>
                {section.description}
              </p>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {section.items.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => setActivePage(item.page)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "12px 14px",
                    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" }}>
                    <strong style={{ color: "var(--color-text)", fontSize: "14px" }}>{item.label}</strong>
                    <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "12px" }}>Open</span>
                  </div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "12px", marginTop: "4px", lineHeight: 1.45 }}>
                    {item.detail}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function App() {
  const bypassLogin =
    import.meta.env.VITE_BYPASS_LOGIN === "true" ||
    (typeof window !== "undefined" && window.location.hostname.endsWith("onrender.com"));

  const [isAuthenticated, setIsAuthenticated] = useState(() => bypassLogin || Boolean(localStorage.getItem("token")));
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const userRaw = localStorage.getItem("user");
    try {
      if (userRaw) {
        return JSON.parse(userRaw);
      }
      if (bypassLogin) {
        return RENDER_BYPASS_USER;
      }
      return null;
    } catch {
      return bypassLogin ? RENDER_BYPASS_USER : null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState(() => (bypassLogin ? "projectOverview" : "dashboard"));

  useEffect(() => {
    if (bypassLogin) {
      setCurrentUser(RENDER_BYPASS_USER);
      setIsAuthenticated(true);
      setActivePage("projectOverview");
      delete axios.defaults.headers.common["Authorization"];
      return;
    }

    const userRaw = localStorage.getItem("user");
    let user: any = null;
    try {
      user = userRaw ? JSON.parse(userRaw) : null;
    } catch {
      user = null;
    }

    if (user) {
      setCurrentUser(user);
    }

    const token = localStorage.getItem("token");
    setIsAuthenticated(bypassLogin || Boolean(token));

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  // ðŸ”¹ NEW: store selected employee for view/edit
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // ðŸ”¹ Global Notifications
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, text: "Leave Request Approved", time: "2h ago", type: "success" },
    { id: 2, text: "New Policy: Health Insurance", time: "5h ago", type: "info" },
    { id: 3, text: "Shift change request pending", time: "Yesterday", type: "warning" }
  ]);

  const addNotification = (text: string, type: "success" | "info" | "warning" | "error" = "info") => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just now",
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Global navigation event
  useEffect(() => {
    const navHandler = (e: Event) => {
      const page = (e as CustomEvent<string>).detail;
      if (page) setActivePage(page);
    };
    
    // Global notification event
    const notifHandler = (e: Event) => {
      const { text, type } = (e as CustomEvent<{text: string, type: any}>).detail;
      if (text) addNotification(text, type || "info");
    };

    window.addEventListener("app:navigate", navHandler);
    window.addEventListener("app:notification", notifHandler);
    
    return () => {
      window.removeEventListener("app:navigate", navHandler);
      window.removeEventListener("app:notification", notifHandler);
    };
  }, []);

  const renderPage = () => {
    switch (activePage) {
      // FaceX App Module
      case "facex_admin":
        return <FaceAppAdmin setActivePage={setActivePage} />;
      case "facex_device":
        return <FaceAppDevice setActivePage={setActivePage} />;
      case "facex_data":
        return <UserFaceData setActivePage={setActivePage} />;
      case "facex_request":
        return <FaceChangeRequest setActivePage={setActivePage} />;

      case "dashboard":
        return <Dashboard />;

      case "projectOverview":
        return <ProjectOverview setActivePage={setActivePage} />;

      case "finance":
        return <FinanceDashboard />;

      case "employees":
        return (
          <Employees
            setActivePage={setActivePage}
            setSelectedEmployee={setSelectedEmployee}
          />
        );

      case "addEmployee":
        return (
          <AddEmployee
            setActivePage={setActivePage}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        );

      case "viewEmployee":
        return (
          <ViewEmployee
            selectedEmployee={selectedEmployee}
            setActivePage={setActivePage}
          />
        );

      case "onboarding":
        return <Onboarding addNotification={addNotification} />;

      case "offboarding":
        return <Offboarding />;

      case "resignation":
        return <Resignation />;

      case "promotion":
        return <Promotion />;


      case "exEmployees":
        return <ExEmployees setActivePage={setActivePage} setSelectedEmployee={setSelectedEmployee} />;

      case "upcomingRetirements":
        return <UpcomingRetirements />;

      case "managers":
        return <Managers />;

      case "levelMaster":
        return <LevelMaster />;

      case "levelHierarchy":
        return <LevelHierarchy />;

      case "profileChangeRequests":
        return <ProfileChangeRequests />;

      case "attendanceGrid":
        return <AttendanceGrid />;

      case "payrollDashboard":
        return <PayrollDashboard />;

      case "bulkUpdate":
        return <BulkUpdate />;

      case "structureManagement":
        return <StructureManagement />;

      case "managerRole":
        return <ManagerRole />;

      case "assignLevel":
        return <AssignLevel />;

      case "shiftManagement":
        return <ShiftManagement selectedShift={selectedShift} setSelectedShift={setSelectedShift} setActivePage={setActivePage} />;

      case "shiftList":
        return <ShiftList setSelectedShift={setSelectedShift} setActivePage={setActivePage} />;

      case "shiftAssignment":
        return <ShiftAssignment />;

      case "shiftRotation":
        return <ShiftRotation />;

      case "shiftCalendar":
        return <ShiftCalendar />;

      case "shiftReports":
        return <ShiftReports />;

      case "leaveTypes":
        return <LeaveTypes />;

      case "leavePolicy":
        return <LeavePolicy />;

      case "leaveBalance":
        return <LeaveBalance />;

      case "applyLeave":
        return <ApplyLeave />;

      case "leaveRequests":
        return <LeaveRequests />;

      case "leaveApproval":
        return <LeaveApproval />;

      case "leaveCalendar":
        return <LeaveCalendar />;

      case "leaveReports":
        return <LeaveReports />;

      case "leaveSettings":
        return <LeaveSettings />;

      case "leaveReasons":
        return <LeaveReasons />;

      case "leaveGroups":
        return <LeaveGroups />;

      case "autoLeaves":
        return <AutoLeaves />;

      case "leavePayouts":
        return <LeavePayouts />;

      case "shortLeaves":
        return <ShortLeaves />;

      case "holidayManagement":
        return <HolidayManagement />;

      case "shiftPenaltyRules":
        return <ShiftPenaltyRules />;

      case "shiftChangeRequests":
        return <ShiftChangeRequests user={currentUser} />;

      case "holidayExchangeRequests":
        return <HolidayExchangeRequests user={currentUser} />;

      case "templates":
        return <Templates setActivePage={setActivePage} setSelectedTemplate={setSelectedTemplate} />;

      case "addTemplate":
        return <AddTemplate setActivePage={setActivePage} />;
      
      case "editTemplate":
        return <AddTemplate id={selectedTemplate?.id} setActivePage={setActivePage} />;

      case "manageTemplate":
        return <ManageTemplate templateId={selectedTemplate?.id} setActivePage={setActivePage} />;

      case "manageTemplateQuestions":
        return <ManageTemplateQuestions />;

      case "salesDashboard":
        return <SalesDashboard />;

      case "orderSettings":
        return <OrderSettings />;

      case "manageArea":
        return <ManageArea />;

      case "manageCities":
        return <ManageCities />;

      case "countryList":
        return <CountryList />;

      case "assignedDistributors":
        return <AssignedDistributors />;

      case "unitMeasurement":
        return <UnitMeasurement />;

      case "viewOrders":
        return <ViewOrders />;

      case "manageProductStock":
        return <ManageProductStock />;

      case "orderRouteMap":
        return <OrderRouteMap />;

      case "salesSummaryReport":
        return <SalesSummaryReport />;

      case "stockInOutReport":
        return <StockInOutReport />;

      case "salesDumpReport":
        return <SalesDumpReport />;

      case "availableProductStockReport":
        return <AvailableProductStockReport />;

      case "manageRoute":
        return <ManageRoute />;

      case "manageEmployeeRoute":
        return <ManageEmployeeRoute />;

      case "ordersJobLocation":
        return <OrdersJobLocation />;

      case "productCategory":
        return <ProductCategory />;

      case "productSubCategory":
        return <ProductSubCategory />;

      case "manageProduct":
        return <ManageProduct />;

      case "manageProductVariant":
        return <ManageProductVariant />;

      case "dailySalesReport":
        return <DailySalesReport />;

      case "retailerBeatPlan":
        return <RetailerBeatPlan />;

      case "manageRetailer":
        return <ManageRetailer />;

      case "manageDistributor":
        return <ManageDistributor />;

      case "manageSuperDistributor":
        return <ManageSuperDistributor />;

      case "customerCategories":
        return <CustomerCategories />;

      case "customerSubCategory":
        return <CustomerSubCategory />;

      case "expenseCategories":
        return <ExpenseCategories />;

      case "expenseSubCategories":
        return <ExpenseSubCategories />;

      case "assignVisitExpense":
        return <AssignVisitExpense />;

      case "expenseSettings":
        return <ExpenseSettings />;

      // New Expense Module
      case "manageExpenseTemplate":
        return <ManageExpenseTemplate />;
      case "addExpense":
        return <AddExpense />;
      case "pendingExpense":
        return <PendingExpense />;
      case "unpaidExpense":
        return <UnpaidExpense />;
      case "paidExpense":
        return <PaidExpense />;
      case "rejectedExpense":
        return <RejectedExpense />;
      case "groupWiseExpense":
        return <GroupWiseExpense />;
      case "dayWiseExpense":
        return <DayWiseExpense />;
      case "manageExpenseAdvance":
        return <ManageExpenseAdvance />;
      case "advanceExpenseRequest":
        return <AdvanceExpenseRequest />;
      case "generateVoucher":
        return <GenerateVoucher />;
      case "paidExpenseHistoryReport":
        return <PaidExpenseHistoryReport />;
      case "employeeExpenseReport":
        return <EmployeeExpenseReport />;
      case "unpaidExpenseReport":
        return <UnpaidExpenseReport />;
      case "approvedExpenseReport":
        return <ApprovedExpenseReport />;
      case "advanceExpenseReport":
        return <AdvanceExpenseReport />;

      case "advanceSalary":
        return <AdvanceSalary />;
      case "bulkAdvanceSalary":
        return <BulkAdvanceSalary />;
      case "advanceCarryForward":
        return <AdvanceCarryForward />;
      case "advanceSalaryRequests":
        return <AdvanceSalaryRequests />;
      case "advanceSalaryReport":
        return <AdvanceSalaryReport />;

      // Task Sheet Module
      case "taskDashboard":
        return <TaskDashboard />;
      case "taskCategory":
        return <TaskCategory />;
      case "taskPriority":
        return <TaskPriority />;
      case "myTaskCategory":
        return <MyTaskCategory />;
      case "taskCategoryAssign":
        return <TaskCategoryAssign />;
      case "manageMainTaskSheet":
        return <ManageMainTaskSheet />;
      case "manageTaskSheet":
        return <ManageTaskSheet />;
      case "taskReport":
        return <TaskReport />;
      case "taskSheetReport":
        return <TaskSheetReport />;
      case "projectWiseTaskSheetReport":
        return <ProjectWiseTaskSheetReport />;
      case "employeeTaskSheetReport":
        return <EmployeeTaskSheetReport />;
      case "taskSetting":
        return <TaskSetting />;

      // Quotation Module
      case "quotationTemplates":
        return <QuotationTemplates />;
      case "quotationLabels":
        return <QuotationLabels />;
      case "quotationTableColumn":
        return <QuotationTableColumn />;
      case "manageQuotation":
        return <ManageQuotation />;
      case "quotationGenerate":
        return <QuotationGenerate />;

      // LMS Module
      case "lmsCourses":
        return <Courses />;
      case "lmsCoursesView":
        return <CoursesViewReport />;
      case "lmsAssignChange":
        return <ManageAssignLMS />;

      // Logs Module
      case "activityLog":
        return <ActivityLogs />;
      case "employeeLog":
        return <EmployeeLogs />;
      case "sessionLog":
        return <SessionLogs />;

      // Balance Sheet Module
      case "balanceSheetAdd":
        return <AddBalanceSheet setActivePage={setActivePage} />;
      case "balanceSheetType":
        return <BalanceSheetType />;
      case "balanceSheetManage":
        return <ManageBalanceSheet setActivePage={setActivePage} />;
      case "balanceSheetWFH":
        return <WFHBalanceSheet />;
      case "balanceSheetReport":
        return <BalanceSheetReport />;

      // Employee Engagement Module
      case "engagementEvents":
        return <EngagementEvents />;
      case "advancedEngagement":
        return <AdvancedEngagementEvents />;
      case "celebrationTemplates":
        return <CelebrationTemplates />;

      // Events Module
      case "addEvent":
        return <AddEvent setActivePage={setActivePage} selectedEvent={selectedEvent} />;
      case "viewEvents":
        return <ViewEvents setActivePage={setActivePage} setSelectedEvent={setSelectedEvent} />;
      case "eventsReport":
        return <EventsReport />;

      // Penalty Module
      case "penaltyRules":
        return <PenaltyRules setActivePage={setActivePage} />;
      case "penaltyToLeave":
        return <PenaltyToLeave />;
      case "managePenalties":
        return <ManagePenalties />;
      case "pendingPenalties":
        return <PendingPenalties user={currentUser} />;
      case "penaltiesReport":
        return <PenaltiesReport />;

      // Company Gallery Module
      case "addGallery":
        return <AddGallery />;
      case "manageGallery":
        return <ManageGallery />;

      // Assets Setup
      case "assetDashboard":
        return <AssetDashboard setActivePage={setActivePage} />;
      case "assetCategory":
        return <AssetCategory />;
      case "manageAssets":
        return <ManageAssets />;
      case "assetBulkUpload":
        return <AssetBulkUpload />;
      case "assetUpcomingMaint":
        return <AssetMaintenance defaultTab="Upcoming" key="upcoming" />;
      case "assetMissingMaint":
        return <AssetMaintenance defaultTab="Missing" key="missing" />;
      case "assetCompletedMaint":
        return <AssetMaintenance defaultTab="Completed" key="completed" />;
      case "assetScrap":
        return <AssetScrap />;
      case "assetHistory":
        return <AssetHistory />;
      case "assetReports":
        return <AssetReports />;
      case "assetSettings":
        return <AssetSettings />;

      // Settings Module
      case "appSettings":
        return <AppSettings />;
      case "adminViewAccess":
        return <AdminViewAccess />;
      case "checkAdminAccess":
        return <CheckAdminAccess />;

      // App Banner Module
      case "appBanner":
        return <AppBanner />;

      // Survey Module
      case "addSurvey":
        return <AddSurvey setActivePage={setActivePage} />;
      case "manageSurvey":
        return <ManageSurvey setActivePage={setActivePage} />;

      // Poll Management Module
      case "addPoll":
        return <AddPoll setActivePage={setActivePage} />;
      case "pollSummary":
        return <PollSummary setActivePage={setActivePage} />;

      // Nominee Module
      case "nominationType":
        return <NominationTypeSetup />;
      case "manageNominees":
        return <ManageNominees />;

      // Lost & Found Module
      case "reportLostItem":
        return <ReportLostItem />;
      case "reportFoundItem":
        return <ReportFoundItem />;
      case "manageLostAndFound":
        return <ManageLostAndFound />;
      case "claimVerification":
        return <ClaimVerification />;
      case "lostAndFoundReport":
        return <LostAndFoundReport />;

      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    if (bypassLogin) {
      setIsAuthenticated(true);
      setCurrentUser(RENDER_BYPASS_USER);
      setActivePage("projectOverview");
      return;
    }

    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleLogin = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActivePage("dashboard");
  };

  if (!bypassLogin && !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        setActivePage={setActivePage}
        activePage={activePage}
        setSelectedEmployee={setSelectedEmployee}
        user={currentUser}
      />

      <div className="main-area">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          user={currentUser}
          onLogout={handleLogout}
          notifications={notifications}
        />

        <div className="main-content">
          <ModuleErrorBoundary moduleKey={activePage}>
            {renderPage()}
          </ModuleErrorBoundary>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
