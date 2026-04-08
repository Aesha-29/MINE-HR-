import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import { CheckCircle, XCircle, Eye, Search, UserCog } from "lucide-react";
import "./profileChangeRequests.css";

interface EmployeeRef {
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    branch: string;
    department: string;
}

interface ProfileChangeRequest {
    id: number;
    employee: EmployeeRef;
    changeType: string;
    oldData: any;
    newData: any;
    riskLevel: string;
    status: string;
    createdAt: string;
    rejectionReason?: string;
    reviewedBy?: number;
}

function ProfileChangeRequests() {
    const [requests, setRequests] = useState<ProfileChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<ProfileChangeRequest | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    // Filters
    const [filterStatus, setFilterStatus] = useState("Pending");
    const [filterRisk, setFilterRisk] = useState("All");
    const [filterBranch, setFilterBranch] = useState("All");
    const [filterDepartment, setFilterDepartment] = useState("All");
    const [searchEmployee, setSearchEmployee] = useState("");

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/profile-changes?status=${filterStatus === 'All' ? '' : filterStatus}`);
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const handleApprove = async () => {
        if (!selectedRequest) return;
        try {
            await axios.put(`${API_BASE}/profile-changes/${selectedRequest.id}/approve`, {
                reviewedBy: 1 // TODO: Get logged in admin ID
            });
            alert("Request approved successfully");
            setSelectedRequest(null);
            fetchRequests();
        } catch (error: any) {
            alert(error.response?.data?.error || "Error approving request");
        }
    };

    const handleReject = async () => {
        if (!selectedRequest) return;
        if (!rejectionReason) return alert("Please provide a rejection reason");
        try {
            await axios.put(`${API_BASE}/profile-changes/${selectedRequest.id}/reject`, {
                reviewedBy: 1, // TODO: Get logged in admin ID
                rejectionReason
            });
            alert("Request rejected");
            setSelectedRequest(null);
            setRejectionReason("");
            fetchRequests();
        } catch (error: any) {
            alert(error.response?.data?.error || "Error rejecting request");
        }
    };

    // Helper: calculate if pending for > 2 days (SLA breach)
    const isSLABreached = (dateString: string, status: string) => {
        if (status !== 'Pending') return false;
        const requestedDate = new Date(dateString);
        const diffTime = Math.abs(new Date().getTime() - requestedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 2;
    };

    // Client-side filtering for other parameters
    const filteredRequests = requests.filter(req => {
        const matchesRisk = filterRisk === "All" || req.riskLevel === filterRisk;
        const matchesBranch = filterBranch === "All" || req.employee.branch === filterBranch;
        const matchesDept = filterDepartment === "All" || req.employee.department === filterDepartment;
        const matchesEmp = searchEmployee === "" ||
            `${req.employee.firstName} ${req.employee.lastName} ${req.employee.employeeId}`.toLowerCase().includes(searchEmployee.toLowerCase());

        return matchesRisk && matchesBranch && matchesDept && matchesEmp;
    });

    // Helper to render JSON diff beautifully
    const renderJSONDiff = (oldData: any, newData: any) => {
        const keys = new Set([...Object.keys(oldData || {}), ...Object.keys(newData || {})]);
        return (
            <table className="diff-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Old Value</th>
                        <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(keys).map(key => {
                        const oldVal = oldData?.[key];
                        const newVal = newData?.[key];
                        const isChanged = JSON.stringify(oldVal) !== JSON.stringify(newVal);

                        if (!isChanged) return null; // Only show changed fields

                        return (
                            <tr key={key} className={isChanged ? "highlight-change" : ""}>
                                <td>{key}</td>
                                <td className="old-val">{oldVal ? String(oldVal) : "-"}</td>
                                <td className="new-val">{newVal ? String(newVal) : "-"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    // Extract unique branches and departments for dropdowns
    const branches = Array.from(new Set(requests.map(r => r.employee.branch).filter(Boolean)));
    const departments = Array.from(new Set(requests.map(r => r.employee.department).filter(Boolean)));

    return (
        <div className="profile-change-container">
            <div style={{ marginBottom: '32px' }}>
                <h2 className="page-title" style={{ marginBottom: '8px' }}>
                    <UserCog size={22} /> Profile Change Requests
                </h2>
                <p style={{ color: '#64748b', margin: 0 }}>Review and approve employee profile updates.</p>
            </div>

            <div className="filters-grid">
                <div className="filter-group">
                    <label>Branch</label>
                    <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                        <option value="All">All Branches</option>
                        {branches.map((b: any) => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Department</label>
                    <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                        <option value="All">All Departments</option>
                        {departments.map((d: any) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Status</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="All">All Requests</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Risk Level</label>
                    <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}>
                        <option value="All">All Risks</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Employee Name or ID</label>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search name or ID..."
                            value={searchEmployee}
                            onChange={(e) => setSearchEmployee(e.target.value)}
                            style={{ width: '100%', paddingLeft: '36px', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                {loading ? (
                    <p style={{ textAlign: 'center', padding: '20px' }}>Loading requests...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Change Type</th>
                                <th>Risk Level</th>
                                <th>Requested On</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map(req => (
                                <tr key={req.id} className={isSLABreached(req.createdAt, req.status) ? "sla-breach-row" : ""}>
                                    <td>
                                        <div className="emp-info">
                                            <span className="emp-name">{req.employee.firstName} {req.employee.lastName}</span>
                                            <span className="emp-id">{req.employee.employeeId}</span>
                                        </div>
                                    </td>
                                    <td>{req.changeType}</td>
                                    <td>
                                        <span className={`risk-badge ${req.riskLevel.toLowerCase()}`}>
                                            {req.riskLevel}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(req.createdAt).toLocaleDateString()}
                                        {isSLABreached(req.createdAt, req.status) && (
                                            <span className="sla-alert" title="SLA Breached (>2 Days)"> ⚠️ SLA {Math.ceil(Math.abs(new Date().getTime() - new Date(req.createdAt).getTime()) / (1000 * 60 * 60 * 24))} Days</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${req.status.toLowerCase()}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="view-btn" onClick={() => setSelectedRequest(req)}>
                                            <Eye size={16} /> Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Review Modal */}
            {selectedRequest && (
                <div className="modal-overlay">
                    <div className="modal-content review-modal-content">
                        <div className="modal-header">
                            <h3>Review Change Request</h3>
                            <button className="close-btn" onClick={() => { setSelectedRequest(null); setRejectionReason(""); }}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="request-summary">
                                <p><strong>Employee:</strong> {selectedRequest.employee.firstName} {selectedRequest.employee.lastName} ({selectedRequest.employee.employeeId})</p>
                                <p><strong>Change Type:</strong> {selectedRequest.changeType}</p>
                                <p>
                                    <strong>Risk Level:</strong>
                                    <span className={`risk-badge ${selectedRequest.riskLevel.toLowerCase()}`} style={{ marginLeft: '10px' }}>
                                        {selectedRequest.riskLevel}
                                    </span>
                                </p>
                            </div>

                            <h4>Data Changes:</h4>
                            {renderJSONDiff(selectedRequest.oldData, selectedRequest.newData)}

                            <div className="audit-trail">
                                <h4>Audit Trail</h4>
                                <ul style={{ listStyleType: "none", padding: 0, fontSize: "13px", color: "#64748b" }}>
                                    <li><strong>Requested On:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</li>
                                    {selectedRequest.status !== "Pending" && (
                                        <li><strong>Reviewed By Admin ID:</strong> {selectedRequest.reviewedBy || "System"}</li>
                                    )}
                                </ul>
                            </div>

                            {selectedRequest.status === "Pending" && (
                                <div className="action-area">
                                    <textarea
                                        placeholder="Reason for rejection (Required if rejecting)..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                    />
                                    <div className="action-buttons">
                                        <button className="btn-approve" onClick={handleApprove}>
                                            <CheckCircle size={18} /> Approve & Apply
                                        </button>
                                        <button className="btn-reject" onClick={handleReject}>
                                            <XCircle size={18} /> Reject Request
                                        </button>
                                    </div>
                                </div>
                            )}

                            {selectedRequest.status === "Rejected" && (
                                <div className="rejection-note" style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "5px" }}>
                                    <strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileChangeRequests;
