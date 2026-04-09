import React, { useEffect, useState } from "react";
import { Search, Filter, FileSpreadsheet, FileText, User, Shield, Monitor, Globe, Clock, AlertTriangle, Layers } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import { activityLogAPI } from "../../services/apiService";
import { toast } from "../../components/Toast";

const ActivityLogs: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const userOptions = Array.from(new Set(data.map((item) => item.user).filter(Boolean)));
  const moduleOptions = Array.from(new Set(data.map((item) => item.module).filter(Boolean)));
  const actionOptions = Array.from(new Set(data.map((item) => item.action).filter(Boolean)));

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await activityLogAPI.getAll();
        const rows = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
        setData(rows.map((row: any) => ({
          id: row.id,
          dateTime: row.dateTime ? new Date(row.dateTime).toLocaleString() : "--",
          user: row.user || "System",
          module: row.module || "General",
          action: row.action || "View",
          description: row.description || "--",
          ip: row.ip || "--",
          device: row.device || "--",
          by: row.by || "Self",
        })));
      } catch {
        toast.error("Failed to load activity logs");
        setData([]);
      }
    };

    loadLogs();
  }, []);

  return (
    <div className="main-content animate-fade-in">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
        <PageTitle title="Activity Logs" subtitle="Real-time system-wide activity tracking for audit and security monitoring" />
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-secondary shadow-sm">
            <FileSpreadsheet size={18} color="#16a34a" /> Excel
          </button>
          <button className="btn btn-secondary shadow-sm">
            <FileText size={18} color="#dc2626" /> PDF
          </button>
        </div>
      </div>

       <div className="glass-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
          <div>
            <label className="input-label">Date Range</label>
            <input type="date" className="input-modern" />
          </div>
          <div>
            <label className="input-label">User / Employee</label>
            <select className="select-modern">
               <option>All Users</option>
               {userOptions.map((user) => (
                <option key={user} value={user}>{user}</option>
               ))}
            </select>
          </div>
          <div>
            <label className="input-label">Module Filter</label>
            <select className="select-modern">
               <option>All Modules</option>
               {moduleOptions.map((moduleName) => (
                <option key={moduleName} value={moduleName}>{moduleName}</option>
               ))}
            </select>
          </div>
          <div>
            <label className="input-label">Action Type</label>
            <select className="select-modern">
               <option>All Actions</option>
               {actionOptions.map((action) => (
                <option key={action} value={action}>{action}</option>
               ))}
            </select>
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button className="btn btn-primary shadow-glow" style={{ width: "100%" }}>
              <Filter size={18} /> filter Logs
            </button>
          </div>
        </div>
      </div>

       <div className="glass-card">
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ position: "relative", width: "400px" }}>
               <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
               <input type="text" className="input-modern" placeholder="Search by description, IP or user..." style={{ paddingLeft: "40px" }} />
            </div>
             <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }}></div> Live Feed Active</span>
                <button className="btn btn-secondary shadow-sm" style={{ padding: "8px" }}><Layers size={16} /></button>
             </div>
         </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table-modern">
            <thead>
              <tr>
                <th>#</th>
                <th>Date & Time</th>
                <th>System User</th>
                <th>Module</th>
                <th>Action</th>
                <th>Activity Description</th>
                <th>Terminal IP</th>
                <th>Platform Device</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontSize: "13px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{item.dateTime}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                       <User size={14} color="var(--primary)" />
                       <span style={{ fontWeight: "700" }}>{item.user}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-primary" style={{ fontSize: "11px" }}>{item.module}</span></td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: "11px", fontWeight: "800", color: "#166534", background: "#f0fdf4" }}>
                       {item.action}
                    </span>
                  </td>
                  <td style={{ maxWidth: "250px", fontSize: "13px" }}>{item.description}</td>
                  <td style={{ fontSize: "12px", fontVariantNumeric: "tabular-nums" }}>{item.ip}</td>
                  <td>
                     <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)" }}>
                        <Monitor size={12} />
                        {item.device}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <div style={{ marginTop: "24px", padding: "16px", borderRadius: "12px", background: "rgba(220, 38, 38, 0.04)", border: "1px dashed rgba(220, 38, 38, 0.2)", display: "flex", alignItems: "center", gap: "12px", color: "#dc2626" }}>
         <AlertTriangle size={20} />
         <p style={{ fontSize: "13px", fontWeight: "600" }}>Important: System logs are retained for 365 days for compliance purposes. Deletions from this view do not purge permanent server-side backups.</p>
      </div>
    </div>
  );
};

export default ActivityLogs;
