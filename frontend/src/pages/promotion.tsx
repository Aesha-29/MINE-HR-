import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import { Plus, ArrowRight, TrendingUp } from "lucide-react";
import "./promotion.css";

function Promotion() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [levels, setLevels] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: "",
        newDesignation: "",
        newLevelId: "",
        newSalary: "",
        performanceRating: "5",
        promotionDate: new Date().toISOString().split('T')[0],
        remarks: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [promoRes, empRes, levelRes] = await Promise.all([
                axios.get(`${API_BASE}/promotions`),
                axios.get(`${API_BASE}/employees`),
                axios.get(`${API_BASE}/levels`)
            ]);
            setPromotions(promoRes.data);
            setEmployees(empRes.data.filter((e: any) => e.status === "Active"));
            setLevels(levelRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmployeeChange = (empId: string) => {
        const selected = employees.find(e => e.id === parseInt(empId));
        if (selected) {
            setFormData({
                ...formData,
                employeeId: empId,
                newDesignation: selected.designation || "",
                newLevelId: selected.levelId ? selected.levelId.toString() : ""
            });
        }
    };

    const handleSubmit = async () => {
        if (!formData.employeeId) return alert("Select an employee");
        try {
            const combinedRemarks = `${formData.remarks} | New Salary: ₹${formData.newSalary || 'N/A'} | Rating: ${formData.performanceRating}/5`;
            await axios.post(`${API_BASE}/promotions`, {
                ...formData,
                remarks: combinedRemarks
            });
            setShowModal(false);
            fetchData();
            alert("Promotion recorded successfully!");
        } catch (error: any) {
            alert(error.response?.data?.error || "Failed to record promotion");
        }
    };

    return (
        <div className="promotion-container">
            <div className="promotion-header">
                <div>
                    <h2 className="page-title" style={{ marginBottom: '8px' }}>
                        <TrendingUp size={22} /> Employee Promotions
                    </h2>
                    <p className="p-desc">Track and record employee role and level advancements.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Record Promotion
                </button>
            </div>

            <div className="card-panel">
                {loading ? <p>Loading...</p> : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Designation Change</th>
                                <th>Level Change</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map(p => {
                                const prevLevel = levels.find(l => l.id === p.previousLevelId)?.levelName || "None";
                                const newLevel = levels.find(l => l.id === p.newLevelId)?.levelName || "None";
                                return (
                                    <tr key={p.id}>
                                        <td>
                                            <strong>{p.employee?.firstName} {p.employee?.lastName}</strong>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{p.employee?.employeeId}</div>
                                        </td>
                                        <td>{new Date(p.promotionDate).toLocaleDateString()}</td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{p.previousDesignation || "None"}</span>
                                            <ArrowRight size={14} className="change-arrow" />
                                            <span style={{ fontWeight: '500' }}>{p.newDesignation}</span>
                                        </td>
                                        <td>
                                            <span style={{ color: '#64748b' }}>{prevLevel}</span>
                                            <ArrowRight size={14} className="change-arrow" />
                                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>{newLevel}</span>
                                        </td>
                                        <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {p.remarks}
                                        </td>
                                    </tr>
                                );
                            })}
                            {promotions.length === 0 && (
                                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '30px' }}>No promotions recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Record Promotion</h3>
                        <p style={{ marginBottom: '20px', color: '#64748b', fontSize: '13px' }}>
                            Logging a promotion will automatically update the employee's designated role and log a level history transition.
                        </p>

                        <div className="form-group">
                            <label>Employee</label>
                            <select value={formData.employeeId} onChange={(e) => handleEmployeeChange(e.target.value)}>
                                <option value="">-- Select Employee --</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.employeeId})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>New Designation</label>
                                <input
                                    type="text"
                                    value={formData.newDesignation}
                                    onChange={e => setFormData({ ...formData, newDesignation: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Level</label>
                                <select value={formData.newLevelId} onChange={e => setFormData({ ...formData, newLevelId: e.target.value })}>
                                    <option value="">-- Unchanged --</option>
                                    {levels.map(l => (
                                        <option key={l.id} value={l.id}>{l.levelName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>New Salary (₹)</label>
                                <input
                                    type="number"
                                    value={formData.newSalary}
                                    onChange={e => setFormData({ ...formData, newSalary: e.target.value })}
                                    placeholder="Enter new amount"
                                />
                            </div>
                            <div className="form-group">
                                <label>Performance Rating (1-5)</label>
                                <select value={formData.performanceRating} onChange={e => setFormData({ ...formData, performanceRating: e.target.value })}>
                                    <option value="5">5 - Outstanding</option>
                                    <option value="4">4 - Exceeds Expectations</option>
                                    <option value="3">3 - Meets Expectations</option>
                                    <option value="2">2 - Needs Improvement</option>
                                    <option value="1">1 - Unsatisfactory</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>Effective Date</label>
                                <input
                                    type="date"
                                    value={formData.promotionDate}
                                    onChange={e => setFormData({ ...formData, promotionDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Remarks</label>
                                <textarea
                                    rows={1}
                                    value={formData.remarks}
                                    onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                                    placeholder="E.g. Annual Appraisal"
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSubmit}>Save Promotion</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Promotion;
