import React, { useEffect, useMemo, useState } from "react";
import { MapPin, Smartphone, SmartphoneNfc, Clock, User, CheckCircle2, TrendingUp, Search, Filter, Layers } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import { activityLogAPI } from "../../services/apiService";
import { toast } from "../../components/Toast";

const EmployeeLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const employeeOptions = Array.from(new Set(logs.map((log: any) => log.user || "System").filter(Boolean)));

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await activityLogAPI.getAll();
        const rows = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
        setLogs(rows);
      } catch {
        toast.error("Failed to load employee logs");
        setLogs([]);
      }
    };

    loadLogs();
  }, []);

  const data = useMemo(() => {
    return logs
      .filter((log: any) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          String(log.user || "").toLowerCase().includes(q) ||
          String(log.action || "").toLowerCase().includes(q) ||
          String(log.module || "").toLowerCase().includes(q) ||
          String(log.description || "").toLowerCase().includes(q)
        );
      })
      .map((log: any) => ({
        id: log.id,
        dateTime: log.dateTime ? new Date(log.dateTime).toLocaleString() : "--",
        employee: log.user || "System",
        activity: log.action || "Activity",
        location: log.module || "General",
        device: log.device || "Unknown Device",
        details: log.description || "--",
      }));
  }, [logs, query]);

  return (
    <div className="main-content animate-fade-in">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
        <PageTitle title="Employee Logs (Field Activity)" subtitle="Track real-time employee activities, especially from mobile and on-field usage" />
        <div style={{ display: "flex", gap: "10px" }}>
           <button className="btn btn-secondary shadow-sm">
            <MapPin size={18} color="var(--primary)" /> View Map Feed
          </button>
        </div>
      </div>

       <div className="glass-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <div>
            <label className="input-label">Select Employee</label>
            <select className="select-modern">
               <option>All Field Personnel</option>
               {employeeOptions.map((employee) => (
                <option key={employee} value={employee}>{employee}</option>
               ))}
            </select>
          </div>
          <div>
            <label className="input-label">Date Filter</label>
            <input type="date" className="input-modern" />
          </div>
          <div>
            <label className="input-label">Activity Type</label>
            <select className="select-modern">
               <option>All Activities</option>
               <option>Punch In/Out</option>
               <option>Visit Start/End</option>
               <option>Order/Expense</option>
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
              <input type="text" className="input-modern" placeholder="Search by activity, location or details..." style={{ paddingLeft: "40px" }} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
             <div style={{ display: "flex", gap: "12px" }}>
                <span className="badge badge-success" style={{ gap: "6px", fontSize: "10px" }}><SmartphoneNfc size={12} /> Mobile Logs Live</span>
                <span className="badge badge-primary" style={{ gap: "6px", fontSize: "10px" }}><Layers size={12} /> Total {data.length} Units</span>
             </div>
         </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table-modern">
            <thead>
              <tr>
                <th>#</th>
                <th>Date Time</th>
                <th>Field Employee</th>
                <th>Captured Activity</th>
                <th>GPS Location / Pin</th>
                <th>Handheld Device</th>
                <th>Detailed Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{item.dateTime}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                       <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px" }}>{item.employee.split(' ').map((n: string) => n[0]).join('')}</div>
                       <span style={{ fontWeight: "700" }}>{item.employee}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary" style={{ padding: "4px 10px", fontSize: "11px", fontWeight: "800" }}>
                        {item.activity}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontSize: "13px", fontWeight: "600" }}>
                       <MapPin size={14} />
                       {item.location}
                    </div>
                  </td>
                  <td>
                     <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)" }}>
                        <Smartphone size={12} />
                        {item.device}
                     </div>
                  </td>
                  <td style={{ fontSize: "13px" }}>{item.details}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>No employee logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogs;
