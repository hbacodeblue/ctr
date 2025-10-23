import React, { useState } from "react";
import { 
  FaHome, 
  FaChartBar, 
  FaProjectDiagram, 
  FaCog, 
  FaHeadset, 
  FaUsers, 
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaCrown,
  FaRocket,
  FaShieldAlt,
  FaCogs,
  FaQuestionCircle,
  FaMoon,
  FaSun,
  FaFileAlt,
  FaExclamationTriangle,
  FaMousePointer,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";

const Sidebar = ({ role, onPageChange }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const handleItemClick = (itemName, hasSubmenu = false) => {
    if (hasSubmenu) {
      setExpandedSubmenu(expandedSubmenu === itemName ? null : itemName);
      return;
    }
    
    setActiveItem(itemName);
    
    // Map menu items to page names for admin
    if (role === "admin") {
      const pageMap = {
        "Dashboard": "dashboard",
        "Users": "users",
        "Add New User": "add-user",
        "Error Logs": "error-logs",
        "Main Logs": "main-logs", 
        "Click Logs": "click-logs",
        "Version": "version",
        "Analytics": "analytics",
        "Projects": "projects",
        "Security": "security",
        "System": "system",
        "2FA Auth": "2fa-auth",
        "Alerts": "alerts",
        "Settings": "settings"
      };
      
      if (onPageChange && pageMap[itemName]) {
        onPageChange(pageMap[itemName]);
      }
    }
    
    // Add haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const userMenuItems = [
    { icon: FaHome, text: "Dashboard", badge: null },
    { icon: FaChartBar, text: "Analytics", badge: "New" },
    { icon: FaProjectDiagram, text: "Projects", badge: "3" },
    { icon: FaBell, text: "Notifications", badge: "5" },
    { icon: FaUserCircle, text: "Profile", badge: null },
    { icon: FaCog, text: "Settings", badge: null },
    { icon: FaQuestionCircle, text: "Help", badge: null }
  ];

  const adminMenuItems = [
    { icon: FaCrown, text: "Dashboard", badge: null },
    { icon: FaUsers, text: "Users", badge: "1.2K" },
        { icon: FaCogs, text: "Add New User", badge: "99%" },
    { icon: FaChartBar, text: "Logs", badge: "Live", hasSubmenu: true, submenu: [
      { icon: FaExclamationTriangle, text: "Error Logs", badge: "12" },
      { icon: FaFileAlt, text: "Main Logs", badge: "1.2K" },
      { icon: FaMousePointer, text: "Click Logs", badge: "89" }
    ]},
    { icon: FaRocket, text: "2FA Auth", badge: "89" },
    { icon: FaShieldAlt, text: "Version", badge: null }

    // { icon: FaBell, text: "Alerts", badge: "3" },
    // { icon: FaCog, text: "Settings", badge: null }
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div 
      className={`sidebar-expandable ${isDarkMode ? 'dark' : ''}`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header-expandable">
        <div className="sidebar-logo">
          <div className="logo-icon">
            {role === "admin" ? <FaCrown /> : <FaUserCircle />}
          </div>
          <div className="logo-text">
            <h2>{role === "admin" ? "Admin Panel" : "User Panel"}</h2>
            <span className="role-text">
              {role === "admin" ? "System Administrator" : "Team Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu-expandable">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <div 
                className={`menu-item ${activeItem === item.text ? 'active' : ''}`}
                onClick={() => handleItemClick(item.text, item.hasSubmenu)}
              >
                <div className="menu-icon">
                  <item.icon />
                </div>
                <div className="menu-content">
                  <span className="menu-text">{item.text}</span>
                  <div className="menu-right">
                    {item.badge && (
                      <span className="menu-badge-expandable">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu && (
                      <span className="submenu-arrow">
                        {expandedSubmenu === item.text ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Submenu */}
              {item.hasSubmenu && expandedSubmenu === item.text && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li 
                      key={subIndex}
                      className={`submenu-item ${activeItem === subItem.text ? 'active' : ''}`}
                      onClick={() => handleItemClick(subItem.text)}
                    >
                      <div className="submenu-icon">
                        <subItem.icon />
                      </div>
                      <div className="submenu-content">
                        <span className="submenu-text">{subItem.text}</span>
                        {subItem.badge && (
                          <span className="submenu-badge">
                            {subItem.badge}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className="sidebar-footer-expandable">
        {/* Dark Mode Toggle */}
        <div 
          className="menu-item"
          onClick={toggleDarkMode}
        >
          <div className="menu-icon">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
          <div className="menu-content">
            <span className="menu-text">Toggle Theme</span>
          </div>
        </div>

        {/* Logout Button */}
        <div 
          className="menu-item logout-item"
          onClick={handleLogout}
        >
          <div className="menu-icon">
            <FaSignOutAlt />
          </div>
          <div className="menu-content">
            <span className="menu-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
