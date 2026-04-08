import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import { UserCheck, Loader2 } from "lucide-react";
import { toast } from "../components/Toast";
import "./onboarding.css";

interface OnboardingProps {
  addNotification: (text: string, type?: "success" | "info" | "warning" | "error") => void;
}

function Onboarding({ addNotification }: OnboardingProps) {

  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    designation: "",
    branch: "",
    doj: "",
    status: "Pending",
    branchAccess: "",
    departmentAccess: ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // Validation
    if (!employee.employeeId.trim()) {
      toast.error("Employee ID is required.");
      return;
    }
    if (!employee.name.trim()) {
      toast.error("Full Name is required.");
      return;
    }
    if (!employee.designation.trim()) {
      toast.error("Designation is required.");
      return;
    }
    if (!employee.branch) {
      toast.error("Please select a branch.");
      return;
    }

    setSaving(true);
    try {
      // 1. Create the Employee officially in the database
      let [firstName, ...lastNameArr] = employee.name.split(" ");
      let lastName = lastNameArr.join(" ");

      await axios.post(`${API_BASE}/employees`, {
        employeeId: employee.employeeId,
        firstName: firstName || employee.name,
        lastName: lastName || "",
        designation: employee.designation || "New Hire",
        branch: employee.branch || "Head Office",
        department: employee.departmentAccess || "General",
        doj: employee.doj || new Date().toISOString().split('T')[0],
        email: `${employee.employeeId}@company.com`,
        mobile: "0000000000",
        status: employee.status === "Completed" ? "Active" : "Onboarding",
      });

      // 2. Save Onboarding Metadata
      await axios.post(`${API_BASE}/onboarding`, {
        employeeId: employee.employeeId,
        status: employee.status,
        documentsSubmitted: true, // Simplified for this demo
        trainingCompleted: true,
        orientationDone: true,
      });
      toast.success("Onboarding Details Saved & Employee Created Successfully! ✅");
      addNotification(`New Employee Onboarded: ${employee.name}`, "success");
    } catch (error: any) {
      console.error("Error saving onboarding:", error);
      toast.error(error.response?.data?.message || "Failed to save onboarding details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="onboarding-container">

      <div className="onboarding-header">
        <h2 className="page-title">
          <UserCheck size={22} /> Employee Onboarding
        </h2>

        <span className={`status-badge ${employee.status.toLowerCase()}`}>
          {employee.status}
        </span>
      </div>

      {/* ================= EMPLOYEE SUMMARY ================= */}
      <div className="onboarding-card">
        <h3>Employee Summary</h3>

        <div className="grid">

          <div className="input-group">
            <label>Employee ID</label>
            <input
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="input-group">
            <label>Designation</label>
            <input
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              placeholder="Enter Designation"
            />
          </div>

          <div className="input-group">
            <label>Branch</label>
            <select
              name="branch"
              value={employee.branch}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              <option>Head Office</option>
              <option>Rajkot</option>
              <option>Surat</option>
              <option>Mumbai</option>
            </select>
          </div>

          <div className="input-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="doj"
              value={employee.doj}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Status</label>
            <select
              name="status"
              value={employee.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Failed</option>
            </select>
          </div>

        </div>
      </div>

      {/* ================= DOCUMENT VERIFICATION ================= */}
      <div className="onboarding-card">
        <h3>Document Verification</h3>

        <div className="grid">
          <div className="input-group">
            <label>ID Proof Upload</label>
            <input type="file" />
          </div>

          <div className="input-group">
            <label>Resume Upload</label>
            <input type="file" />
          </div>

          <div className="input-group">
            <label>Offer Letter Upload</label>
            <input type="file" />
          </div>
        </div>

        <label className="checkbox-label">
          <input type="checkbox" />
          Policy & Company Terms Accepted
        </label>
      </div>

      {/* ================= ACCESS CONTROL ================= */}
      <div className="onboarding-card">
        <h3>Access Control Setup</h3>

        <div className="grid">

          <div className="input-group">
            <label>Employee Panel Access</label>
            <select>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="input-group">
            <label>Manager/Admin Role</label>
            <select>
              <option>None</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label>Branch Access</label>
            <select
              name="branchAccess"
              value={employee.branchAccess}
              onChange={handleChange}
            >
              <option value="">Select Branch Access</option>
              <option>Head Office</option>
              <option>Rajkot</option>
              <option>Surat</option>
              <option>Mumbai</option>
              <option>All Branches</option>
            </select>
          </div>

          <div className="input-group">
            <label>Department Access</label>
            <select
              name="departmentAccess"
              value={employee.departmentAccess}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option>HR</option>
              <option>IT</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Operations</option>
            </select>
          </div>

        </div>
      </div>

      {/* ================= FINAL SECTION ================= */}
      <div className="onboarding-card final-section">

        <label className="checkbox-label">
          <input type="checkbox" />
          Send Welcome Email
        </label>

        <label className="checkbox-label">
          <input type="checkbox" />
          Send WhatsApp Welcome
        </label>

        <button type="button" onClick={handleSave} disabled={saving} className="save-btn">
          {saving ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : "Save Onboarding Details"}
        </button>

      </div>

    </div>
  );
}

export default Onboarding;