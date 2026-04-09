import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, Monitor, Globe, Clock, AlertTriangle, ShieldCheck, User, LogOut, Power } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import { activityLogAPI } from "../../services/apiService";
import { toast } from "../../components/Toast";

const SessionLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await activityLogAPI.getAll();
        const rows = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
        setLogs(rows);
      } catch {
        toast.error("Failed to load session logs");
        setLogs([]);
      }
    };

    load();
  }, []);

  const data = useMemo(() => {
    return logs
      .filter((log: any) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          String(log.user || "").toLowerCase().includes(q) ||
          String(log.ip || "").toLowerCase().includes(q) ||
          String(log.device || "").toLowerCase().includes(q)
        );
      })
      .map((log: any) => ({
        id: log.id,
        user: log.user || "System",
        login: log.dateTime ? new Date(log.dateTime).toLocaleString() : "--",
        logout: "--",
        ip: log.ip || "--",
        device: log.device || "Unknown",
        duration: "--",
        status: String(log.action || "").toLowerCase().includes("logout") ? "Logged Out" : "Active",
      }));
  }, [logs, search]);

  return (
    <div className="main-content animate-fade-in">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
        <PageTitle title="Session Logs" subtitle="Security monitoring for active and historical user login sessions" />
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-danger shadow-glow">
            <Power size={18} /> Force Logout All Sessions
          </button>
        </div>
      </div>

       <div className="glass-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <div>
            <label className="input-label">Search User</label>
            <input type="text" className="input-modern" placeholder="E.g., Ash Master" />
          </div>
          <div>
            <label className="input-label">Date Filter</label>
            <input type="date" className="input-modern" />
          </div>
          <div>
            <label className="input-label">Session Status</label>
            <select className="select-modern">
               <option>All Statuses</option>
               <option>Active</option>
               <option>Logged Out</option>
               <option>Expired</option>
            </select>
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button className="btn btn-primary shadow-glow" style={{ width: "100%" }}>
              <Filter size={18} /> Apply Filter
            </button>
          </div>
        </div>
      </div>

       <div className="glass-card">
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ position: "relative", width: "400px" }}>
               <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input type="text" className="input-modern" placeholder="Search by IP, Device or Name..." style={{ paddingLeft: "40px" }} value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
             <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span className="badge badge-success" style={{ gap: "6px", fontSize: "10px" }}><ShieldCheck size={12} /> MFA Enforcement Active</span>
                <span className="badge badge-primary" style={{ gap: "6px", fontSize: "10px" }}>Total {data.length} Units</span>
             </div>
         </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table-modern">
            <thead>
              <tr>
                <th>#</th>
                <th>System User</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Terminal IP</th>
                <th>Platform Device</th>
                <th>Session Duration</th>
                <th>Access Status</th>
                <th>Force</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                       <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px" }}>{item.user.split(' ').map((n: string) => n[0]).join('')}</div>
                       <span style={{ fontWeight: "700" }}>{item.user}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{item.login}</td>
                  <td style={{ fontSize: "12px", color: item.status === "Active" ? "var(--success)" : "var(--text-muted)", fontWeight: item.status === "Active" ? "600" : "400" }}>{item.logout}</td>
                  <td style={{ fontSize: "12px", fontVariantNumeric: "tabular-nums" }}>{item.ip}</td>
                  <td>
                     <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)" }}>
                        <Monitor size={12} />
                        {item.device}
                     </div>
                  </td>
                  <td style={{ fontWeight: "700", fontSize: "13px" }}>{item.duration}</td>
                  <td>
                    <span className={`badge ${
                      item.status === "Active" ? "badge-success" : 
                      item.status === "Logged Out" ? "badge-gray" : "badge-danger"
                    }`} style={{ gap: "6px" }}>
                      {item.status === "Active" ? <ShieldCheck size={12} /> : null}
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "Active" && (
                       <button className="btn btn-secondary" style={{ padding: "6px", color: "var(--danger)" }} title="Terminate Session Profile"><LogOut size={14} /></button>
                    )}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>No session logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

       <div style={{ marginTop: "24px", padding: "16px", borderRadius: "12px", background: "rgba(79, 70, 229, 0.04)", border: "1px dashed rgba(79, 70, 229, 0.2)", display: "flex", alignItems: "center", gap: "12px", color: "var(--primary)" }}>
         <AlertTriangle size={20} />
         <p style={{ fontSize: "13px", fontWeight: "600" }}>Pro Feature: Multiple concurrent login attempts from different IPs within 1 hour globally will trigger a security lock.</p>
      </div>
    </div>
  );
};

export default SessionLogs;
