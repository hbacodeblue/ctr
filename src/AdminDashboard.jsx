import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaDollarSign, 
  FaHeartbeat,
  FaCogs,
  FaUserPlus,
  FaChartBar,
  FaExclamationTriangle,
  FaCrown,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSearch,
  FaFilter,
  FaFileAlt,
  FaMousePointer,
  FaDatabase,
  FaBuilding,
  FaInfoCircle,
  FaArrowUp,
  FaEnvelope,
  FaTasks,
  FaClock,
  FaCalendarAlt,
  FaTag,
  FaServer,
  FaChartLine,
  FaClipboardCheck,
  FaShieldAlt,
  FaBell,
  FaQrcode,
  FaRocket,
  FaKey,
  FaArrowLeft,
  FaPlus,
  FaSync,
  FaUserCircle
} from "react-icons/fa";
import QRCode from 'qrcode';

const AdminDashboard = () => {
  const userEmail = localStorage.getItem("userEmail") || "admin@example.com";
  const [activePage, setActivePage] = useState("dashboard");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [showApply2FAModal, setShowApply2FAModal] = useState(false);
  const [showLogDetailsModal, setShowLogDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    isActive: true,
    isSuperAdmin: false,
    isAdmin: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [apply2FAEmail, setApply2FAEmail] = useState("");
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active"
  });

  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joinDate: "2024-01-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user", status: "inactive", joinDate: "2024-02-01" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "user", status: "active", joinDate: "2024-02-10" },
    { id: 5, name: "David Brown", email: "david@example.com", role: "user", status: "active", joinDate: "2024-02-15" },
    { id: 6, name: "Lisa Davis", email: "lisa@example.com", role: "user", status: "inactive", joinDate: "2024-02-20" },
    { id: 7, name: "Tom Miller", email: "tom@example.com", role: "user", status: "active", joinDate: "2024-03-01" },
    { id: 8, name: "Amy Garcia", email: "amy@example.com", role: "user", status: "active", joinDate: "2024-03-05" }
  ]);

  // Generate QR code when selectedUser changes
  useEffect(() => {
    if (selectedUser?.email) {
      QRCode.toDataURL(selectedUser.email, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(setQrCodeDataUrl).catch(console.error);
    }
  }, [selectedUser]);

  const handleAddUser = () => {
    if (newUser.email && newUser.password) {
      // Determine role based on permissions
      let role = "user";
      if (newUser.isSuperAdmin) {
        role = "super-admin";
      } else if (newUser.isAdmin) {
        role = "admin";
      }
      
      const user = {
        id: users.length + 1,
        name: newUser.email.split('@')[0], // Use email prefix as name
        email: newUser.email,
        role: role,
        status: newUser.isActive ? "active" : "inactive",
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, user]);
      setNewUser({ email: "", password: "", isActive: true, isSuperAdmin: false, isAdmin: false });
      setShowPassword(false);
      setShowAddUserModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // User action handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      password: "", // Empty password field for editing
      role: user.role,
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    if (editUser.email) {
      const updatedUser = {
        ...selectedUser,
        email: editUser.email,
        role: editUser.role,
        status: editUser.status
      };
      
      // Only update password if a new one is provided
      if (editUser.password && editUser.password.trim() !== "") {
        updatedUser.password = editUser.password;
      }
      
      setUsers(users.map(user => 
        user.id === selectedUser.id ? updatedUser : user
      ));
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleViewQRCode = (user) => {
    setSelectedUser(user);
    setShowQRCodeModal(true);
  };

  const handleApply2FA = () => {
    setShowApply2FAModal(true);
  };

  const handleApply2FAEmailChange = (e) => {
    setApply2FAEmail(e.target.value);
  };

  const handleConfirmApply2FA = () => {
    if (apply2FAEmail.trim()) {
      // Here you would typically make an API call to apply 2FA
      console.log('Applying 2FA for:', apply2FAEmail);
      setShowApply2FAModal(false);
      setApply2FAEmail("");
    }
  };

  const handleViewLogDetails = () => {
    setShowLogDetailsModal(true);
  };

  const renderDashboardContent = () => (
    <>
      <h1> Main Logs</h1>
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
          <div className="stat-icon orange">
            <FaProjectDiagram />
          </div>
          <div className="stat-content">
            <div className="stat-label">Main Logs</div>
            <div className="stat-value">8422383</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="warning-icon">⚠</span>
              <span className="warning-text">Total Logs</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Error Rate</div>
            <div className="stat-value">1.05%</div>
             <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="warning-icon">⚠</span>
              <span className="warning-text">Total Error %</span>
            </div>
            <div className="stat-footer">
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header green">
            <div className="chart-container">
              <svg className="chart-svg" viewBox="0 0 400 150">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid-admin1" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-admin1)" />
                
                {/* Chart line */}
                <path d="M 40,91.2 L 97.8,79.2 L 155.6,103.2 L 213.4,79.2 L 271.2,64.8 L 329,76.8 L 386.8,28.8" 
                      fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      className="chart-line"/>
                
                {/* Data points */}
                <circle cx="40" cy="91.2" r="4" fill="white" className="chart-point" style={{animationDelay: '0.2s'}}/>
                <circle cx="97.8" cy="79.2" r="4" fill="white" className="chart-point" style={{animationDelay: '0.4s'}}/>
                <circle cx="155.6" cy="103.2" r="4" fill="white" className="chart-point" style={{animationDelay: '0.6s'}}/>
                <circle cx="213.4" cy="79.2" r="4" fill="white" className="chart-point" style={{animationDelay: '0.8s'}}/>
                <circle cx="271.2" cy="64.8" r="4" fill="white" className="chart-point" style={{animationDelay: '1.0s'}}/>
                <circle cx="329" cy="76.8" r="4" fill="white" className="chart-point" style={{animationDelay: '1.2s'}}/>
                <circle cx="386.8" cy="28.8" r="4" fill="white" className="chart-point" style={{animationDelay: '1.4s'}}/>
                
                {/* Y-axis labels */}
                <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">10</text>
                <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">20</text>
                <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">30</text>
                <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">40</text>
                
                {/* X-axis labels */}
                <text x="40" y="145" fill="white" fontSize="12" textAnchor="middle">M</text>
                <text x="97.8" y="145" fill="white" fontSize="12" textAnchor="middle">T</text>
                <text x="155.6" y="145" fill="white" fontSize="12" textAnchor="middle">W</text>
                <text x="213.4" y="145" fill="white" fontSize="12" textAnchor="middle">T</text>
                <text x="271.2" y="145" fill="white" fontSize="12" textAnchor="middle">F</text>
                <text x="329" y="145" fill="white" fontSize="12" textAnchor="middle">S</text>
                <text x="386.8" y="145" fill="white" fontSize="12" textAnchor="middle">S</text>
              </svg>
            </div>
          </div>
          <div className="chart-content">
            <h4>Total Visitors in 30 Days</h4>
            <p><span className="increase">↑ 55%</span> increase in today sales.</p>
            <div className="chart-divider"></div>
            <div className="chart-footer">
              <span className="clock-icon">🕐</span>
              <span>updated 4 minutes ago</span>
            </div>
          </div>
        </div>

        

        <div className="chart-card">
          <div className="chart-header blue">
            <div className="chart-container">
              <svg className="chart-svg" viewBox="0 0 400 150">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid-admin3" width="40" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-admin3)" />
                
                {/* Area chart */}
                <path d="M 40,100 L 97.8,80 L 155.6,60 L 213.4,70 L 271.2,50 L 329,40 L 386.8,30 L 386.8,120 L 40,120 Z" 
                      fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" className="chart-area"/>
                
                {/* Data points */}
                <circle cx="40" cy="100" r="3" fill="white" className="chart-point" style={{animationDelay: '0.2s'}}/>
                <circle cx="97.8" cy="80" r="3" fill="white" className="chart-point" style={{animationDelay: '0.4s'}}/>
                <circle cx="155.6" cy="60" r="3" fill="white" className="chart-point" style={{animationDelay: '0.6s'}}/>
                <circle cx="213.4" cy="70" r="3" fill="white" className="chart-point" style={{animationDelay: '0.8s'}}/>
                <circle cx="271.2" cy="50" r="3" fill="white" className="chart-point" style={{animationDelay: '1.0s'}}/>
                <circle cx="329" cy="40" r="3" fill="white" className="chart-point" style={{animationDelay: '1.2s'}}/>
                <circle cx="386.8" cy="30" r="3" fill="white" className="chart-point" style={{animationDelay: '1.4s'}}/>
                
                {/* Y-axis labels */}
                <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">25</text>
                <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">50</text>
                <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">75</text>
                <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">100</text>
                
                {/* X-axis labels */}
                <text x="40" y="145" fill="white" fontSize="12" textAnchor="middle">Q1</text>
                <text x="97.8" y="145" fill="white" fontSize="12" textAnchor="middle">Q2</text>
                <text x="155.6" y="145" fill="white" fontSize="12" textAnchor="middle">Q3</text>
                <text x="213.4" y="145" fill="white" fontSize="12" textAnchor="middle">Q4</text>
                <text x="271.2" y="145" fill="white" fontSize="12" textAnchor="middle">Q1</text>
                <text x="329" y="145" fill="white" fontSize="12" textAnchor="middle">Q2</text>
                <text x="386.8" y="145" fill="white" fontSize="12" textAnchor="middle">Q3</text>
              </svg>
            </div>
          </div>
          <div className="chart-content">
            <h4>Total Clicks in 30 Days</h4>
            <p><span className="increase">↑ 23%</span> growth this quarter</p>
            <div className="chart-divider"></div>
            <div className="chart-footer">
              <span className="clock-icon">🕐</span>
              <span>updated 1 hour ago</span>
            </div>
          </div>
          </div>
        </div>

        {/* Product Clicks Section */}
        <h1>Product Clicks</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">
              <FaChartBar />
            </div>
            <div className="stat-content">
              <div className="stat-label">Click Through Rate</div>
              <div className="stat-value">4.7%</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="trend-icon">📈</span>
                <span className="footer-text">+0.8% improvement</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <FaProjectDiagram />
            </div>
            <div className="stat-content">
              <div className="stat-label">Top Product</div>
              <div className="stat-value">iPhone 15</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="trend-icon">📈</span>
                <span className="footer-text">23,456 clicks</span>
              </div>
            </div>
          </div>
        </div>




        {/* Product Clicks Charts Section */}
        <div className="product-charts-section">
          <div className="product-chart-card">
            <div className="product-chart-header green">
              <div className="product-chart-container">
                <svg className="product-chart-svg" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="product-grid-1" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#product-grid-1)" />
                  
                  {/* Chart line */}
                  <path d="M 40,120 L 97.8,100 L 155.6,80 L 213.4,60 L 271.2,40 L 329,30 L 386.8,20" 
                        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        className="product-chart-line"/>
                  
                  {/* Data points */}
                  <circle cx="40" cy="120" r="4" fill="white" className="product-chart-point" style={{animationDelay: '0.2s'}}/>
                  <circle cx="97.8" cy="100" r="4" fill="white" className="product-chart-point" style={{animationDelay: '0.4s'}}/>
                  <circle cx="155.6" cy="80" r="4" fill="white" className="product-chart-point" style={{animationDelay: '0.6s'}}/>
                  <circle cx="213.4" cy="60" r="4" fill="white" className="product-chart-point" style={{animationDelay: '0.8s'}}/>
                  <circle cx="271.2" cy="40" r="4" fill="white" className="product-chart-point" style={{animationDelay: '1.0s'}}/>
                  <circle cx="329" cy="30" r="4" fill="white" className="product-chart-point" style={{animationDelay: '1.2s'}}/>
                  <circle cx="386.8" cy="20" r="4" fill="white" className="product-chart-point" style={{animationDelay: '1.4s'}}/>
                  
                  {/* Y-axis labels */}
                  <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                  <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">25</text>
                  <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">50</text>
                  <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">75</text>
                  <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">100</text>
                  
                  {/* X-axis labels */}
                  <text x="40" y="145" fill="white" fontSize="12" textAnchor="middle">Mon</text>
                  <text x="97.8" y="145" fill="white" fontSize="12" textAnchor="middle">Tue</text>
                  <text x="155.6" y="145" fill="white" fontSize="12" textAnchor="middle">Wed</text>
                  <text x="213.4" y="145" fill="white" fontSize="12" textAnchor="middle">Thu</text>
                  <text x="271.2" y="145" fill="white" fontSize="12" textAnchor="middle">Fri</text>
                  <text x="329" y="145" fill="white" fontSize="12" textAnchor="middle">Sat</text>
                  <text x="386.8" y="145" fill="white" fontSize="12" textAnchor="middle">Sun</text>
                </svg>
              </div>
            </div>
            <div className="product-chart-content">
              <h4>Product Click Trends (7 Days)</h4>
              <p><span className="product-increase">↑ 28%</span> increase in product clicks.</p>
              <div className="product-chart-divider"></div>
              <div className="product-chart-footer">
                <span className="product-clock-icon">🕐</span>
                <span>updated 2 minutes ago</span>
              </div>
            </div>
          </div>

          <div className="product-chart-card">
            <div className="product-chart-header blue">
              <div className="product-chart-container">
                <svg className="product-chart-svg" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="product-grid-2" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#product-grid-2)" />
                  
                  {/* Bar chart */}
                  <rect x="50" y="100" width="20" height="50" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.1s'}}/>
                  <rect x="80" y="80" width="20" height="70" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.2s'}}/>
                  <rect x="110" y="90" width="20" height="60" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.3s'}}/>
                  <rect x="140" y="70" width="20" height="80" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.4s'}}/>
                  <rect x="170" y="85" width="20" height="65" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.5s'}}/>
                  <rect x="200" y="75" width="20" height="75" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.6s'}}/>
                  <rect x="230" y="95" width="20" height="55" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.7s'}}/>
                  <rect x="260" y="65" width="20" height="85" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.8s'}}/>
                  <rect x="290" y="55" width="20" height="95" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '0.9s'}}/>
                  <rect x="320" y="45" width="20" height="105" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '1.0s'}}/>
                  <rect x="350" y="35" width="20" height="115" fill="rgba(255,255,255,0.8)" className="product-chart-bar" style={{animationDelay: '1.1s'}}/>
                  
                  {/* Y-axis labels */}
                  <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                  <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">500</text>
                  <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">1000</text>
                  <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">1500</text>
                  <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">2000</text>
                  
                  {/* X-axis labels */}
                  <text x="60" y="145" fill="white" fontSize="10" textAnchor="middle">P1</text>
                  <text x="90" y="145" fill="white" fontSize="10" textAnchor="middle">P2</text>
                  <text x="120" y="145" fill="white" fontSize="10" textAnchor="middle">P3</text>
                  <text x="150" y="145" fill="white" fontSize="10" textAnchor="middle">P4</text>
                  <text x="180" y="145" fill="white" fontSize="10" textAnchor="middle">P5</text>
                  <text x="210" y="145" fill="white" fontSize="10" textAnchor="middle">P6</text>
                  <text x="240" y="145" fill="white" fontSize="10" textAnchor="middle">P7</text>
                  <text x="270" y="145" fill="white" fontSize="10" textAnchor="middle">P8</text>
                  <text x="300" y="145" fill="white" fontSize="10" textAnchor="middle">P9</text>
                  <text x="330" y="145" fill="white" fontSize="10" textAnchor="middle">P10</text>
                  <text x="360" y="145" fill="white" fontSize="10" textAnchor="middle">P11</text>
                </svg>
              </div>
            </div>
            <div className="product-chart-content">
              <h4>Top Products Performance</h4>
              <p>Product click distribution across categories</p>
              <div className="product-chart-divider"></div>
              <div className="product-chart-footer">
                <span className="product-clock-icon">🕐</span>
                <span>updated 5 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
           {/* Error Logs Section */}
         <h1>Error Logs</h1>
         <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon red">
              <FaChartBar />
            </div>
            <div className="stat-content">
              <div className="stat-label">Click Through Rate</div>
              <div className="stat-value">4.7%</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="trend-icon">📈</span>
                <span className="footer-text">+0.8% improvement</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">
              <FaProjectDiagram />
            </div>
            <div className="stat-content">
              <div className="stat-label">Top Product</div>
              <div className="stat-value">iPhone 15</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="trend-icon">📈</span>
                <span className="footer-text">23,456 clicks</span>
              </div>
            </div>
          </div>
         </div>

         {/* Error Logs Charts Section */}
         <div className="error-charts-section">
           <div className="error-chart-card">
             <div className="error-chart-header red">
               <div className="error-chart-container">
                 <svg className="error-chart-svg" viewBox="0 0 400 150">
                   {/* Grid lines */}
                   <defs>
                     <pattern id="error-grid-1" width="40" height="30" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                     </pattern>
                   </defs>
                   <rect width="100%" height="100%" fill="url(#error-grid-1)" />
                   
                   {/* Chart line */}
                   <path d="M 40,140 L 97.8,120 L 155.6,100 L 213.4,80 L 271.2,60 L 329,40 L 386.8,20" 
                         fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                         className="error-chart-line"/>
                   
                   {/* Data points */}
                   <circle cx="40" cy="140" r="4" fill="white" className="error-chart-point" style={{animationDelay: '0.2s'}}/>
                   <circle cx="97.8" cy="120" r="4" fill="white" className="error-chart-point" style={{animationDelay: '0.4s'}}/>
                   <circle cx="155.6" cy="100" r="4" fill="white" className="error-chart-point" style={{animationDelay: '0.6s'}}/>
                   <circle cx="213.4" cy="80" r="4" fill="white" className="error-chart-point" style={{animationDelay: '0.8s'}}/>
                   <circle cx="271.2" cy="60" r="4" fill="white" className="error-chart-point" style={{animationDelay: '1.0s'}}/>
                   <circle cx="329" cy="40" r="4" fill="white" className="error-chart-point" style={{animationDelay: '1.2s'}}/>
                   <circle cx="386.8" cy="20" r="4" fill="white" className="error-chart-point" style={{animationDelay: '1.4s'}}/>
                   
                   {/* Y-axis labels */}
                   <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                   <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">20</text>
                   <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">40</text>
                   <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">60</text>
                   <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">80</text>
                   
                   {/* X-axis labels */}
                   <text x="40" y="145" fill="white" fontSize="12" textAnchor="middle">Jan</text>
                   <text x="97.8" y="145" fill="white" fontSize="12" textAnchor="middle">Feb</text>
                   <text x="155.6" y="145" fill="white" fontSize="12" textAnchor="middle">Mar</text>
                   <text x="213.4" y="145" fill="white" fontSize="12" textAnchor="middle">Apr</text>
                   <text x="271.2" y="145" fill="white" fontSize="12" textAnchor="middle">May</text>
                   <text x="329" y="145" fill="white" fontSize="12" textAnchor="middle">Jun</text>
                   <text x="386.8" y="145" fill="white" fontSize="12" textAnchor="middle">Jul</text>
                 </svg>
               </div>
             </div>
             <div className="error-chart-content">
               <h4>Error Trends (7 Months)</h4>
               <p><span className="error-decrease">↓ 15%</span> decrease in error rates.</p>
               <div className="error-chart-divider"></div>
               <div className="error-chart-footer">
                 <span className="error-clock-icon">🕐</span>
                 <span>updated 3 minutes ago</span>
               </div>
             </div>
           </div>

           <div className="error-chart-card">
             <div className="error-chart-header orange">
               <div className="error-chart-container">
                 <svg className="error-chart-svg" viewBox="0 0 400 150">
                   {/* Grid lines */}
                   <defs>
                     <pattern id="error-grid-2" width="40" height="30" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                     </pattern>
                   </defs>
                   <rect width="100%" height="100%" fill="url(#error-grid-2)" />
                   
                   {/* Area chart */}
                   <path d="M 40,130 L 97.8,110 L 155.6,90 L 213.4,70 L 271.2,50 L 329,30 L 386.8,10 L 386.8,140 L 40,140 Z" 
                         fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" className="error-chart-area"/>
                   
                   {/* Data points */}
                   <circle cx="40" cy="130" r="3" fill="white" className="error-chart-point" style={{animationDelay: '0.2s'}}/>
                   <circle cx="97.8" cy="110" r="3" fill="white" className="error-chart-point" style={{animationDelay: '0.4s'}}/>
                   <circle cx="155.6" cy="90" r="3" fill="white" className="error-chart-point" style={{animationDelay: '0.6s'}}/>
                   <circle cx="213.4" cy="70" r="3" fill="white" className="error-chart-point" style={{animationDelay: '0.8s'}}/>
                   <circle cx="271.2" cy="50" r="3" fill="white" className="error-chart-point" style={{animationDelay: '1.0s'}}/>
                   <circle cx="329" cy="30" r="3" fill="white" className="error-chart-point" style={{animationDelay: '1.2s'}}/>
                   <circle cx="386.8" cy="10" r="3" fill="white" className="error-chart-point" style={{animationDelay: '1.4s'}}/>
                   
                   {/* Y-axis labels */}
                   <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                   <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">25</text>
                   <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">50</text>
                   <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">75</text>
                   <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">100</text>
                   
                   {/* X-axis labels */}
                   <text x="40" y="145" fill="white" fontSize="12" textAnchor="middle">E1</text>
                   <text x="97.8" y="145" fill="white" fontSize="12" textAnchor="middle">E2</text>
                   <text x="155.6" y="145" fill="white" fontSize="12" textAnchor="middle">E3</text>
                   <text x="213.4" y="145" fill="white" fontSize="12" textAnchor="middle">E4</text>
                   <text x="271.2" y="145" fill="white" fontSize="12" textAnchor="middle">E5</text>
                   <text x="329" y="145" fill="white" fontSize="12" textAnchor="middle">E6</text>
                   <text x="386.8" y="145" fill="white" fontSize="12" textAnchor="middle">E7</text>
                 </svg>
               </div>
             </div>
             <div className="error-chart-content">
               <h4>Error Categories Analysis</h4>
               <p>Error distribution across different categories</p>
               <div className="error-chart-divider"></div>
               <div className="error-chart-footer">
                 <span className="error-clock-icon">🕐</span>
                 <span>updated 7 minutes ago</span>
               </div>
             </div>
           </div>
         </div>

      </>
    );

  const renderUsersContent = () => (
    <>
      {/* Users Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaUsers />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+5 this month</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaUserPlus />
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Users</div>
            <div className="stat-value">{users.filter(u => u.status === 'active').length}</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="calendar-icon">📅</span>
              <span className="footer-text">Online now</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Inactive Users</div>
            <div className="stat-value">{users.filter(u => u.status === 'inactive').length}</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="warning-icon">⚠</span>
              <span className="warning-text">Need attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Management Section */}
      <div className="users-section">
        <div className="users-header">
          <h2><FaUsers style={{ marginRight: '8px' }} />User Management</h2>
          <div className="users-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search users..." />
            </div>
            <button className="filter-btn">
              <FaFilter style={{ marginRight: '8px' }} />
              Filter
            </button>
            <button className="add-user-btn" onClick={() => setShowAddUserModal(true)}>
              <FaUserPlus style={{ marginRight: '8px' }} />
              Add User
            </button>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn" 
                        title="View"
                        onClick={() => handleViewUser(user)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Log page rendering functions
  const renderErrorLogsContent = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon red">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Critical Errors</div>
            <div className="stat-value">12</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="warning-icon">⚠</span>
              <span className="warning-text">Need attention</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Warnings</div>
            <div className="stat-value">45</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+3 today</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Logs</div>
            <div className="stat-value">1.2K</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="calendar-icon">📅</span>
              <span className="footer-text">Last 24h</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Resolved</div>
            <div className="stat-value">89%</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+5% this week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section admin-section">
        <div className="log-dates-header">
          <h2><FaCalendarAlt style={{ marginRight: '8px' }} />Available Log Dates</h2>
          <div className="log-dates-controls">
            <div className="top-n-selector">
              <label>Top N</label>
              <select>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search dates..." />
            </div>
          </div>
        </div>
        
        <div className="log-dates-table-container">
          <table className="log-dates-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Date</th>
                <th>Log Entries</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="serial-badge">1</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 23, 2025</div>
                    <div className="date-day">Thursday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    65221
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">2</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 22, 2025</div>
                    <div className="date-day">Wednesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    211233
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">3</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 21, 2025</div>
                    <div className="date-day">Tuesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    186295
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">4</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 20, 2025</div>
                    <div className="date-day">Monday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    112653
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">5</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 19, 2025</div>
                    <div className="date-day">Sunday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    40331
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">6</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 18, 2025</div>
                    <div className="date-day">Saturday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    212727
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderMainLogsContent = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <div className="stat-label">System Logs</div>
            <div className="stat-value">2.4K</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+12% today</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Success Rate</div>
            <div className="stat-value">98.5%</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+0.2% this week</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <div className="stat-label">Avg Response</div>
            <div className="stat-value">245ms</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📉</span>
              <span className="footer-text">-15ms improvement</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Failed Requests</div>
            <div className="stat-value">23</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="warning-icon">⚠</span>
              <span className="warning-text">Need review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section admin-section">
        <div className="log-dates-header">
          <h2><FaCalendarAlt style={{ marginRight: '8px' }} />Available Log Dates</h2>
          <div className="log-dates-controls">
            <div className="top-n-selector">
              <label>Top N</label>
              <select>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search dates..." />
            </div>
          </div>
        </div>
        
        <div className="log-dates-table-container">
          <table className="log-dates-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Date</th>
                <th>Log Entries</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="serial-badge">1</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 23, 2025</div>
                    <div className="date-day">Thursday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    125432
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">2</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 22, 2025</div>
                    <div className="date-day">Wednesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    98765
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">3</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 21, 2025</div>
                    <div className="date-day">Tuesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    156789
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">4</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 20, 2025</div>
                    <div className="date-day">Monday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    203456
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">5</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 19, 2025</div>
                    <div className="date-day">Sunday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    87654
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">6</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 18, 2025</div>
                    <div className="date-day">Saturday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaFileAlt className="log-icon" />
                    234567
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderClickLogsContent = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaMousePointer />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Clicks</div>
            <div className="stat-value">89.2K</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+15% today</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <div className="stat-label">Unique Users</div>
            <div className="stat-value">1.2K</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+8% this week</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <FaMousePointer />
          </div>
          <div className="stat-content">
            <div className="stat-label">Avg Session</div>
            <div className="stat-value">4.2m</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📈</span>
              <span className="footer-text">+0.3m longer</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Bounce Rate</div>
            <div className="stat-value">23%</div>
            <div className="stat-divider"></div>
            <div className="stat-footer">
              <span className="trend-icon">📉</span>
              <span className="footer-text">-2% improvement</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section admin-section">
        <div className="log-dates-header">
          <h2><FaCalendarAlt style={{ marginRight: '8px' }} />Available Log Dates</h2>
          <div className="log-dates-controls">
            <div className="top-n-selector">
              <label>Top N</label>
              <select>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search dates..." />
            </div>
          </div>
        </div>
        
        <div className="log-dates-table-container">
          <table className="log-dates-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Date</th>
                <th>Log Entries</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="serial-badge">1</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 23, 2025</div>
                    <div className="date-day">Thursday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    45678
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">2</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 22, 2025</div>
                    <div className="date-day">Wednesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    67890
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">3</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 21, 2025</div>
                    <div className="date-day">Tuesday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    34567
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">4</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 20, 2025</div>
                    <div className="date-day">Monday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    78901
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">5</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 19, 2025</div>
                    <div className="date-day">Sunday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    23456
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td><span className="serial-badge">6</span></td>
                <td>
                  <div className="date-info">
                    <div className="date-main">October 18, 2025</div>
                    <div className="date-day">Saturday</div>
                  </div>
                </td>
                <td>
                  <span className="log-entries-badge">
                    <FaMousePointer className="log-icon" />
                    56789
                  </span>
                </td>
                <td>
                  <button className="view-details-btn" onClick={handleViewLogDetails}>
                    <FaEye className="view-icon" />
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderVersionsContent = () => (
    <>
      {/* System Information Card */}
      <div className="version-cards-grid">
        <div className="version-card">
          <div className="version-card-header">
            <FaInfoCircle className="version-card-icon blue" />
            <h3>System Information</h3>
          </div>
          <div className="version-card-content">
            <div className="info-row">
              <span className="info-label">Application:</span>
              <span className="info-value">Tool User Management System</span>
            </div>
            <div className="info-row">
              <span className="info-label">Framework:</span>
              <span className="info-value">React</span>
            </div>
            <div className="info-row">
              <span className="info-label">Database:</span>
              <span className="info-value">MySQL</span>
            </div>
            <div className="info-row">
              <span className="info-label">Table:</span>
              <span className="info-value">ctr_tool_v</span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="version-card">
          <div className="version-card-header">
            <FaChartLine className="version-card-icon green" />
            <h3>Current Status</h3>
          </div>
          <div className="version-card-content status-content">
            <div className="status-icon-large">
              <FaCheckCircle />
            </div>
            <div className="status-text">System Online</div>
            <div className="version-text">Current Version: v.3.5</div>
          </div>
        </div>

        {/* Version History Card */}
        <div className="version-card version-history-card">
          <div className="version-card-header">
            <FaClock className="version-card-icon gray" />
            <h3>Version History</h3>
          </div>
          <div className="version-card-content">
            <div className="version-history-table">
              <div className="version-history-header">
                <span>Version</span>
                <span>Status</span>
              </div>
              <div className="version-history-row">
                <div className="version-info">
                  <span className="version-number">v.3.5</span>
                  <FaSync className="version-sync-icon" />
                  <span className="version-current">Current</span>
                </div>
                <div className="version-status">
                  <FaCheckCircle className="status-check" />
                  <span>Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details Section */}
      <div className="content-section admin-section">
        <div className="section-header">
          <h2><FaCogs style={{ marginRight: '8px' }} />Technical Details</h2>
        </div>
        <div className="technical-details-grid">
          <div className="tech-detail-card">
            <div className="tech-icon blue">
              <FaDatabase />
            </div>
            <div className="tech-content">
              <h4>Database</h4>
              <p>MySQL</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon green">
              <FaServer />
            </div>
            <div className="tech-content">
              <h4>Backend</h4>
              <p>Laravel</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon light-blue">
              <FaBuilding />
            </div>
            <div className="tech-content">
              <h4>Frontend</h4>
              <p>React</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon yellow">
              <FaShieldAlt />
            </div>
            <div className="tech-content">
              <h4>Security</h4>
              <p>2FA Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderSystemContent = () => (
    <>
      {/* System Information Card */}
      <div className="version-cards-grid">
        <div className="version-card">
          <div className="version-card-header">
            <FaInfoCircle className="version-card-icon blue" />
            <h3>System Information</h3>
          </div>
          <div className="version-card-content">
            <div className="info-row">
              <span className="info-label">Application:</span>
              <span className="info-value">Tool User Management System</span>
            </div>
            <div className="info-row">
              <span className="info-label">Framework:</span>
              <span className="info-value">Flask (Python)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Database:</span>
              <span className="info-value">MySQL</span>
            </div>
            <div className="info-row">
              <span className="info-label">Table:</span>
              <span className="info-value">ctr_tool_version</span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="version-card">
          <div className="version-card-header">
            <FaChartLine className="version-card-icon green" />
            <h3>Current Status</h3>
          </div>
          <div className="version-card-content status-content">
            <div className="status-icon-large">
              <FaCheckCircle />
            </div>
            <div className="status-text">System Online</div>
            <div className="version-text">Current Version: v.3.5</div>
          </div>
        </div>

        {/* Version History Card */}
        <div className="version-card version-history-card">
          <div className="version-card-header">
            <FaClock className="version-card-icon gray" />
            <h3>Version History</h3>
          </div>
          <div className="version-card-content">
            <div className="version-history-table">
              <div className="version-history-header">
                <span>Version</span>
                <span>Status</span>
              </div>
              <div className="version-history-row">
                <div className="version-info">
                  <span className="version-number">v.3.5</span>
                  <FaSync className="version-sync-icon" />
                  <span className="version-current">Current</span>
                </div>
                <div className="version-status">
                  <FaCheckCircle className="status-check" />
                  <span>Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details Section */}
      <div className="content-section admin-section">
        <div className="section-header">
          <h2><FaCogs style={{ marginRight: '8px' }} />Technical Details</h2>
        </div>
        <div className="technical-details-grid">
          <div className="tech-detail-card">
            <div className="tech-icon blue">
              <FaDatabase />
            </div>
            <div className="tech-content">
              <h4>Database</h4>
              <p>MySQL</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon green">
              <FaServer />
            </div>
            <div className="tech-content">
              <h4>Backend</h4>
              <p>Flask/Python</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon light-blue">
              <FaBuilding />
            </div>
            <div className="tech-content">
              <h4>Frontend</h4>
              <p>Bootstrap 5</p>
            </div>
          </div>
          
          <div className="tech-detail-card">
            <div className="tech-icon yellow">
              <FaShieldAlt />
            </div>
            <div className="tech-content">
              <h4>Security</h4>
              <p>2FA Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAddUserContent = () => {
    return (
    <>
      {/* Header Section */}
      <div className="content-section admin-section">
        <div className="section-header">
          <h2><FaUserPlus style={{ marginRight: '8px' }} />Add New User</h2>
          <button className="btn-back" onClick={() => setActivePage("dashboard")}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Add User Form */}
      <div className="content-section admin-section">
        <div className="modal-content user-info-modal">
          <div className="modal-header">
            <h3><FaUserPlus style={{ marginRight: '8px' }} />User Information</h3>
          </div>
          
          <div className="modal-body">
            {/* Email Address Section */}
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope style={{ marginRight: '8px' }} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
              <div className="helper-text">This will be used as the login username.</div>
            </div>
            
            {/* Password Section */}
            <div className="form-group">
              <label htmlFor="password">
                <FaShieldAlt style={{ marginRight: '8px' }} />
                Password *
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="helper-text">Password must be at least 6 characters long.</div>
            </div>
            
            {/* Permissions & Status Section */}
            <div className="permissions-section">
              <h4><FaShieldAlt style={{ marginRight: '8px' }} />Permissions & Status</h4>
              
              {/* Active User */}
              <div className="permission-item">
                <div className="permission-item-header">
                  <div className="permission-label">
                    <span className="permission-icon green">●</span>
                    Active User
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={newUser.isActive}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="helper-text">User can log in and access the system.</div>
              </div>
              
              {/* Super Administrator */}
              <div className="permission-item">
                <div className="permission-item-header">
                  <div className="permission-label">
                    <span className="permission-icon red">●</span>
                    Super Administrator
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="isSuperAdmin"
                      checked={newUser.isSuperAdmin}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="helper-text">User has full system access.</div>
              </div>
              
              {/* Administrator */}
              <div className="permission-item">
                <div className="permission-item-header">
                  <div className="permission-label">
                    <span className="permission-icon yellow">●</span>
                    Administrator
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={newUser.isAdmin}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="helper-text">User has administrative privileges.</div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button className="btn-cancel" onClick={() => {
              setNewUser({ email: "", password: "", isActive: true, isSuperAdmin: false, isAdmin: false });
              setShowPassword(false);
            }}>
              <FaTrash style={{ marginRight: '8px' }} />
              Cancel
            </button>
            <button className="btn-create" onClick={handleAddUser}>
              <FaUserPlus style={{ marginRight: '8px' }} />
              Create User
            </button>
          </div>
        </div>
      </div>

      {/* Recent Users Section */}
      <div className="content-section admin-section">
        <h3><FaUsers style={{ marginRight: '8px' }} />Recently Added Users</h3>
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {users.slice(-3).map(user => (
            <div key={user.id} className="stat-card">
              <div className="stat-icon blue">
                <FaUserCircle />
              </div>
              <div className="stat-content">
                <div className="stat-label">{user.name}</div>
                <div className="stat-value">{user.email}</div>
                <div className="stat-divider"></div>
                <div className="stat-footer">
                  <span className={`status-badge ${user.status}`}>{user.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  };

  const render2FAAuthContent = () => (
    <>
      {/* Header Section */}
      <div className="content-section admin-section">
        <div className="section-header">
          <h2><FaShieldAlt style={{ marginRight: '8px' }} />Two-Factor Authentication Management</h2>
          <button className="btn-back" onClick={() => setActivePage("dashboard")}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-green">
          <div className="stat-icon-large">
            <FaShieldAlt />
          </div>
          <div className="stat-content">
            <div className="stat-value">6</div>
            <div className="stat-label">Total 2FA Users</div>
          </div>
        </div>
        
        <div className="stat-card stat-card-blue">
          <div className="stat-icon-large">
            <FaQrcode />
          </div>
          <div className="stat-content">
            <div className="stat-value">6</div>
            <div className="stat-label">QR Codes Available</div>
          </div>
        </div>
        
        <div className="stat-card stat-card-yellow">
          <div className="stat-icon-large">
            <FaKey />
          </div>
          <div className="stat-content">
            <div className="stat-value">6</div>
            <div className="stat-label">Active Secrets</div>
          </div>
        </div>
      </div>

      {/* 2FA Enabled Users Section */}
      <div className="content-section admin-section">
        <div className="section-header">
          <h2><FaUsers style={{ marginRight: '8px' }} />2FA Enabled Users</h2>
          <button className="btn-apply-2fa" onClick={handleApply2FA}>
            <FaPlus style={{ marginRight: '8px' }} />
            Apply 2FA
          </button>
        </div>
        
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view-qr" 
                        onClick={() => handleViewQRCode(user)}
                        title="View QR Code"
                      >
                        <FaQrcode style={{ marginRight: '8px' }} />
                        View QR Code
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" onPageChange={setActivePage} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1><FaCrown style={{ marginRight: '12px' }} />CTR Dashboard</h1>
          <p>Welcome back, {userEmail}! Manage your organization from here.</p>
        </div>

        {/* Render content based on active page */}
        {activePage === "dashboard" && renderDashboardContent()}
        {activePage === "users" && renderUsersContent()}
        {activePage === "add-user" && renderAddUserContent()}
        {activePage === "error-logs" && renderErrorLogsContent()}
        {activePage === "main-logs" && renderMainLogsContent()}
        {activePage === "click-logs" && renderClickLogsContent()}
        {activePage === "version" && renderVersionsContent()}
        {activePage === "system" && renderSystemContent()}
        {activePage === "2fa-auth" && render2FAAuthContent()}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
          <div className="modal-content user-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaUserPlus style={{ marginRight: '8px' }} />User Information</h3>
              <button className="modal-close" onClick={() => setShowAddUserModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Email Address Section */}
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope style={{ marginRight: '8px' }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
                <div className="helper-text">This will be used as the login username.</div>
              </div>
              
              {/* Password Section */}
              <div className="form-group">
                <label htmlFor="password">
                  <FaShieldAlt style={{ marginRight: '8px' }} />
                  Password *
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="helper-text">Password must be at least 6 characters long.</div>
              </div>
              
              {/* Permissions & Status Section */}
              <div className="permissions-section">
                <h4><FaShieldAlt style={{ marginRight: '8px' }} />Permissions & Status</h4>
                
                {/* Active User */}
                <div className="permission-item">
                  <div className="permission-item-header">
                    <div className="permission-label">
                      <span className="permission-icon green">●</span>
                      Active User
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={newUser.isActive}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="helper-text">User can log in and access the system.</div>
                </div>
                
                {/* Super Administrator */}
                <div className="permission-item">
                  <div className="permission-item-header">
                    <div className="permission-label">
                      <span className="permission-icon red">●</span>
                      Super Administrator
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="isSuperAdmin"
                        checked={newUser.isSuperAdmin}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="helper-text">User has full system access.</div>
                </div>
                
                {/* Administrator */}
                <div className="permission-item">
                  <div className="permission-item-header">
                    <div className="permission-label">
                      <span className="permission-icon yellow">●</span>
                      Administrator
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="isAdmin"
                        checked={newUser.isAdmin}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="helper-text">User has administrative privileges.</div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel">
                <FaTrash style={{ marginRight: '8px' }} />
                Cancel
              </button>
              <button className="btn-create" onClick={handleAddUser}>
                <FaUserPlus style={{ marginRight: '8px' }} />
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content user-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaEye style={{ marginRight: '8px' }} />User Details</h3>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {selectedUser && (
                <div className="user-details">
                  <div className="detail-row">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{selectedUser.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedUser.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Role:</span>
                    <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${selectedUser.status}`}>{selectedUser.status}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">{selectedUser.joinDate}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content user-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaEdit style={{ marginRight: '8px' }} />Edit User</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditInputChange}
                  placeholder="Enter email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-role">Role</label>
                <select
                  id="edit-role"
                  name="role"
                  value={editUser.role}
                  onChange={handleEditInputChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  name="status"
                  value={editUser.status}
                  onChange={handleEditInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn-create" onClick={handleSaveEdit}>
                <FaEdit style={{ marginRight: '8px' }} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content user-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaTrash style={{ marginRight: '8px', color: '#ef4444' }} />Delete User</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="delete-warning">
                <FaExclamationTriangle style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '16px' }} />
                <p>Are you sure you want to delete this user?</p>
                {selectedUser && (
                  <div className="user-to-delete">
                    <strong>{selectedUser.name}</strong> ({selectedUser.email})
                  </div>
                )}
                <p style={{ color: '#ef4444', marginTop: '16px' }}>
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={handleConfirmDelete}>
                <FaTrash style={{ marginRight: '8px' }} />
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCodeModal && (
        <div className="modal-overlay" onClick={() => setShowQRCodeModal(false)}>
          <div className="modal-content qr-code-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaQrcode style={{ marginRight: '8px' }} />QR Code</h3>
              <button className="modal-close" onClick={() => setShowQRCodeModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="qr-code-info">
                <div className="qr-code-label">Email: {selectedUser?.email}</div>
              </div>
              
              <div className="qr-code-container">
                <div className="qr-code-placeholder">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt="QR Code" 
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '200px', 
                      height: '200px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      Loading QR Code...
                    </div>
                  )}
                </div>
              </div>
              
              <div className="qr-status-banner">
                <FaCheckCircle style={{ marginRight: '8px' }} />
                Ready to scan: This QR code is generated from the existing secret in the database.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply 2FA Modal */}
      {showApply2FAModal && (
        <div className="modal-overlay" onClick={() => setShowApply2FAModal(false)}>
          <div className="modal-content apply-2fa-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaUserPlus style={{ marginRight: '8px', color: '#22c55e' }} />Add User to 2FA System</h3>
              <button className="modal-close" onClick={() => setShowApply2FAModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="apply-2fa-email">
                  <FaEnvelope style={{ marginRight: '8px' }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="apply-2fa-email"
                  name="email"
                  value={apply2FAEmail}
                  onChange={handleApply2FAEmailChange}
                  placeholder="Enter user email address"
                  required
                />
                <div className="helper-text">This email will be used to identify the user in the 2FA system.</div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-apply-2fa-confirm" onClick={handleConfirmApply2FA}>
                <FaShieldAlt style={{ marginRight: '8px' }} />
                Apply 2FA
              </button>
              <button className="btn-cancel" onClick={() => setShowApply2FAModal(false)}>
                <FaTrash style={{ marginRight: '8px' }} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Details Modal */}
      {showLogDetailsModal && (
        <div className="modal-overlay" onClick={() => setShowLogDetailsModal(false)}>
          <div className="modal-content log-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaFileAlt style={{ marginRight: '8px' }} />Log Details</h3>
              <button className="modal-close" onClick={() => setShowLogDetailsModal(false)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="log-details-table-container">
                <table className="log-details-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Log Level</th>
                      <th>Message</th>
                      <th>Product Click</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="log-id-badge">8435150</span></td>
                      <td><span className="log-level-badge success">SUCCESS</span></td>
                      <td>Product found with keyword: '3d Blade sign'</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435149</span></td>
                      <td><span className="log-level-badge debug">DEBUG</span></td>
                      <td>Final status - Favorites: yes, Cart: yes</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435148</span></td>
                      <td><span className="log-level-badge success">SUCCESS</span></td>
                      <td>Product successfully added to cart</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435147</span></td>
                      <td><span className="log-level-badge info">INFO</span></td>
                      <td>No error messages detected after cart addition</td>
                      <td>No</td>
                    </tr>
                    <tr className="selected-row">
                      <td><span className="log-id-badge">8435146</span></td>
                      <td><span className="log-level-badge success">SUCCESS</span></td>
                      <td>Product Added To Cart Successfully</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435145</span></td>
                      <td><span className="log-level-badge debug">DEBUG</span></td>
                      <td>Clicked add to cart button using direct click</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435144</span></td>
                      <td><span className="log-level-badge info">INFO</span></td>
                      <td>Attempting to find and click the favorite button...</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435143</span></td>
                      <td><span className="log-level-badge info">INFO</span></td>
                      <td>Starting favorites and cart handling for keyword 'Reception LED Neon Decor', page 1</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435142</span></td>
                      <td><span className="log-level-badge debug">DEBUG</span></td>
                      <td>Scrolled to add to cart button</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435141</span></td>
                      <td><span className="log-level-badge info">INFO</span></td>
                      <td>Attempting to find add to cart button...</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td><span className="log-id-badge">8435140</span></td>
                      <td><span className="log-level-badge success">SUCCESS</span></td>
                      <td>Added personalization text: Asher Simmons</td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowLogDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;