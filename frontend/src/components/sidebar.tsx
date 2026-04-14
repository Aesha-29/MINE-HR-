import { useState, useEffect } from "react";
import "./sidebar.css";
import logoNew from "../assets/MineHR logo.png";

import {
  Settings,
  Users,
  Calculator,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Monitor,
  Building2,
  ChevronRight,
  ChevronDown,
  FileText,
  Clock,
  CalendarDays,
  ShoppingCart,
  Banknote,
  Shield,
  Landmark,
  Gift,
  ScanFace,
  AlertCircle,
  Camera,
  Image as LucideImage,
  Search
} from "lucide-react";


interface SidebarProps {
  isOpen: boolean;
  setActivePage: (page: string) => void;
  activePage: string;
  setSelectedEmployee?: (emp: any) => void;
  user?: any;
}

function Sidebar({ isOpen, setActivePage, activePage, setSelectedEmployee, user }: SidebarProps) {
  const companyName = "MineHR-Solutions Pvt. Ltd.";

  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [shiftOpen, setShiftOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [holidayOpen, setHolidayOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [orderProductOpen, setOrderProductOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [advancePaymentOpen, setAdvancePaymentOpen] = useState(false);
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [quotationOpen, setQuotationOpen] = useState(false);
  const [lmsOpen, setLmsOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [balanceSheetOpen, setBalanceSheetOpen] = useState(false);
  const [engagementOpen, setEngagementOpen] = useState(false);
  const [facexOpen, setFacexOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [penaltyOpen, setPenaltyOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false);
  const [settingsModuleOpen, setSettingsModuleOpen] = useState(false);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [pollOpen, setPollOpen] = useState(false);
  const [nomineeOpen, setNomineeOpen] = useState(false);
  const [lostAndFoundOpen, setLostAndFoundOpen] = useState(false);

  // Auto-expand parents based on activePage
  useEffect(() => {
    const page = activePage.toLowerCase();
    if (page.includes("employee") || page.includes("resignation") || page.includes("promotion")) setEmployeesOpen(true);
    if (page.includes("nominee") || page.includes("nomination")) setNomineeOpen(true);
    if (page.includes("lost") || page.includes("found") || page.includes("claim")) setLostAndFoundOpen(true);
    if (page.includes("shift")) setShiftOpen(true);
    if (page.includes("leave")) setLeaveOpen(true);
    if (page.includes("holiday")) setHolidayOpen(true);
    if (page.includes("template")) setTemplateOpen(true);
    if (page.includes("order") || page.includes("product") || page.includes("visit")) setOrderProductOpen(true);
    if (page.includes("expense")) setExpenseOpen(true);
    if (page.includes("advance")) setAdvancePaymentOpen(true);
    if (page.includes("task")) setTaskSheetOpen(true);
    if (page.includes("quotation")) setQuotationOpen(true);
    if (page.includes("lms")) setLmsOpen(true);
    if (page.includes("log")) setLogsOpen(true);
    if (page.includes("balancesheet")) setBalanceSheetOpen(true);
    if (page.includes("engagement")) setEngagementOpen(true);
    if (page.includes("facex")) setFacexOpen(true);
    if (page.includes("event")) setEventsOpen(true);
    if (page.includes("penalty")) setPenaltyOpen(true);
    if (page.includes("asset")) setAssetOpen(true);
    if (page.includes("settings") || page.includes("access")) setSettingsModuleOpen(true);
    if (page.includes("survey")) setSurveyOpen(true);
    if (page.includes("poll")) setPollOpen(true);
  }, [activePage]);


  return (
    <aside className={`sidebar ${!isOpen ? "sidebar-hidden" : ""}`}>
      <div className="sidebar-content-wrapper">
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="sidebar-main-logo">
               <img src={logoNew} alt="MineHR Solutions" className="logo-image" />
            </div>
          </div>

          <div className="company-info-box">
            <Building2 size={14} className="company-icon" />
            <span className="company-name-text">{companyName}</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">
          <ul>
            <li
              className={activePage === "finance" ? "active" : ""}
              onClick={() => setActivePage("finance")}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Settings size={18} className="menu-icon" />
                <span>Finance Dashboard</span>
              </div>
              <ChevronRight size={16} className="arrow-icon" />
            </li>

            <li
              className={`${activePage?.includes("employees") ? "active-parent" : ""
                }`}
              onClick={() => setEmployeesOpen(!employeesOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Users size={18} className="menu-icon" />
                <span>Employees</span>
              </div>
              {employeesOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {employeesOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "employees" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("employees"); }}
                >
                  <div className="sub-dot"></div>
                  <span>All Employees</span>
                </li>

                {true && (
                  <>
                    <li
                      className={activePage === "addEmployee" ? "active-sub" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setSelectedEmployee) setSelectedEmployee(null);
                        setActivePage("addEmployee");
                      }}
                    >
                      <div className="sub-dot"></div>
                      <span>Add Employee</span>
                    </li>

                    <li
                      className={activePage === "onboarding" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("onboarding"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Onboarding</span>
                    </li>

                    <li
                      className={activePage === "offboarding" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("offboarding"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Offboarding</span>
                    </li>
                  </>
                )}

                <li
                  className={activePage === "resignation" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("resignation"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Resignation</span>
                </li>

                {true && (
                  <li
                    className={activePage === "promotion" ? "active-sub" : ""}
                    onClick={(e) => { e.stopPropagation(); setActivePage("promotion"); }}
                  >
                    <div className="sub-dot"></div>
                    <span>Promotions</span>
                  </li>
                )}


                {true && (
                  <>

                    <li
                      className={activePage === "exEmployees" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("exEmployees"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Ex Employees</span>
                    </li>

                    <li
                      className={activePage === "upcomingRetirements" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("upcomingRetirements"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Upcoming Retirements</span>
                    </li>

                    <li
                      className={activePage === "managers" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("managers"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Managers / Admin</span>
                    </li>

                    <li
                      className={activePage === "managerRole" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("managerRole"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manager Role</span>
                    </li>

                    <li
                      className={activePage === "levelMaster" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("levelMaster"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Level Master</span>
                    </li>

                    <li
                      className={activePage === "assignLevel" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("assignLevel"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Assign Level</span>
                    </li>
                  </>
                )}

                <li
                  className={activePage === "levelHierarchy" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("levelHierarchy"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Level Hierarchy</span>
                </li>


                <li
                  className={activePage === "profileChangeRequests" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("profileChangeRequests"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Profile Change Requests</span>
                </li>

                {true && (
                  <>
                    <li
                      className={activePage === "structureManagement" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("structureManagement"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Structure Management</span>
                    </li>
                  </>
                )}
              </ul>
            )}

            {/* Employee Nominee Module */}
            <li
              className={`${nomineeOpen ? "active-parent" : ""}`}
              onClick={() => setNomineeOpen(!nomineeOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Users size={18} className="menu-icon" />
                <span>Employee Nominee</span>
              </div>
              <ChevronRight size={16} className={`arrow-icon ${nomineeOpen ? "rotate-90" : ""}`} />
            </li>

            {nomineeOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "nominationType" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("nominationType"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Nomination For (Setup)</span>
                </li>
                <li
                  className={activePage === "manageNominees" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("manageNominees"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Manage Employees Nominee</span>
                </li>
              </ul>
            )}

            {/* Rest Menu */}
            {/* Shift Management Submenu */}
            <li
              className={`${shiftOpen ? "active-parent" : ""}`}
              onClick={() => setShiftOpen(!shiftOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Clock size={18} className="menu-icon" />
                <span>Shift Management</span>
              </div>
              <ChevronRight size={16} className={`arrow-icon ${shiftOpen ? "rotate-90" : ""}`} />
            </li>

            {shiftOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "shiftManagement" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftManagement"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Create Shift</span>
                </li>
                <li
                  className={activePage === "shiftList" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftList"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift List</span>
                </li>
                <li
                  className={activePage === "shiftAssignment" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftAssignment"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift Assignment</span>
                </li>
                <li
                  className={activePage === "shiftRotation" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftRotation"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift Rotation</span>
                </li>
                <li
                  className={activePage === "shiftCalendar" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftCalendar"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift Calendar</span>
                </li>
                <li
                  className={activePage === "shiftReports" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftReports"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift Reports</span>
                </li>
                <li
                  className={activePage === "shiftChangeRequests" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftChangeRequests"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Shift Requests</span>
                </li>
                <li
                  className={activePage === "shiftPenaltyRules" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("shiftPenaltyRules"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Penalty Rules</span>
                </li>
              </ul>
            )}

            {/* Holiday Management Submenu */}
            <li
              className={`${holidayOpen ? "active-parent" : ""}`}
              onClick={() => setHolidayOpen(!holidayOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <CalendarDays size={18} className="menu-icon" />
                <span>Holiday & Optional</span>
              </div>
              <ChevronRight size={16} className={`arrow-icon ${holidayOpen ? "rotate-90" : ""}`} />
            </li>

            {holidayOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "holidayManagement" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("holidayManagement"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Manage Holidays</span>
                </li>
                <li
                  className={activePage === "holidayExchangeRequests" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("holidayExchangeRequests"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Exchange Requests</span>
                </li>
              </ul>
            )}

            {/* Leave Management Submenu */}
            <li
              className={`${leaveOpen ? "active-parent" : ""}`}
              onClick={() => setLeaveOpen(!leaveOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <CalendarDays size={18} className="menu-icon" />
                <span>Leave Management</span>
              </div>
              <ChevronRight size={16} className={`arrow-icon ${leaveOpen ? "rotate-90" : ""}`} />
            </li>

            {leaveOpen && (
              <ul className="submenu-list">
                {[
                  { page: "leaveTypes", label: "Leave Types" },
                  { page: "leaveReasons", label: "Leave Reasons" },
                  { page: "leaveGroups", label: "Leave Groups" },
                  { page: "leavePolicy", label: "Leave Policy" },
                  { page: "leaveBalance", label: "Leave Balance" },
                  { page: "applyLeave", label: "Apply Leave" },
                  { page: "shortLeaves", label: "Short Leaves" },
                  { page: "leaveRequests", label: "Leave Requests" },
                  { page: "leaveApproval", label: "Leave Approval" },
                  { page: "leavePayouts", label: "Leave Payouts" },
                  { page: "autoLeaves", label: "Auto Leaves" },
                  { page: "leaveCalendar", label: "Leave Calendar" },
                  { page: "leaveReports", label: "Leave Reports" },
                  { page: "leaveSettings", label: "Leave Settings" },
                ].map(item => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => { e.stopPropagation(); setActivePage(item.page); }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Template Module Submenu */}
            {true && (
              <>
                <li
                  className={`${templateOpen ? "active-parent" : ""}`}
                  onClick={() => setTemplateOpen(!templateOpen)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="menu-item-content">
                    <ClipboardList size={18} className="menu-icon" />
                    <span>Template Module</span>
                  </div>
                  <ChevronRight size={16} className={`arrow-icon ${templateOpen ? "rotate-90" : ""}`} />
                </li>

                {templateOpen && (
                  <ul className="submenu-list">
                    <li
                      className={activePage === "templates" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("templates"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Template List</span>
                    </li>
                    <li
                      className={activePage === "addTemplate" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("addTemplate"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Add New Template</span>
                    </li>
                    <li
                      className={activePage === "manageTemplateQuestions" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageTemplateQuestions"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Template Questions</span>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* Order Product Module Submenu */}
            {true && (
              <>
                <li
                  className={`${orderProductOpen ? "active-parent" : ""}`}
                  onClick={() => setOrderProductOpen(!orderProductOpen)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="menu-item-content">
                    <ShoppingCart size={18} className="menu-icon" />
                    <span>Order Product</span>
                  </div>
                  <ChevronRight size={16} className={`arrow-icon ${orderProductOpen ? "rotate-90" : ""}`} />
                </li>

                {orderProductOpen && (
                  <ul className="submenu-list">
                    <li
                      className={activePage === "salesDashboard" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("salesDashboard"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Sales Dashboard</span>
                    </li>
                    <li
                      className={activePage === "orderSettings" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("orderSettings"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Order Settings</span>
                    </li>
                    <li
                      className={activePage === "manageArea" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageArea"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Area</span>
                    </li>
                    <li
                      className={activePage === "manageCities" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageCities"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Cities</span>
                    </li>
                    <li
                      className={activePage === "countryList" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("countryList"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Country List</span>
                    </li>
                    <li
                      className={activePage === "assignedDistributors" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("assignedDistributors"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Assigned Distributors</span>
                    </li>
                    <li
                      className={activePage === "unitMeasurement" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("unitMeasurement"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Unit Measurement</span>
                    </li>
                    <li
                      className={activePage === "viewOrders" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("viewOrders"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>View Orders</span>
                    </li>
                    <li
                      className={activePage === "manageProductStock" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageProductStock"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Product Stock</span>
                    </li>
                    <li
                      className={activePage === "orderRouteMap" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("orderRouteMap"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Order Route Map</span>
                    </li>
                    <li
                      className={activePage === "salesSummaryReport" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("salesSummaryReport"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Sales Summary Report</span>
                    </li>
                    <li
                      className={activePage === "stockInOutReport" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("stockInOutReport"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Stock In/Out Report</span>
                    </li>
                    <li
                      className={activePage === "salesDumpReport" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("salesDumpReport"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Sales Dump Report</span>
                    </li>
                    <li
                      className={activePage === "availableProductStockReport" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("availableProductStockReport"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Available Product Stock</span>
                    </li>
                    <li
                      className={activePage === "manageRoute" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageRoute"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Route</span>
                    </li>
                    <li
                      className={activePage === "manageEmployeeRoute" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageEmployeeRoute"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Employee Route</span>
                    </li>
                    <li
                      className={activePage === "ordersJobLocation" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("ordersJobLocation"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Orders Job Location</span>
                    </li>
                    <li
                      className={activePage === "productCategory" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("productCategory"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Product Category</span>
                    </li>
                    <li
                      className={activePage === "productSubCategory" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("productSubCategory"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Product Sub Category</span>
                    </li>
                    <li
                      className={activePage === "manageProduct" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageProduct"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Product</span>
                    </li>
                    <li
                      className={activePage === "manageProductVariant" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageProductVariant"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Product Variant</span>
                    </li>
                    <li
                      className={activePage === "dailySalesReport" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("dailySalesReport"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Daily Sales Report</span>
                    </li>
                    <li
                      className={activePage === "retailerBeatPlan" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("retailerBeatPlan"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Retailer Beat Plan</span>
                    </li>
                    <li
                      className={activePage === "manageRetailer" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageRetailer"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Retailer</span>
                    </li>
                    <li
                      className={activePage === "manageDistributor" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageDistributor"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Distributor</span>
                    </li>
                    <li
                      className={activePage === "manageSuperDistributor" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("manageSuperDistributor"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Manage Super Distributor</span>
                    </li>
                    <li
                      className={activePage === "customerCategories" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("customerCategories"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Customer Categories</span>
                    </li>
                    <li
                      className={activePage === "customerSubCategory" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("customerSubCategory"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Customer Sub Category</span>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* Expense Module */}
            <li
              className={`${activePage?.includes("expense") || activePage?.includes("assignVisitExpense") ? "active-parent" : ""}`}
              onClick={() => setExpenseOpen(!expenseOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Calculator size={18} className="menu-icon" />
                <span>Expense Management</span>
              </div>
              {expenseOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {expenseOpen && (
              <ul className="submenu-list">

                {/* ── Setup ── */}
                <li className={activePage === "expenseCategories" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("expenseCategories"); }}>
                  <div className="sub-dot"></div><span>Expense Categories</span>
                </li>
                <li className={activePage === "expenseSubCategories" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("expenseSubCategories"); }}>
                  <div className="sub-dot"></div><span>Sub Categories</span>
                </li>
                <li className={activePage === "assignVisitExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("assignVisitExpense"); }}>
                  <div className="sub-dot"></div><span>Assign Limits</span>
                </li>
                <li className={activePage === "expenseSettings" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("expenseSettings"); }}>
                  <div className="sub-dot"></div><span>Expense Settings</span>
                </li>
                <li className={activePage === "manageExpenseTemplate" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("manageExpenseTemplate"); }}>
                  <div className="sub-dot"></div><span>Manage Assign Template</span>
                </li>

                {/* ── Expense Flow ── */}
                <li className={activePage === "addExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("addExpense"); }}>
                  <div className="sub-dot"></div><span>Add Expense</span>
                </li>
                <li className={activePage === "pendingExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("pendingExpense"); }}>
                  <div className="sub-dot"></div><span>Pending Expense</span>
                </li>
                <li className={activePage === "unpaidExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("unpaidExpense"); }}>
                  <div className="sub-dot"></div><span>Unpaid Expense</span>
                </li>
                <li className={activePage === "paidExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("paidExpense"); }}>
                  <div className="sub-dot"></div><span>Paid Expense</span>
                </li>
                <li className={activePage === "rejectedExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("rejectedExpense"); }}>
                  <div className="sub-dot"></div><span>Rejected Expense</span>
                </li>
                <li className={activePage === "generateVoucher" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("generateVoucher"); }}>
                  <div className="sub-dot"></div><span>Generate Voucher</span>
                </li>
                <li className={activePage === "groupWiseExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("groupWiseExpense"); }}>
                  <div className="sub-dot"></div><span>Group Wise Expense</span>
                </li>
                <li className={activePage === "dayWiseExpense" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("dayWiseExpense"); }}>
                  <div className="sub-dot"></div><span>Day Wise Expense</span>
                </li>

                {/* ── Advance ── */}
                <li className={activePage === "manageExpenseAdvance" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("manageExpenseAdvance"); }}>
                  <div className="sub-dot"></div><span>Manage Advance</span>
                </li>
                <li className={activePage === "advanceExpenseRequest" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("advanceExpenseRequest"); }}>
                  <div className="sub-dot"></div><span>Advance Expense Request</span>
                </li>

                {/* ── Reports ── */}
                <li className={activePage === "paidExpenseHistoryReport" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("paidExpenseHistoryReport"); }}>
                  <div className="sub-dot"></div><span>Paid History Report</span>
                </li>
                <li className={activePage === "employeeExpenseReport" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("employeeExpenseReport"); }}>
                  <div className="sub-dot"></div><span>Employee Expense Report</span>
                </li>
                <li className={activePage === "unpaidExpenseReport" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("unpaidExpenseReport"); }}>
                  <div className="sub-dot"></div><span>Unpaid Expense Report</span>
                </li>
                <li className={activePage === "approvedExpenseReport" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("approvedExpenseReport"); }}>
                  <div className="sub-dot"></div><span>Approved Expense Report</span>
                </li>
                <li className={activePage === "advanceExpenseReport" ? "active-sub" : ""} onClick={(e) => { e.stopPropagation(); setActivePage("advanceExpenseReport"); }}>
                  <div className="sub-dot"></div><span>Advance Expense Report</span>
                </li>

              </ul>
            )}

            {/* Advance Payments Module */}
            <li
              className={`${activePage?.includes("advance") ? "active-parent" : ""}`}
              onClick={() => setAdvancePaymentOpen(!advancePaymentOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Banknote size={18} className="menu-icon" />
                <span>Advance Payments</span>
              </div>
              {advancePaymentOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {advancePaymentOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "advanceSalary" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("advanceSalary"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Advance Salary</span>
                </li>
                {true && (
                  <>
                    <li
                      className={activePage === "bulkAdvanceSalary" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("bulkAdvanceSalary"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Bulk Advance Salary</span>
                    </li>
                    <li
                      className={activePage === "advanceCarryForward" ? "active-sub" : ""}
                      onClick={(e) => { e.stopPropagation(); setActivePage("advanceCarryForward"); }}
                    >
                      <div className="sub-dot"></div>
                      <span>Carry Forward</span>
                    </li>
                  </>
                )}
                <li
                  className={activePage === "advanceSalaryRequests" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("advanceSalaryRequests"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Salary Requests</span>
                </li>
                {true && (
                  <li
                    className={activePage === "advanceSalaryReport" ? "active-sub" : ""}
                    onClick={(e) => { e.stopPropagation(); setActivePage("advanceSalaryReport"); }}
                  >
                    <div className="sub-dot"></div>
                    <span>Salary Report</span>
                  </li>
                )}
              </ul>
            )}

            {/* Task Sheet Module */}
            <li
              className={`${activePage?.toLowerCase().includes("task") ? "active-parent" : ""}`}
              onClick={() => setTaskSheetOpen(!taskSheetOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <ClipboardList size={18} className="menu-icon" />
                <span>Task Sheet</span>
              </div>
              {taskSheetOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {taskSheetOpen && (
              <ul className="submenu-list">
                {[
                  { page: "taskDashboard", label: "Task Dashboard" },
                  { page: "taskCategory", label: "Task Category" },
                  { page: "taskPriority", label: "Task Priority" },
                  { page: "myTaskCategory", label: "My Task Category" },
                  { page: "taskCategoryAssign", label: "Task Category Assign" },
                  { page: "manageMainTaskSheet", label: "Manage Main Task Sheet" },
                  { page: "manageTaskSheet", label: "Manage Task Sheet" },
                  { page: "taskReport", label: "Task Report" },
                  { page: "taskSheetReport", label: "Task Sheet Report" },
                  { page: "projectWiseTaskSheetReport", label: "Project Wise Report" },
                  { page: "employeeTaskSheetReport", label: "Employee Task Report" },
                  { page: "taskSetting", label: "Task Setting" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Quotation Module */}
            <li
              className={`${activePage?.toLowerCase().includes("quotation") ? "active-parent" : ""}`}
              onClick={() => setQuotationOpen(!quotationOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <FileText size={18} className="menu-icon" />
                <span>Quotation</span>
              </div>
              {quotationOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {quotationOpen && (
              <ul className="submenu-list">
                {[
                  { page: "quotationTemplates", label: "Quotation Templates" },
                  { page: "quotationLabels", label: "Quotation Labels" },
                  { page: "quotationTableColumn", label: "Quotation Columns" },
                  { page: "manageQuotation", label: "Manage Quotation" },
                  { page: "quotationGenerate", label: "Generate Quotation" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* LMS Module */}
            <li
              className={`${activePage?.toLowerCase().includes("lms") ? "active-parent" : ""}`}
              onClick={() => setLmsOpen(!lmsOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <BookOpen size={18} className="menu-icon" />
                <span>LMS</span>
              </div>
              {lmsOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {lmsOpen && (
              <ul className="submenu-list">
                {[
                  { page: "lmsCourses", label: "Courses" },
                  { page: "lmsCoursesView", label: "Courses View Report" },
                  { page: "lmsAssignChange", label: "Manage Assign LMS" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Logs Module */}
            <li
              className={`${activePage?.toLowerCase().includes("log") ? "active-parent" : ""}`}
              onClick={() => setLogsOpen(!logsOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Shield size={18} className="menu-icon" />
                <span>Logs</span>
              </div>
              {logsOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {logsOpen && (
              <ul className="submenu-list">
                {[
                  { page: "activityLog", label: "Activity Logs" },
                  { page: "employeeLog", label: "Employee Logs" },
                  { page: "sessionLog", label: "Session Logs" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Balance Sheet Module */}
            <li
              className={`${activePage?.toLowerCase().includes("balancesheet") ? "active-parent" : ""}`}
              onClick={() => setBalanceSheetOpen(!balanceSheetOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Landmark size={18} className="menu-icon" />
                <span>Balance Sheet</span>
              </div>
              {balanceSheetOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {balanceSheetOpen && (
              <ul className="submenu-list">
                {[
                  { page: "balanceSheetAdd", label: "Add Balance Entry" },
                  { page: "balanceSheetType", label: "Balance Sheet Type" },
                  { page: "balanceSheetManage", label: "Manage Balance Sheet" },
                  { page: "balanceSheetWFH", label: "WFH Balance Sheet" },
                  { page: "balanceSheetReport", label: "Financial Report" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Employee Engagement Module */}
            <li
              className={`${activePage === "engagementEvents" || activePage === "advancedEngagement" || activePage === "celebrationTemplates" ? "active-parent" : ""}`}
              onClick={() => setEngagementOpen(!engagementOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Gift size={18} className="menu-icon" />
                <span>Employee Engagement</span>
              </div>
              {engagementOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {engagementOpen && (
              <ul className="submenu-list">
                {[
                  { page: "engagementEvents", label: "Upcoming Events" },
                  { page: "advancedEngagement", label: "Advanced Tracker" },
                  { page: "celebrationTemplates", label: "Wishes Templates" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* FaceX App Module */}
            <li
              className={`${activePage === "facex_admin" || activePage === "facex_device" || activePage === "facex_data" || activePage === "facex_request" ? "active-parent" : ""}`}
              onClick={() => setFacexOpen(!facexOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <ScanFace size={18} className="menu-icon" />
                <span>FaceX App</span>
              </div>
              {facexOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {facexOpen && (
              <ul className="submenu-list">
                {[
                  { page: "facex_admin", label: "App Admins" },
                  { page: "facex_device", label: "Registered Devices" },
                  { page: "facex_data", label: "Biometric Registry" },
                  { page: "facex_request", label: "Change Requests" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Events Management Module */}
            <li
              className={`${activePage === "addEvent" || activePage === "viewEvents" || activePage === "eventsReport" ? "active-parent" : ""}`}
              onClick={() => setEventsOpen(!eventsOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <CalendarDays size={18} className="menu-icon" />
                <span>Events Management</span>
              </div>
              {eventsOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {eventsOpen && (
              <ul className="submenu-list">
                {[
                  { page: "addEvent", label: "Add Event" },
                  { page: "viewEvents", label: "View Events" },
                  { page: "eventsReport", label: "Events Report" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Penalty Management Module */}
            <li
              className={`${activePage === "penaltyRules" || activePage === "penaltyToLeave" || activePage === "managePenalties" || activePage === "pendingPenalties" || activePage === "penaltiesReport" ? "active-parent" : ""}`}
              onClick={() => setPenaltyOpen(!penaltyOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <AlertCircle size={18} className="menu-icon" />
                <span>Penalty Management</span>
              </div>
              {penaltyOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {penaltyOpen && (
              <ul className="submenu-list">
                {[
                  { page: "penaltyRules", label: "Penalty Rules" },
                  { page: "penaltyToLeave", label: "Penalty to Leave" },
                  { page: "managePenalties", label: "Manage Penalties" },
                  { page: "pendingPenalties", label: "Pending Penalties" },
                  { page: "penaltiesReport", label: "Penalties Report" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Company Gallery Module */}
            <li
              className={`${activePage === "addGallery" || activePage === "manageGallery" ? "active-parent" : ""}`}
              onClick={() => setGalleryOpen(!galleryOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Camera size={18} className="menu-icon" />
                <span>Company Gallery</span>
              </div>
              {galleryOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {galleryOpen && (
              <ul className="submenu-list">
                {[
                  { page: "addGallery", label: "Add Gallery Media" },
                  { page: "manageGallery", label: "Manage Gallery" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Assets Setup Module */}
            <li
              className={`${activePage === "assetCategory" || activePage === "manageAssets" || activePage === "assetMaintenance" || activePage === "assetScrap" || activePage === "assetHistory" || activePage === "assetReports" || activePage === "assetSettings" ? "active-parent" : ""}`}
              onClick={() => setAssetOpen(!assetOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Monitor size={18} className="menu-icon" />
                <span>Assets Setup</span>
              </div>
              {assetOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {assetOpen && (
              <ul className="submenu-list">
                {[
                  { page: "assetDashboard", label: "Assets Dashboard" },
                  { page: "assetCategory", label: "Asset Categories" },
                  { page: "manageAssets", label: "Manage Assets" },
                  { page: "assetBulkUpload", label: "Assets Bulk Upload" },
                  { page: "assetHistory", label: "Asset Audit Trail" },
                  { page: "assetUpcomingMaint", label: "Upcoming Maintenance" },
                  { page: "assetMissingMaint", label: "Missing Maintenance" },
                  { page: "assetCompletedMaint", label: "Completed Maintenance" },
                  { page: "assetReports", label: "Asset Reports" },
                  { page: "assetScrap", label: "Scrap & Disposal" },
                  { page: "assetSettings", label: "Assets Setting" },
                ].map((item) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Settings Module */}
            <li
              className={`${activePage === "appSettings" || activePage === "adminViewAccess" || activePage === "checkAdminAccess" ? "active-parent" : ""}`}
              onClick={() => setSettingsModuleOpen(!settingsModuleOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Settings size={18} className="menu-icon" />
                <span>Settings Module</span>
              </div>
              {settingsModuleOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {settingsModuleOpen && (
              <ul className="submenu-list">
                {[
                  { page: "appSettings", label: "App Access" },
                  { page: "adminViewAccess", label: "Admin View Access" },
                  { page: "checkAdminAccess", label: "Check Admin Access" },
                ].map((item: any) => (
                  <li
                    key={item.page}
                    className={activePage === item.page ? "active-sub" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(item.page);
                    }}
                  >
                    <div className="sub-dot"></div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* App Banner Module */}
            <li
              className={activePage === "appBanner" ? "active" : ""}
              onClick={() => setActivePage("appBanner")}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <LucideImage size={18} className="menu-icon" />
                <span>App Banner</span>
              </div>
              <ChevronRight size={16} className="arrow-icon" />
            </li>

            {/* Survey Module */}
            <li
              className={`${activePage === "addSurvey" || activePage === "manageSurvey" ? "active-parent" : ""}`}
              onClick={() => setSurveyOpen(!surveyOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <ClipboardList size={18} className="menu-icon" />
                <span>Survey Module</span>
              </div>
              {surveyOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {surveyOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "addSurvey" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("addSurvey"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Add Survey</span>
                </li>
                <li
                  className={activePage === "manageSurvey" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("manageSurvey"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Manage Survey</span>
                </li>
              </ul>
            )}

            {/* Poll Management Module */}
            <li
              className={`${activePage === "addPoll" || activePage === "pollSummary" ? "active-parent" : ""}`}
              onClick={() => setPollOpen(!pollOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <MessageSquare size={18} className="menu-icon" />
                <span>Poll Management</span>
              </div>
              {pollOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {pollOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "addPoll" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("addPoll"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Add Poll</span>
                </li>
                <li
                  className={activePage === "pollSummary" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("pollSummary"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Poll Summary</span>
                </li>
              </ul>
            )}

            {/* Lost & Found Module */}
            <li
              className={`${lostAndFoundOpen ? "active-parent" : ""}`}
              onClick={() => setLostAndFoundOpen(!lostAndFoundOpen)}
              style={{ cursor: "pointer" }}
            >
              <div className="menu-item-content">
                <Search size={18} className="menu-icon" />
                <span>Lost & Found</span>
              </div>
              {lostAndFoundOpen ? (
                <ChevronDown size={16} className="arrow-icon" />
              ) : (
                <ChevronRight size={16} className="arrow-icon" />
              )}
            </li>

            {lostAndFoundOpen && (
              <ul className="submenu-list">
                <li
                  className={activePage === "reportLostItem" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("reportLostItem"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Report Lost Item</span>
                </li>
                <li
                  className={activePage === "reportFoundItem" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("reportFoundItem"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Report Found Item</span>
                </li>
                <li
                  className={activePage === "manageLostAndFound" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("manageLostAndFound"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Manage Lost & Found</span>
                </li>
                <li
                  className={activePage === "claimVerification" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("claimVerification"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Claim & Verification</span>
                </li>
                <li
                  className={activePage === "lostAndFoundReport" ? "active-sub" : ""}
                  onClick={(e) => { e.stopPropagation(); setActivePage("lostAndFoundReport"); }}
                >
                  <div className="sub-dot"></div>
                  <span>Lost & Found Report</span>
                </li>
              </ul>
            )}

          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;