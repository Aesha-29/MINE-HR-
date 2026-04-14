import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { Globe, Plus, Edit2, Trash2, Search } from "lucide-react";
import API_BASE from "../api";

interface CountryRow {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function CountryList() {
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", status: "Active" as "Active" | "Inactive" });

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/geo/countries`);
      setCountries(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(term));
  }, [countries, search]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/geo/countries/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE}/geo/countries`, formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", status: "Active" });
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save country");
    }
  };

  const onEdit = (row: CountryRow) => {
    setEditingId(row.id);
    setFormData({ name: row.name, status: row.status });
    setShowForm(true);
  };

  const onDelete = async (id: number) => {
    if (!window.confirm("Delete this country?")) return;
    try {
      await axios.delete(`${API_BASE}/geo/countries/${id}`);
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete country");
    }
  };

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Globe size={22} /> Country List
          </h2>
          <p className="page-subtitle">Manage country master data used by geo and distribution modules.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: "", status: "Active" }); }}>
          <Plus size={16} /> Add Country
        </button>
      </div>

      {showForm && (
        <form className="glass-card" onSubmit={onSave} style={{ marginBottom: 16, maxWidth: 560 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 12 }}>
            <input
              className="input-modern"
              placeholder="Country name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <select
              className="select-modern"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      )}

      <div style={{ position: "relative", width: 320, marginBottom: 12 }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input className="input-modern" style={{ paddingLeft: 36 }} placeholder="Search countries..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="table-modern">
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.name}</td>
                <td><span className={`badge ${row.status === "Active" ? "badge-success" : "badge-secondary"}`}>{row.status}</span></td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8, minHeight: "unset", padding: "4px 8px" }} onClick={() => onEdit(row)}><Edit2 size={14} /></button>
                  <button className="btn btn-danger" style={{ minHeight: "unset", padding: "4px 8px" }} onClick={() => onDelete(row.id)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {loading && <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>Loading...</td></tr>}
            {!loading && filtered.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>No countries found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
