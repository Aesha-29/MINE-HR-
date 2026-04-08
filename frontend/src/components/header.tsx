import "./header.css";
import { useState, useEffect } from "react";
import { Bell, Shield, PanelLeftClose, Search } from "lucide-react";

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
    user?: any;
    onLogout?: () => void;
    notifications?: any[];
}

function Header({ toggleSidebar, isSidebarOpen, user, onLogout, notifications = [] }: HeaderProps) {
    const [placeholderText, setPlaceholderText] = useState("Search services...");
    const services = [
        "Search Employees...",
        "Search Payroll...",
        "Search Recruitment...",
        "Search Performance..."
    ];

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setPlaceholderText(services[index]);
            index = (index + 1) % services.length;
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowNotifications(false);
            setShowProfileMenu(false);
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header className="header">
            {/* Left Group: Sidebar Toggle + Search */}
            <div className="header-left">
                <button
                    className={`menu-toggle-btn ${!isSidebarOpen ? 'closed' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
                    aria-label="Toggle Sidebar"
                >
                    <div className="sidebar-toggle-box">
                        <PanelLeftClose
                            size={18}
                            className={`menu-icon-btn ${!isSidebarOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </button>

                {/* Search Bar - Rotates services */}
                <div className="search-container" onClick={(e) => e.stopPropagation()}>
                    <div className="search-bar-inner">
                        <Search size={18} className="search-icon-lucide" />
                        <input
                            type="text"
                            placeholder={placeholderText}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div className="header-spacer"></div>

            <div className="header-right">
                {/* Global Clock In / Out Widget */}
                {user && user.role !== "Admin" && (
                    <div className="clock-widget" style={{ display: 'flex', gap: '8px', marginRight: '24px', paddingLeft: '24px', borderLeft: '1px solid #e2e8f0' }}>
                        <button
                            style={{ padding: '8px 16px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={async () => {
                                try {
                                        await fetch('/api/attendance/clock-in', {
                                        method: 'POST',
                                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                                    });
                                    alert('Clocked In Successfully!');
                                } catch (e) {
                                    alert('Failed to clock in or already clocked in.');
                                }
                            }}
                        >
                            Clock In
                        </button>
                        <button
                            style={{ padding: '8px 16px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={async () => {
                                try {
                                        await fetch('/api/attendance/clock-out', {
                                        method: 'POST',
                                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                                    });
                                    alert('Clocked Out Successfully!');
                                } catch (e) {
                                    alert('Failed to clock out or already clocked out.');
                                }
                            }}
                        >
                            Clock Out
                        </button>
                    </div>
                )}

                {/* Notification Menu */}
                <div className="notifications-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="notifications" onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}>
                        <div className="bell-container">
                            <Bell size={20} className="bell-icon" />
                            {notifications.length > 0 && <div className="notification-dot"></div>}
                        </div>
                    </div>

                    {showNotifications && (
                        <div className="dropdown-menu notifications-dropdown">
                            <div className="dropdown-header">Notifications</div>
                            <div className="dropdown-items">
                                {notifications.length > 0 ? (
                                    notifications.map(n => (
                                        <div key={n.id} className="dropdown-item notification-item">
                                            <div className={`notification-status ${n.type}`} />
                                            <div className="notification-content">
                                                <p className="notification-text">{n.text}</p>
                                                <span className="notification-time">{n.time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="dropdown-item">No notifications</div>
                                )}
                            </div>
                            <div className="dropdown-footer">View All Notifications</div>
                        </div>
                    )}
                </div>

                {/* User Profile - Rightmost */}
                <div className="user-profile-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="user-profile-header" onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}>
                        <div className="user-avatar-header premium-dark">
                            <Shield size={20} color="white" />
                        </div>
                        <div className="user-info-text">
                            <span className="header-user-name">
                                {user ? user.name.toLowerCase() : "ash"}
                            </span>
                        </div>
                    </div>

                    {showProfileMenu && (
                        <div className="dropdown-menu profile-dropdown">
                            <div className="dropdown-items">
                                <div className="dropdown-item">
                                    <Shield size={16} /> <span>My Profile</span>
                                </div>
                                <div className="dropdown-item">
                                    <Bell size={16} /> <span>Settings</span>
                                </div>
                                <hr className="dropdown-divider" />
                                {onLogout && (
                                    <div className="dropdown-item logout-item" onClick={onLogout}>
                                        <span>Logout</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
