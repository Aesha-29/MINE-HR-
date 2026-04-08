import { useState, useEffect } from "react";
import axios from "axios";
import { 
    Layout, 
    Search, 
    Plus, 
    Edit, 
    Eye, 
    Trash2, 
    Settings, 
    CheckCircle, 
    AlertCircle, 
    ChevronLeft, 
    ChevronRight,
    ToggleLeft,
    ToggleRight
} from "lucide-react";
import API_BASE from "../api";

const API = `${API_BASE}/templates`;

interface TemplatesProps {
    setActivePage: (p: string) => void;
    setSelectedTemplate: (t: any) => void;
}

export default function Templates({ setActivePage, setSelectedTemplate }: TemplatesProps) {
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [msg, setMsg] = useState<any>(null);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}?search=${search}&page=${page}`);
            setTemplates(res.data.templates);
            setTotalPages(res.data.totalPages);
        } catch (err: any) {
            setMsg({ type: "error", text: "Failed to fetch templates." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, [page, search]);

    const handleToggleStatus = async (id: number) => {
        try {
            await axios.patch(`${API}/${id}/toggle`);
            setMsg({ type: "success", text: "Status updated successfully!" });
            fetchTemplates();
        } catch (err: any) {
            setMsg({ type: "error", text: "Failed to update status." });
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this template?")) return;
        try {
            await axios.delete(`${API}/${id}`);
            setMsg({ type: "success", text: "Template deleted successfully!" });
            fetchTemplates();
        } catch (err: any) {
            setMsg({ type: "error", text: "Failed to delete template." });
        }
    };

    const handleEdit = (t: any) => {
        setSelectedTemplate(t);
        setActivePage("editTemplate");
    };

    const handleManage = (t: any) => {
        setSelectedTemplate(t);
        setActivePage("manageTemplate");
    };

    return (
        <div className="lm-container lm-fade">
            <div className="lm-page-header">
                <div>
                    <h2 className="lm-page-title"><Layout size={22} /> Templates</h2>
                    <p className="lm-page-subtitle">Manage custom reporting templates for employees</p>
                </div>
                <button className="lm-btn-primary" onClick={() => { setSelectedTemplate(null); setActivePage("addTemplate"); }}>
                    <Plus size={16} /> Add New
                </button>
            </div>

            {msg && (
                <div className={`lm-alert ${msg.type === "error" ? "lm-alert-error" : "lm-alert-success"}`}>
                    {msg.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />} {msg.text}
                    <button className="lm-alert-close" onClick={() => setMsg(null)}>&times;</button>
                </div>
            )}

            <div className="lm-filter-row">
                <div className="lm-search-bar">
                    <Search size={15} color="#94a3b8" />
                    <input 
                        placeholder="Search templates by ID, name or type..." 
                        value={search} 
                        onChange={e => { setSearch(e.target.value); setPage(1); }} 
                    />
                </div>
            </div>

            <div className="lm-card">
                {loading ? <div className="lm-loading">Loading templates...</div> : (
                    <div className="lm-table-wrap">
                        <table className="lm-table">
                            <thead>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Template ID</th>
                                    <th>Template Type</th>
                                    <th>Name</th>
                                    <th>Need Reporting Person</th>
                                    <th>Action</th>
                                    <th>Allow Multiple</th>
                                    <th>Punch In Template</th>
                                    <th>Required on Punch Out</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.length === 0 ? (
                                    <tr><td colSpan={10} className="lm-empty">No templates found.</td></tr>
                                ) : (
                                    templates.map((t, idx) => (
                                        <tr key={t.id}>
                                            <td>{(page - 1) * 25 + idx + 1}</td>
                                            <td style={{ fontSize: "0.75rem", color: "#64748b" }}>{t.templateId?.slice(0, 8)}...</td>
                                            <td><span className="lm-badge lm-badge-info">{t.templateType}</span></td>
                                            <td style={{ fontWeight: 600 }}>{t.name}</td>
                                            <td>{t.needReportingPerson ? "Yes" : "No"}</td>
                                            <td>
                                                <div className="action-btn-group">
                                                    <button className="action-btn action-btn-edit" title="Edit" onClick={() => handleEdit(t)}>
                                                        <Edit size={16} color="#4f46e5" strokeWidth={2.25} />
                                                    </button>
                                                    <button 
                                                        className={`action-btn ${t.status === "Hidden" ? "action-btn-view" : "action-btn-success"}`} 
                                                        title={t.status === "Hidden" ? "Unhide" : "Hide"} 
                                                        onClick={() => handleToggleStatus(t.id)}
                                                    >
                                                        {t.status === "Hidden"
                                                            ? <ToggleLeft size={16} color="#0891b2" strokeWidth={2.25} />
                                                            : <ToggleRight size={16} color="#059669" strokeWidth={2.25} />}
                                                    </button>
                                                    <button className="action-btn action-btn-neutral" title="Manage Questions" onClick={() => handleManage(t)}>
                                                        <Settings size={16} color="#475569" strokeWidth={2.25} />
                                                    </button>
                                                    <button className="action-btn action-btn-view" title="View" onClick={() => { setSelectedTemplate(t); }}>
                                                        <Eye size={16} color="#0891b2" strokeWidth={2.25} />
                                                    </button>
                                                    <button className="action-btn action-btn-delete" title="Delete" onClick={() => handleDelete(t.id)}>
                                                        <Trash2 size={16} color="#e11d48" strokeWidth={2.25} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{t.allowMultiplePerShift ? "Yes" : "No"}</td>
                                            <td>{t.requiredOnPunchIn ? "Yes" : "No"}</td>
                                            <td>{t.requiredOnPunchOut}</td>
                                            <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {t.description || "—"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="lm-pagination">
                <div className="lm-pagination-info">
                    Showing {(page - 1) * 25 + 1} to {Math.min(page * 25, (templates.length + (page - 1) * 25))} of total entries
                </div>
                <div className="lm-pagination-btns">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={16} /></button>
                    <button className="active">{page}</button>
                    <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
}
