import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("overview");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) {
      navigate("/");
    } else {
      setUser(saved);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderContent = () => {
    if (!user) return null;

    switch (activePage) {
      case "overview":
        return (
          <div className="content-box">
            <h2>Welcome, {user.name || user.email}</h2>
            <p>
              You are logged in as <strong>{user.role.toUpperCase()}</strong>.
            </p>
          </div>
        );

      case "profile":
        return (
          <div className="content-box">
            <h3>Profile Information</h3>
            <p><b>Name:</b> {user.name || "N/A"}</p>
            <p><b>Date of Birth:</b> {user.dob || "N/A"}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        );

      case "settings":
        return (
          <div className="content-box">
            <h3>Settings</h3>
            <p>Change theme or update password (coming soon!)</p>
          </div>
        );

      default:
        return (
          <div className="content-box">
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar-glass">
        <div className="sidebar-header">
          <h2>{user?.role === "admin" ? "🛠️ Admin" : "👤 User"} Panel</h2>
        </div>

        <div className="sidebar-menu">
          <button
            className={activePage === "overview" ? "active" : ""}
            onClick={() => setActivePage("overview")}
          >
            Overview
          </button>
          <button
            className={activePage === "profile" ? "active" : ""}
            onClick={() => setActivePage("profile")}
          >
            Profile
          </button>
          <button
            className={activePage === "settings" ? "active" : ""}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
