import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import "./attendanceGrid.css";
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon, Clock } from "lucide-react";

function AttendanceGrid() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [employees, setEmployees] = useState<any[]>([]);

    useEffect(() => {
        fetchMonthlyData();
    }, [currentMonth]);

    const fetchMonthlyData = async () => {
        try {
            setLoading(true);
            const monthStr = currentMonth.toISOString().slice(0, 7); // YYYY-MM
            const res = await axios.get(`${API_BASE}/attendance/monthly?month=${monthStr}`);

            setLogs(res.data.logs);

            // Extract unique employees from logs
            const uniqueEmps = new Map();
            res.data.logs.forEach((log: any) => {
                if (!uniqueEmps.has(log.employeeId)) {
                    uniqueEmps.set(log.employeeId, log.employee);
                }
            });
            setEmployees(Array.from(uniqueEmps.values()));

        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    // Calculate columns (days in month)
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const daysCount = getDaysInMonth(currentMonth);
    const dayColumns = Array.from({ length: daysCount }, (_, i) => i + 1);

    const getStatusForDay = (empId: number, day: number) => {
        const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const targetStr = targetDate.toISOString().split('T')[0];

        const log = logs.find(l =>
            l.employeeId === empId &&
            l.date.startsWith(targetStr)
        );

        if (!log) return { status: 'Absent', label: 'A', class: 'status-absent' };
        if (log.status === 'Present') return { status: 'Present', label: 'P', class: 'status-present', hours: log.totalHours };
        if (log.status === 'Half Day') return { status: 'Half Day', label: 'HD', class: 'status-half' };

        return { status: 'Absent', label: 'A', class: 'status-absent' };
    };

    return (
        <div className="attendance-grid-container fade-in">
            <div className="header-actions">
                <div>
                    <h2 className="page-title"><Clock size={22} /> Attendance Tracking</h2>
                    <p className="page-subtitle">Monthly timesheet overview</p>
                </div>

                <div className="month-selector">
                    <button onClick={prevMonth} className="btn-icon">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="current-month">
                        <CalendarIcon size={18} />
                        <span>
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <button onClick={nextMonth} className="btn-icon">
                        <ChevronRight size={20} />
                    </button>

                    <button className="btn-secondary" style={{ marginLeft: "1rem" }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading attendance data...</div>
            ) : employees.length === 0 ? (
                <div className="empty-state">No attendance records found for this month.</div>
            ) : (
                <div className="grid-scroll-wrapper">
                    <table className="attendance-table custom-table">
                        <thead>
                            <tr>
                                <th className="sticky-col">Employee</th>
                                {dayColumns.map(day => (
                                    <th key={day} className="day-col">{day}</th>
                                ))}
                                <th className="total-col">Total<br />Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => {
                                let totalPresent = 0;
                                return (
                                    <tr key={emp.employeeId}>
                                        <td className="sticky-col employee-cell">
                                            <div className="emp-info">
                                                <span className="emp-name">{emp.firstName} {emp.lastName}</span>
                                                <span className="emp-id">{emp.employeeId} • {emp.department}</span>
                                            </div>
                                        </td>

                                        {dayColumns.map(day => {
                                            const statusInfo = getStatusForDay(emp.employeeId, day);
                                            if (statusInfo.status === 'Present') totalPresent += 1;
                                            if (statusInfo.status === 'Half Day') totalPresent += 0.5;

                                            return (
                                                <td key={day} className="status-cell">
                                                    <div className={`status-badge ${statusInfo.class}`} title={`${statusInfo.status} ${statusInfo.hours ? `(${statusInfo.hours} hrs)` : ''}`}>
                                                        {statusInfo.label}
                                                    </div>
                                                </td>
                                            );
                                        })}

                                        <td className="total-col summary-cell">
                                            <strong>{totalPresent}</strong>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="legend-pills mt-4">
                <span className="pill status-present">P : Present</span>
                <span className="pill status-half">HD : Half Day</span>
                <span className="pill status-absent">A : Absent</span>
            </div>
        </div>
    );
}

export default AttendanceGrid;
