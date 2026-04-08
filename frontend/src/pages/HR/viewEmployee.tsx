import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import API_BASE from "../api";
import "./viewEmployee.css";

function ViewEmployee({ selectedEmployee, setActivePage }: any) {
  const [levels, setLevels] = useState<any[]>([]);
  const [levelHistory, setLevelHistory] = useState<any[]>([]);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignData, setAssignData] = useState({
    levelId: "",
    effectiveFrom: "",
    remarks: ""
  });

  const [showProfileChangeForm, setShowProfileChangeForm] = useState(false);
  const [changeRequestData, setChangeRequestData] = useState({
    changeType: "Contact Info",
    newData: ""
  });

  const fetchLevelData = async () => {
    if (!selectedEmployee) return;
    try {
      const dbId = selectedEmployee.dbId || selectedEmployee.id;
      const [levelsRes, historyRes] = await Promise.all([
        axios.get(`${API_BASE}/levels`),
        axios.get(`${API_BASE}/levels/${dbId}/history`)
      ]);
      setLevels(levelsRes.data);
      setLevelHistory(historyRes.data);
    } catch (error) {
      console.error("Failed to fetch level data:", error);
    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      fetchLevelData();
    }
  }, [selectedEmployee]);

  if (!selectedEmployee) {
    return (
      <div className="view-employee-container">
        <div className="view-header">
          <h2>Employee Details</h2>
          <button className="btn-back" onClick={() => setActivePage("employees")}>
            <ArrowLeft size={18} /> Back to Employees
          </button>
        </div>
        <div className="employee-card card-body" style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ color: "#64748b" }}>No Employee Selected</h2>
        </div>
      </div>
    );
  }

  const initial = selectedEmployee.firstName ? selectedEmployee.firstName.charAt(0).toUpperCase() : "?";

  const handleRemove = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      try {
        await axios.put(`${API_BASE}/employees/${id}/disable`);
        setActivePage("employees");
      } catch (error) {
        console.error("Failed to disable employee:", error);
        alert("Failed to remove employee.");
      }
    }
  };

  const handleAssignLevel = async () => {
    if (!assignData.levelId || !assignData.effectiveFrom) {
      return alert("Level and Effective Date are required.");
    }

    try {
      const dbId = selectedEmployee.dbId || selectedEmployee.id;
      await axios.post(`${API_BASE}/levels/assign`, {
        employeeId: dbId,
        levelId: parseInt(assignData.levelId),
        effectiveFrom: assignData.effectiveFrom,
        remarks: assignData.remarks
      });
      setShowAssignForm(false);
      setAssignData({ levelId: "", effectiveFrom: "", remarks: "" });
      fetchLevelData();
      // Wait for it to reflect, could update selectedEmployee optionally
    } catch (error: any) {
      alert(error.response?.data?.error || "Error assigning level");
    }
  };

  const handleRequestProfileChange = async () => {
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(changeRequestData.newData);
      } catch (e) {
        return alert("New Data must be valid JSON format");
      }

      const dbId = selectedEmployee.dbId || selectedEmployee.id;

      // Determine what oldData should be based on changeType
      let oldData: any = {};
      if (changeRequestData.changeType === "Contact Info") {
        oldData = {
          mobile: selectedEmployee.mobile,
          personalEmail: selectedEmployee.personalEmail,
          currentAddress: selectedEmployee.currentAddress
        };
      } else if (changeRequestData.changeType === "Bank Details") {
        oldData = {
          bankName: selectedEmployee.bankName,
          accountNo: selectedEmployee.accountNo,
          ifscCode: selectedEmployee.ifscCode
        };
      } else {
        oldData = { ...selectedEmployee };
      }

      await axios.post(`${API_BASE}/profile-changes`, {
        employeeId: dbId,
        changeType: changeRequestData.changeType,
        oldData,
        newData: parsedData
      });

      alert("Profile change request submitted successfully!");
      setShowProfileChangeForm(false);
      setChangeRequestData({ changeType: "Contact Info", newData: "" });
    } catch (error: any) {
      alert(error.response?.data?.error || "Error submitting change request");
    }
  };

  // Find current active level from history
  const currentActiveLevel = levelHistory.find(h => !h.effectiveTo);

  return (
    <div className="view-employee-container">
      <div className="view-header">
        <h2>Employee Profile</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-edit-view" onClick={() => setActivePage("addEmployee")} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
            <Edit size={16} /> Edit
          </button>
          <button className="btn-delete-view" onClick={() => handleRemove(selectedEmployee.employeeId || selectedEmployee.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
            <Trash2 size={16} /> Delete
          </button>
          <button className="btn-back" onClick={() => setActivePage("employees")}>
            <ArrowLeft size={18} /> Back to Directory
          </button>
        </div>
      </div>

      <div className="employee-card">
        {/* Top Gradient Banner */}
        <div className="card-header">
          <div className="avatar-placeholder">{initial}</div>
          <div className="header-info">
            <h3>{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
            <p>{selectedEmployee.designation}</p>
            <span className={`badge-status ${selectedEmployee.status === 'Active' ? 'active' : 'inactive'}`}>
              {selectedEmployee.status || "Ex-Employee"}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="card-body">
          <div className="info-grid">
            <div className="info-group">
              <label>Employee ID</label>
              <p>{selectedEmployee.employeeId || selectedEmployee.id}</p>
            </div>

            <div className="info-group">
              <label>Email Address</label>
              <p>{selectedEmployee.email || "—"}</p>
            </div>

            <div className="info-group">
              <label>Mobile Number</label>
              <p>{selectedEmployee.mobile || "—"}</p>
            </div>

            <div className="info-group">
              <label>Branch</label>
              <p>{selectedEmployee.branch || "—"}</p>
            </div>

            <div className="info-group">
              <label>Department</label>
              <p>{selectedEmployee.department || "—"}</p>
            </div>

            <div className="info-group">
              <label>Role / Designation</label>
              <p>{selectedEmployee.designation || "—"}</p>
            </div>

            <div className="info-group">
              <label>Current Level</label>
              <p style={{ fontWeight: '600', color: '#0f172a' }}>
                {currentActiveLevel ? currentActiveLevel.level.levelName : "No Level Assigned"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Assignment & History Section */}
      <div className="employee-card" style={{ marginTop: '20px' }}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Level Assignment & History</h3>
            <button
              onClick={() => setShowAssignForm(!showAssignForm)}
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              {showAssignForm ? "Cancel" : "Assign/Promote Level"}
            </button>
          </div>

          {showAssignForm && (
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Select Level</label>
                  <select
                    value={assignData.levelId}
                    onChange={e => setAssignData({ ...assignData, levelId: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="">-- Choose Level --</option>
                    {levels.filter(l => l.status === "Active").map(l => (
                      <option key={l.id} value={l.id}>{l.levelName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Effective Date</label>
                  <input
                    type="date"
                    value={assignData.effectiveFrom}
                    onChange={e => setAssignData({ ...assignData, effectiveFrom: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Remarks / Reason (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Annual Promotion"
                    value={assignData.remarks}
                    onChange={e => setAssignData({ ...assignData, remarks: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
              <button
                onClick={handleAssignLevel}
                style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                Save Assignment
              </button>
            </div>
          )}

          {/* History Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Level</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Effective From</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Effective To</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Remarks</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {levelHistory.map(history => (
                  <tr key={history.id}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: '500', color: '#334155' }}>
                      {history.level.levelName}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                      {new Date(history.effectiveFrom).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                      {history.effectiveTo ? new Date(history.effectiveTo).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      {history.remarks || "—"}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                      {!history.effectiveTo ? (
                        <span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>ACTIVE</span>
                      ) : (
                        <span style={{ padding: '4px 8px', background: '#f1f5f9', color: '#64748b', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>INACTIVE</span>
                      )}
                    </td>
                  </tr>
                ))}
                {levelHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                      No level history found for this employee.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profile Change Request Section */}
      <div className="employee-card" style={{ marginTop: '20px' }}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Need to update information?</h3>
            <button
              onClick={() => setShowProfileChangeForm(!showProfileChangeForm)}
              style={{ background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              {showProfileChangeForm ? "Cancel" : "Request Profile Change"}
            </button>
          </div>

          {showProfileChangeForm && (
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Profile changes require HR/Admin approval.</p>
              <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Change Category</label>
                  <select
                    value={changeRequestData.changeType}
                    onChange={e => setChangeRequestData({ ...changeRequestData, changeType: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Personal Info">Personal Info (Name, DOB, etc)</option>
                    <option value="Contact Info">Contact Info (Mobile, Address)</option>
                    <option value="Bank Details">Bank Details (High Risk)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Requested Changes (JSON Format)</label>
                  <textarea
                    placeholder='e.g. { "mobile": "+1234567890", "currentAddress": "New Street, City" }'
                    value={changeRequestData.newData}
                    onChange={e => setChangeRequestData({ ...changeRequestData, newData: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', minHeight: '120px', fontFamily: 'monospace' }}
                  />
                </div>
                <button
                  onClick={handleRequestProfileChange}
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', alignSelf: 'flex-start' }}>
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default ViewEmployee;