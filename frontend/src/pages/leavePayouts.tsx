import { useState, useEffect } from "react";
import axios from "axios";
import "./leave.css";
import { DollarSign, AlertCircle } from "lucide-react";

import API_BASE from "../api";
const API = `${API_BASE}/leaves/payouts`;

export default function LeavePayouts() {
    const [payouts, setPayouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);
        axios.get(API).then(r => setPayouts(r.data)).catch(() => { }).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    return (
        <div className="lm-container lm-fade">
            <div className="lm-page-header">
                <div>
                    <h2 className="lm-page-title"><DollarSign size={22} className="text-green-500" /> Leave Payouts (Encashment)</h2>
                    <p className="lm-page-subtitle">View leave encashment requests and their statuses.</p>
                </div>
            </div>

            {!loading && payouts.length > 0 && (
                <div className="lm-stats-row mb-6">
                    <div className="lm-stat-card"><div className="lm-stat-label">Total Requests</div><div className="lm-stat-value">{payouts.length}</div></div>
                    <div className="lm-stat-card green"><div className="lm-stat-label">Approved</div><div className="lm-stat-value">{payouts.filter(p => p.status === "Approved").length}</div></div>
                    <div className="lm-stat-card orange"><div className="lm-stat-label">Pending</div><div className="lm-stat-value">{payouts.filter(p => p.status === "Pending").length}</div></div>
                    <div className="lm-stat-card red"><div className="lm-stat-label">Rejected</div><div className="lm-stat-value">{payouts.filter(p => p.status === "Rejected").length}</div></div>
                </div>
            )}

            {loading ? <div className="lm-loading">Loading payouts...</div> : (
                <div className="lm-card p-0 overflow-hidden">
                    {payouts.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-gray-800 font-semibold mb-2">No Leave Payouts</h3>
                            <p className="text-gray-500">There are no leave encashment requests on record.</p>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Employee</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Leave Type</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Days Encashed</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px 24px', fontWeight: '500' }}>
                                            {p.employee?.firstName} {p.employee?.lastName}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {p.leaveType?.name || 'Annual Leave'}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <strong>{p.days}</strong> days
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span className={`lm-badge ${p.status === 'Approved' ? 'lm-badge-green' : p.status === 'Rejected' ? 'lm-badge-red' : 'lm-badge-orange'}`}>
                                                {p.status}
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
