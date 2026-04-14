import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { ToastContainer } from "./components/Toast";

import Dashboard from "./pages/FinanceDashboard/dashboard";
import FinanceDashboard from "./pages/FinanceDashboard/financeDashboard";
import Employees from "./pages/Employees/employees";
import AddEmployee from "./pages/Employees/addEmployee";
import Onboarding from "./pages/Employees/onboarding";
import ExEmployees from "./pages/Employees/exEmployees";
import Managers from "./pages/Employees/managers";
import ViewEmployee from "./pages/Employees/viewEmployee"; // NEW
import Offboarding from "./pages/Employees/offboarding";
import LevelMaster from "./pages/Employees/levelMaster";
import LevelHierarchy from "./pages/Employees/levelHierarchy";
import UpcomingRetirements from "./pages/Employees/upcomingRetirements";
import ProfileChangeRequests from "./pages/Employees/profileChangeRequests"; // NEW
import StructureManagement from "./pages/Employees/structureManagement";
import Resignation from "./pages/Employees/resignation";
import Promotion from "./pages/Employees/promotion"; // NEW
import Login from "./pages/Auth/login";
import AttendanceGrid from "./pages/Employees/attendanceGrid"; // NEW
import PayrollDashboard from "./pages/Employees/payrollDashboard"; // NEW
import BulkUpdate from "./pages/Employees/bulkUpdate"; // NEW
import ManagerRole from "./pages/Employees/managerRole";
import AssignLevel from "./pages/Employees/assignLevel";
import ShiftManagement from "./pages/ShiftManagement/shiftManagement";
import ShiftList from "./pages/ShiftManagement/shiftList";
import ShiftAssignment from "./pages/ShiftManagement/shiftAssignment";
import ShiftRotation from "./pages/ShiftManagement/shiftRotation";
import ShiftCalendar from "./pages/ShiftManagement/shiftCalendar";
import ShiftReports from "./pages/ShiftManagement/shiftReports";
import LeaveTypes from "./pages/LeaveManagement/leaveTypes";
import LeavePolicy from "./pages/LeaveManagement/leavePolicy";
import LeaveBalance from "./pages/LeaveManagement/leaveBalance";
import ApplyLeave from "./pages/LeaveManagement/applyLeave";
import LeaveRequests from "./pages/LeaveManagement/leaveRequests";
import LeaveApproval from "./pages/LeaveManagement/leaveApproval";
import LeaveCalendar from "./pages/LeaveManagement/leaveCalendar";
import LeaveReports from "./pages/LeaveManagement/leaveReports";
import LeaveSettings from "./pages/LeaveManagement/leaveSettings";
import LeaveReasons from "./pages/LeaveManagement/leaveReasons";
import LeaveGroups from "./pages/LeaveManagement/leaveGroups";
import AutoLeaves from "./pages/LeaveManagement/autoLeaves";
import LeavePayouts from "./pages/LeaveManagement/leavePayouts";
import ShortLeaves from "./pages/LeaveManagement/shortLeaves";
import HolidayManagement from "./pages/HolidayOptional/holidayManagement";
import ShiftPenaltyRules from "./pages/ShiftManagement/shiftPenaltyRules";
import ShiftChangeRequests from "./pages/ShiftManagement/shiftChangeRequests";
import HolidayExchangeRequests from "./pages/HolidayOptional/holidayExchangeRequests";
import Templates from "./pages/TemplateModule/Templates";
import AddTemplate from "./pages/TemplateModule/AddTemplate";
import ManageTemplate from "./pages/TemplateModule/ManageTemplate";
import ManageTemplateQuestions from "./pages/TemplateModule/ManageTemplateQuestions";
import SalesDashboard from "./pages/OrderProduct/SalesDashboard";
import OrderSettings from "./pages/OrderProduct/OrderSettings";
import ManageArea from "./pages/OrderProduct/ManageArea";
import ManageCities from "./pages/OrderProduct/ManageCities";
import CountryList from "./pages/OrderProduct/CountryList";
import AssignedDistributors from "./pages/OrderProduct/AssignedDistributors";
import UnitMeasurement from "./pages/OrderProduct/UnitMeasurement";
import ViewOrders from "./pages/OrderProduct/ViewOrders";
import ManageProductStock from "./pages/OrderProduct/ManageProductStock";
import OrderRouteMap from "./pages/OrderProduct/OrderRouteMap";
import SalesSummaryReport from "./pages/OrderProduct/SalesSummaryReport";
import StockInOutReport from "./pages/OrderProduct/StockInOutReport";
import SalesDumpReport from "./pages/OrderProduct/SalesDumpReport";
import AvailableProductStockReport from "./pages/OrderProduct/AvailableProductStockReport";
import ManageRoute from "./pages/OrderProduct/ManageRoute";
import ManageEmployeeRoute from "./pages/OrderProduct/ManageEmployeeRoute";
import OrdersJobLocation from "./pages/OrderProduct/OrdersJobLocation";
import ProductCategory from "./pages/OrderProduct/ProductCategory";
import ProductSubCategory from "./pages/OrderProduct/ProductSubCategory";
import ManageProduct from "./pages/OrderProduct/ManageProduct";
import ManageProductVariant from "./pages/OrderProduct/ManageProductVariant";
import DailySalesReport from "./pages/OrderProduct/DailySalesReport";
import RetailerBeatPlan from "./pages/OrderProduct/RetailerBeatPlan";
import ManageRetailer from "./pages/OrderProduct/ManageRetailer";
import ManageDistributor from "./pages/OrderProduct/ManageDistributor";
import ManageSuperDistributor from "./pages/OrderProduct/ManageSuperDistributor";
import CustomerCategories from "./pages/OrderProduct/CustomerCategories";
import CustomerSubCategory from "./pages/OrderProduct/CustomerSubCategory";
import ExpenseCategories from "./pages/ExpenseManagement/expenseCategories";
import ExpenseSubCategories from "./pages/ExpenseManagement/expenseSubCategories";
import AssignVisitExpense from "./pages/ExpenseManagement/assignVisitExpense";
import ExpenseSettings from "./pages/ExpenseManagement/expenseSettings";

// Expense Module (new)
import ManageExpenseTemplate from "./pages/ExpenseManagement/manageExpenseTemplate";
import AddExpense from "./pages/ExpenseManagement/addExpense";
import PendingExpense from "./pages/ExpenseManagement/pendingExpense";
import UnpaidExpense from "./pages/ExpenseManagement/unpaidExpense";
import PaidExpense from "./pages/ExpenseManagement/paidExpense";
import RejectedExpense from "./pages/ExpenseManagement/rejectedExpense";
import GroupWiseExpense from "./pages/ExpenseManagement/groupWiseExpense";
import DayWiseExpense from "./pages/ExpenseManagement/dayWiseExpense";
import ManageExpenseAdvance from "./pages/ExpenseManagement/manageExpenseAdvance";
import AdvanceExpenseRequest from "./pages/ExpenseManagement/advanceExpenseRequest";
import GenerateVoucher from "./pages/ExpenseManagement/generateVoucher";
import { PaidExpenseHistoryReport, EmployeeExpenseReport, UnpaidExpenseReport, ApprovedExpenseReport, AdvanceExpenseReport } from "./pages/ExpenseManagement/expenseReports";

// Advance Payments
import AdvanceSalary from "./pages/AdvancePayments/advanceSalary";
import BulkAdvanceSalary from "./pages/AdvancePayments/bulkAdvanceSalary";
import AdvanceCarryForward from "./pages/AdvancePayments/advanceCarryForward";
import AdvanceSalaryRequests from "./pages/AdvancePayments/advanceSalaryRequests";
import AdvanceSalaryReport from "./pages/AdvancePayments/advanceSalaryReport";

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
import AddEvent from "./pages/EventsManagement/AddEvent";
import ViewEvents from "./pages/EventsManagement/ViewEvents";
import EventsReport from "./pages/EventsManagement/EventsReport";

// Penalty Module
import PenaltyRules from "./pages/PenaltyManagement/PenaltyRules";
import PenaltyToLeave from "./pages/PenaltyManagement/PenaltyToLeave";
import ManagePenalties from "./pages/PenaltyManagement/ManagePenalties";
import PendingPenalties from "./pages/PenaltyManagement/PendingPenalties";
import PenaltiesReport from "./pages/PenaltyManagement/PenaltiesReport";

// Company Gallery Module
import AddGallery from "./pages/CompanyGallery/AddGallery";
import ManageGallery from "./pages/CompanyGallery/ManageGallery";

// Assets Setup Module
import AssetDashboard from "./pages/AssetsSetup/AssetDashboard";
import AssetCategory from "./pages/AssetsSetup/AssetCategory";
import ManageAssets from "./pages/AssetsSetup/ManageAssets";
import AssetBulkUpload from "./pages/AssetsSetup/AssetBulkUpload";
import AssetMaintenance from "./pages/AssetsSetup/AssetMaintenance";
import AssetScrap from "./pages/AssetsSetup/AssetScrap";
import AssetHistory from "./pages/AssetsSetup/AssetHistory";
import AssetReports from "./pages/AssetsSetup/AssetReports";
import AssetSettings from "./pages/AssetsSetup/AssetSettings";

// Settings Module
import AppSettings from "./pages/SettingsModule/AppSettings";
import AdminViewAccess from "./pages/SettingsModule/AdminViewAccess";
import CheckAdminAccess from "./pages/SettingsModule/CheckAdminAccess";

// App Banner Module
import AppBanner from "./pages/AppBanner/AppBanner";

// Survey Module
import AddSurvey from "./pages/SurveyModule/AddSurvey";
import ManageSurvey from "./pages/SurveyModule/ManageSurvey";

// Poll Management Module
import AddPoll from "./pages/PollManagement/AddPoll";
import PollSummary from "./pages/PollManagement/PollSummary";

// Nominee Module
import NominationTypeSetup from "./pages/EmployeeNominee/NominationTypeSetup";
import ManageNominees from "./pages/EmployeeNominee/ManageNominees";

// Lost & Found Module
import ReportLostItem from "./pages/LostAndFound/ReportLostItem";
import ReportFoundItem from "./pages/LostAndFound/ReportFoundItem";
import ManageLostAndFound from "./pages/LostAndFound/ManageLostAndFound";
import ClaimVerification from "./pages/LostAndFound/ClaimVerification";
import LostAndFoundReport from "./pages/LostAndFound/LostAndFoundReport";
import { clearSession, getStoredUser, isSessionAuthenticated } from "./utils/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isSessionAuthenticated());
  const [currentUser, setCurrentUser] = useState<any>(() => getStoredUser());

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("finance");

  useEffect(() => {
    if (isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const requestUrl = String(error?.config?.url || "");
        const isAuthEndpoint = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");
        if (status === 401 && !isAuthEndpoint) {
          window.dispatchEvent(
            new CustomEvent("app:session-expired", {
              detail: { message: "Your session has expired. Please login again." },
            })
          );
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, []);

  // 🔹 NEW: store selected employee for view/edit
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // 🔹 Global Notifications
  const [notifications, setNotifications] = useState<any[]>([]);

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

    const sessionExpiredHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ message?: string }>).detail;
      clearSession();
      setCurrentUser(null);
      setIsAuthenticated(false);
      if (detail?.message) addNotification(detail.message, "warning");
    };

    window.addEventListener("app:navigate", navHandler);
    window.addEventListener("app:notification", notifHandler);
    window.addEventListener("app:session-expired", sessionExpiredHandler);
    
    return () => {
      window.removeEventListener("app:navigate", navHandler);
      window.removeEventListener("app:notification", notifHandler);
      window.removeEventListener("app:session-expired", sessionExpiredHandler);
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
        if (!selectedEmployee) return <Employees setActivePage={setActivePage} setSelectedEmployee={setSelectedEmployee} />;
        return <ViewEmployee selectedEmployee={selectedEmployee} setActivePage={setActivePage} />;

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
        if (!selectedTemplate?.id) return <Templates setActivePage={setActivePage} setSelectedTemplate={setSelectedTemplate} />;
        return <AddTemplate id={selectedTemplate.id} setActivePage={setActivePage} />;

      case "manageTemplate":
        if (!selectedTemplate?.id) return <Templates setActivePage={setActivePage} setSelectedTemplate={setSelectedTemplate} />;
        return <ManageTemplate templateId={selectedTemplate.id} setActivePage={setActivePage} />;

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
    clearSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleLogin = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
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

        {renderPage()}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;