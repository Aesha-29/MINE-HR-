import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import { Send, FileText } from "lucide-react";
import "./resignation.css";

function Resignation() {
    const [activeTab, setActiveTab] = useState("Submit");
    const [employees, setEmployees] = useState<any[]>([]);
    const [resignations, setResignations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Form
    const [formData, setFormData] = useState({
        employeeId: "",
        reason: "",
        noticePeriodDays: 30
    });

    // Review Modal
    const [selectedResignation, setSelectedResignation] = useState<any>(null);
    const [reviewRemarks, setReviewRemarks] = useState("");
    const [finalLwd, setFinalLwd] = useState("");

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "Submit") {
                const res = await axios.get(`${API_BASE}/employees`);
                setEmployees(res.data.filter((e: any) => e.status === "Active"));
            } else {
                const res = await axios.get(`${API_BASE}/resignations`);
                setResignations(res.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.employeeId || !formData.reason) return alert("All fields are required");
        try {
            await axios.post(`${API_BASE}/resignations`, formData);
            alert("Resignation Submitted Successfully");
            setFormData({ employeeId: "", reason: "", noticePeriodDays: 30 });
        } catch (error: any) {
            alert(error.response?.data?.error || "Submission failed");
        }
    };

    const handleApprove = async () => {
        try {
            await axios.put(`${API_BASE}/resignations/${selectedResignation.id}/approve`, {
                remarks: reviewRemarks,
                finalLastWorkingDate: finalLwd || selectedResignation.lastWorkingDate
            });
            alert("Resignation Approved. Offboarding checklist initiated.");
            setSelectedResignation(null);
            fetchData();
        } catch (error: any) {
            alert(error.response?.data?.error || "Approval failed");
        }
    };

    const handleReject = async () => {
        if (!reviewRemarks) return alert("Remarks are required for rejection");
        try {
            await axios.put(`${API_BASE}/resignations/${selectedResignation.id}/reject`, {
                remarks: reviewRemarks
            });
            alert("Resignation Rejected.");
            setSelectedResignation(null);
            fetchData();
        } catch (error: any) {
            alert(error.response?.data?.error || "Rejection failed");
        }
    };

    const renderSubmitTab = () => (
        <div className="card-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3>Submit Resignation</h3>
            <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Capture an employee's resignation intent. The system will auto-calculate the expected last working date based on notice period.
            </p>

            <div className="form-group">
                <label>Select Employee</label>
                <select value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })}>
                    <option value="">-- Choose Employee --</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.employeeId})</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Notice Period (Days)</label>
                <input type="number" value={formData.noticePeriodDays} onChange={e => setFormData({ ...formData, noticePeriodDays: parseInt(e.target.value) })} min="0" />
            </div>

            <div className="form-group">
                <label>Reason for Leaving</label>
                <textarea rows={4} value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} placeholder="State the reason..."></textarea>
            </div>

            <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Send size={18} /> Submit Resignation
            </button>
        </div>
    );

    const renderReviewTab = () => (
        <div className="card-panel">
            <h3>Resignation Requests</h3>
            {loading ? <p>Loading...</p> : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Date Submitted</th>
                            <th>Expected LWD</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resignations.map(r => (
                            <tr key={r.id}>
                                <td>
                                    <strong>{r.employee?.firstName} {r.employee?.lastName}</strong>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{r.employee?.employeeId}</div>
                                </td>
                                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(r.lastWorkingDate).toLocaleDateString()}</td>
                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.reason}</td>
                                <td><span className={`status-badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                                <td>
                                    <button
                                        className="btn-cancel"
                                        onClick={() => {
                                            setSelectedResignation(r);
                                            setReviewRemarks(r.remarks || "");
                                            setFinalLwd(new Date(r.lastWorkingDate).toISOString().split('T')[0]);
                                        }}
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {resignations.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No resignations found.</td></tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Review Modal */}
            {selectedResignation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Review Resignation</h3>
                        <p style={{ marginBottom: '10px' }}><strong>Employee:</strong> {selectedResignation.employee.firstName} {selectedResignation.employee.lastName}</p>
                        <p style={{ marginBottom: '10px' }}><strong>Reason:</strong> {selectedResignation.reason}</p>

                        {selectedResignation.status === "Pending" ? (
                            <>
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label>Confirm Last Working Date (LWD)</label>
                                    <input type="date" value={finalLwd} onChange={e => setFinalLwd(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>HR Remarks</label>
                                    <textarea rows={3} value={reviewRemarks} onChange={e => setReviewRemarks(e.target.value)} placeholder="Approval conditions or rejection reason..."></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn-cancel" onClick={() => setSelectedResignation(null)}>Cancel</button>
                                    <button className="btn-primary" onClick={handleApprove} style={{ background: '#10b981' }}>Approve (Start Offboarding)</button>
                                    <button className="btn-primary" onClick={handleReject} style={{ background: '#ef4444' }}>Reject</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p style={{ marginTop: '20px' }}><strong>Status:</strong> <span className={`status-badge ${selectedResignation.status.toLowerCase()}`}>{selectedResignation.status}</span></p>
                                <p><strong>Remarks:</strong> {selectedResignation.remarks || 'None'}</p>
                                <div className="modal-actions">
                                    <button className="btn-cancel" onClick={() => setSelectedResignation(null)}>Close</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="resignation-container">
            <h2 className="page-title" style={{ marginBottom: '24px' }}>
                <FileText size={22} /> Employee Resignation Module
            </h2>

            <div className="tabs-header">
                <button className={`tab-btn ${activeTab === "Submit" ? "active" : ""}`} onClick={() => setActiveTab("Submit")}>
                    Submit Request
                </button>
                <button className={`tab-btn ${activeTab === "Review" ? "active" : ""}`} onClick={() => setActiveTab("Review")}>
                    HR Review & Approvals
                </button>
            </div>

            {activeTab === "Submit" ? renderSubmitTab() : renderReviewTab()}
        </div>
    );
}

export default Resignation;
