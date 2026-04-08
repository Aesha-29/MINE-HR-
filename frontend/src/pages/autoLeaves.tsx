import { useState, useEffect } from "react";
import axios from "axios";
import "./leave.css";
import { ShieldAlert, Trash2, Calendar, AlertTriangle } from "lucide-react";

import API_BASE from "../api";
const API = `${API_BASE}/leaves/auto`;

export default function AutoLeaves() {
    const [autoLeaves, setAutoLeaves] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState<any>(null);

    const load = () => {
        setLoading(true);
        axios.get(API).then(r => setAutoLeaves(r.data)).catch(() => { }).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to reverse this penalty/auto-leave?")) return;
        setMsg(null);
        try {
            await axios.delete(`${API}/${id}`);
            setMsg({ type: "success", text: "Auto-leave record deleted and reversed." });
            load();
        } catch (err: any) {
            setMsg({ type: "error", text: "Failed to delete the record." });
        }
    };

    return (
        <div className="lm-container lm-fade">
            <div className="lm-page-header">
                <div>
                    <h2 className="lm-page-title"><ShieldAlert size={22} className="text-orange-500" /> Auto-Deducted Leaves (Penalties)</h2>
                    <p className="lm-page-subtitle">Review leaves automatically deducted by the system due to shift late marks or absences.</p>
                </div>
            </div>

            {msg && (
                <div className={`lm-alert ${msg.type === "error" ? "lm-alert-error" : "lm-alert-success"} mb-4`}>
                    {msg.text}
                </div>
            )}

            {loading ? <div className="lm-loading">Loading penalty records...</div> : (
                <div className="lm-card p-0 overflow-hidden">
                    {autoLeaves.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-gray-800 font-semibold mb-2">No Penalties Found</h3>
                            <p className="text-gray-500">There are no auto-leaves or shift penalties on record.</p>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Employee</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Date Applied</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Deduction Rule</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b' }}>Days Deducted</th>
                                    <th style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b', textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {autoLeaves.map(a => (
                                    <tr key={a.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px 24px', fontWeight: '500' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    {a.employee?.firstName?.[0]}{a.employee?.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <div>{a.employee?.firstName} {a.employee?.lastName}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal' }}>{a.employee?.employeeId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}>
                                                <Calendar size={14} className="text-gray-400" />
                                                {a.leaveDate?.split("T")[0]}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span className="lm-badge lm-badge-orange">{a.ruleApplied || 'Late Mark Penalty'}</span>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <strong>{a.daysDeducted}</strong> days
                                        </td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                            <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors" title="Reverse Penalty">
                                                <Trash2 size={18} />
                                            </button>
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
