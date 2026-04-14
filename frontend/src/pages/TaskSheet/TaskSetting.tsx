import { useEffect, useState } from "react";
import { CheckSquare, Save } from "lucide-react";
import { adminSettingsAPI } from "../../services/apiService";
import { toast } from "../../components/Toast";

type TaskConfig = {
  timelineModification: string;
  enablePriority: boolean;
  completedTaskEditable: boolean;
  hideFutureTask: boolean;
  dueDateAccess: string;
  approvalRequired: boolean;
  reminderMode: string;
  dependencyEnforced: boolean;
  visibility: string;
};

const defaultConfig: TaskConfig = {
  timelineModification: "Restricted Modification",
  enablePriority: true,
  completedTaskEditable: false,
  hideFutureTask: false,
  dueDateAccess: "Owner & Assignee",
  approvalRequired: true,
  reminderMode: "On Due Date",
  dependencyEnforced: true,
  visibility: "Team Only",
};

const TaskSetting = () => {
  const [config, setConfig] = useState<TaskConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminSettingsAPI.getTaskConfig();
        if (res?.data && typeof res.data === "object") {
          setConfig({ ...defaultConfig, ...(res.data as Partial<TaskConfig>) });
        }
      } catch {
        toast.info("Using default task settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await adminSettingsAPI.saveTaskConfig(config);
      toast.success("Task settings saved");
    } catch {
      toast.error("Failed to save task settings");
    }
  };

  if (loading) {
    return <div style={{ padding: 24 }}>Loading task settings...</div>;
  }

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ marginBottom: 16 }}>
        <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckSquare size={22} /> Task Setting
        </h1>
        <p className="page-subtitle">Configure global task behavior and persist settings to the backend database.</p>
      </div>

      <div className="glass-card" style={{ display: "grid", gap: 16, maxWidth: 840 }}>
        <div>
          <label className="input-label">Task Timeline Modification</label>
          <select className="select-modern" value={config.timelineModification} onChange={(e) => setConfig({ ...config, timelineModification: e.target.value })}>
            <option>No Modification</option>
            <option>Allow Modification</option>
            <option>Restricted Modification</option>
          </select>
        </div>

        <div>
          <label className="input-label">Due Date Revision Access</label>
          <select className="select-modern" value={config.dueDateAccess} onChange={(e) => setConfig({ ...config, dueDateAccess: e.target.value })}>
            <option>Only Admin</option>
            <option>Owner Only</option>
            <option>Owner & Assignee</option>
            <option>All Users</option>
          </select>
        </div>

        <div>
          <label className="input-label">Reminder Mode</label>
          <select className="select-modern" value={config.reminderMode} onChange={(e) => setConfig({ ...config, reminderMode: e.target.value })}>
            <option>1 Day Before</option>
            <option>3 Days Before</option>
            <option>On Due Date</option>
          </select>
        </div>

        <div>
          <label className="input-label">Visibility</label>
          <select className="select-modern" value={config.visibility} onChange={(e) => setConfig({ ...config, visibility: e.target.value })}>
            <option>Team Only</option>
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(220px,1fr))", gap: 12 }}>
          {[
            ["enablePriority", "Enable Task Priority"],
            ["completedTaskEditable", "Completed Task Editable"],
            ["hideFutureTask", "Hide Future Tasks"],
            ["approvalRequired", "Approval Required"],
            ["dependencyEnforced", "Dependency Enforced"],
          ].map(([key, label]) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <input
                type="checkbox"
                checked={(config as any)[key]}
                onChange={(e) => setConfig({ ...config, [key]: e.target.checked } as TaskConfig)}
              />
              {label}
            </label>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={save}><Save size={16} /> Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default TaskSetting;
