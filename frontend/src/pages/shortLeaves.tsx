import { useState, useEffect } from "react";
import axios from "axios";
import "./leave.css";
import { Clock, AlertCircle } from "lucide-react";

import API_BASE from "../api";
const API = `${API_BASE}/leaves/short`;

export default function ShortLeaves() {
    const [leaves, setLeaves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);
        axios.get(API).then(r => setLeaves(r.data)).catch(() => { }).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    return (
        <div className="lm-container lm-fade">
            <div className="lm-page-header">
                <div>
                    <h2 className="lm-page-title"><Clock size={22} className="text-blue-500" /> Short Leaves (Hourly)</h2>
                    <p className="lm-page-subtitle">View hourly short leave requests and their statuses.</p>
                </div>
            </div>

            {!loading && leaves.length > 0 && (
                <div className="lm-stats-row mb-6">
                    <div className="lm-stat-card"><div className="lm-stat-label">Total Requests</div><div className="lm-stat-value">{leaves.length}</div></div>
                    <div className="lm-stat-card green"><div className="lm-stat-label">Approved</div><div className="lm-stat-value">{leaves.filter(l => l.status === "Approved").length}</div></div>
                    <div className="lm-stat-card orange"><div className="lm-stat-label">Pending</div><div className="lm-stat-value">{leaves.filter(l => l.status === "Pending").length}</div></div>
                    <div className="lm-stat-card red"><div className="lm-stat-label">Rejected</div><div className="lm-stat-value">{leaves.filter(l => l.status === "Rejected").length}</div></div>
                </div>
            )}

            {loading ? <div className="lm-loading">Loading short leaves...</div> : (
                <div className="lm-card p-0 overflow-hidden">
                    {leaves.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-gray-800 font-semibold mb-2">No Short Leaves</h3>
                            <p className="text-gray-500">There are no short hourly leave requests on record.</p>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Employee</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Date</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Time</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Reason</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map(l => (
                                    <tr key={l.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px 24px', fontWeight: '500' }}>
                                            {l.employee?.firstName} {l.employee?.lastName}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {l.date?.split("T")[0]}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {l.startTime} - {l.endTime}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {l.reason || "—"}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span className={`lm-badge ${l.status === 'Approved' ? 'lm-badge-green' : l.status === 'Rejected' ? 'lm-badge-red' : 'lm-badge-orange'}`}>
                                                {l.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
