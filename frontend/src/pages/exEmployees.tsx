import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import { Eye, Edit, RotateCcw, History } from "lucide-react";
import "./exEmployees.css";

interface ExEmployee {
  id: string; // our mapped ID for rendering
  employeeId: string; // real ID
  firstName: string;
  lastName: string;
  designation: string;
  branch: string;
  department: string;
  exitDate: string;
  reason: string;
  eligibleForRehire: boolean;
}

function ExEmployees({ setActivePage, setSelectedEmployee }: any) {

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [exitFilter, setExitFilter] = useState("");

  const [employees, setEmployees] = useState<ExEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE}/exemployees`);
      if (!Array.isArray(response.data)) {
        console.error("Expected array but got:", response.data);
        return;
      }
      const mapped = response.data.map((emp: any) => ({
        ...emp,
        id: emp.employeeId, // Use employeeId as ID
        exitDate: emp.exitDate ? emp.exitDate.split('T')[0] : "N/A"
      }));
      setEmployees(mapped);
    } catch (error) {
      console.error("Error fetching ex-employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExEmployees();
  }, []);

  const handleReactivate = async (id: string) => {
    if (window.confirm("Are you sure you want to reactivate this employee?")) {
      try {
        await axios.put(`${API_BASE}/employees/${id}/reactivate`);
        fetchExEmployees();
      } catch (error) {
        console.error("Failed to reactivate employee:", error);
        alert("Failed to reactivate employee.");
      }
    }
  };

  const filteredEmployees = employees.filter(emp =>
    (
      (emp.firstName && emp.firstName.toLowerCase().includes(search.toLowerCase())) ||
      (emp.lastName && emp.lastName.toLowerCase().includes(search.toLowerCase())) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase())
    ) &&
    (exitFilter === "" || emp.reason === exitFilter)
  );

  return (
    <div className="ex-container">

      <h2 className="page-title" style={{ marginBottom: '24px' }}>
        <History size={22} /> Ex Employees
      </h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total</h4>
          <p>{employees.length}</p>
        </div>
        <div className="card">
          <h4>Eligible for Rehire</h4>
          <p>{employees.filter(e => e.eligibleForRehire).length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Filter by Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Filter by Year</option>
          <option>2024</option>
          <option>2025</option>
        </select>

        <select value={exitFilter} onChange={(e) => setExitFilter(e.target.value)}>
          <option value="">Exit Type</option>
          <option>Resigned</option>
          <option>Terminated</option>
          <option>Retired</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Loading Ex-Employees...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Exit Date</th>
                <th>Reason</th>
                <th>Eligible for Rehire</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.employeeId}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.department}</td>
                  <td>{emp.exitDate}</td>
                  <td>
                    <span className={`badge`}>
                      {emp.reason || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${emp.eligibleForRehire ? "completed" : "terminated"}`}>
                      {emp.eligibleForRehire ? "Yes" : "No"}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button
                      className="btn-icon btn-view"
                      title="View Employee"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setActivePage("viewEmployee");
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-icon btn-edit"
                      title="Edit Employee"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setActivePage("addEmployee");
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon renew-btn"
                      title="Rehire Employee"
                      onClick={() => handleReactivate(emp.employeeId)}
                    >
                      <RotateCcw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>No Ex-Employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default ExEmployees;