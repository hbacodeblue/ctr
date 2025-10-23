import React from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { 
  FaProjectDiagram, 
  FaCheckCircle, 
  FaClock, 
  FaBullseye,
  FaClipboardList,
  FaTasks,
  FaChartLine,
  FaUser,
  FaDollarSign,
  FaUsers
} from "react-icons/fa";

const UserDashboard = () => {
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1><FaUser style={{ marginRight: '12px' }} />User Dashboard</h1>
          <p>Welcome back, {userEmail}! Here's your personal workspace.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orange">
              <FaProjectDiagram />
            </div>
            <div className="stat-content">
              <div className="stat-label">Used Space</div>
              <div className="stat-value">49/50 GB</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="warning-icon">⚠</span>
                <span className="warning-text">Get more space</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-label">Revenue</div>
              <div className="stat-value">$34,245</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="calendar-icon">📅</span>
                <span className="footer-text">Last 24 Hours</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-label">Fixed Issues</div>
              <div className="stat-value">75</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="tag-icon">🏷</span>
                <span className="footer-text">Tracked from Github</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaUsers />
            </div>
            <div className="stat-content">
              <div className="stat-label">Active Users</div>
              <div className="stat-value">1,247</div>
              <div className="stat-divider"></div>
              <div className="stat-footer">
                <span className="trend-icon">📈</span>
                <span className="footer-text">+23 this week</span>
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
                    <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
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
            <div className="chart-header orange">
              <div className="chart-container">
                <svg className="chart-svg" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid2" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid2)" />
                  
                  {/* Bar chart */}
                  <rect x="50" y="120" width="20" height="30" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.1s'}}/>
                  <rect x="80" y="100" width="20" height="50" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.2s'}}/>
                  <rect x="110" y="110" width="20" height="40" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.3s'}}/>
                  <rect x="140" y="60" width="20" height="90" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.4s'}}/>
                  <rect x="170" y="115" width="20" height="35" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.5s'}}/>
                  <rect x="200" y="90" width="20" height="60" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.6s'}}/>
                  <rect x="230" y="110" width="20" height="40" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.7s'}}/>
                  <rect x="260" y="70" width="20" height="80" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.8s'}}/>
                  <rect x="290" y="50" width="20" height="100" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '0.9s'}}/>
                  <rect x="320" y="40" width="20" height="110" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '1.0s'}}/>
                  <rect x="350" y="30" width="20" height="120" fill="rgba(255,255,255,0.8)" className="chart-bar" style={{animationDelay: '1.1s'}}/>
                  
                  {/* Y-axis labels */}
                  <text x="5" y="125" fill="white" fontSize="12" textAnchor="start">0</text>
                  <text x="5" y="100" fill="white" fontSize="12" textAnchor="start">200</text>
                  <text x="5" y="75" fill="white" fontSize="12" textAnchor="start">400</text>
                  <text x="5" y="50" fill="white" fontSize="12" textAnchor="start">600</text>
                  <text x="5" y="25" fill="white" fontSize="12" textAnchor="start">800</text>
                  
                  {/* X-axis labels */}
                  <text x="60" y="145" fill="white" fontSize="10" textAnchor="middle">Jan</text>
                  <text x="90" y="145" fill="white" fontSize="10" textAnchor="middle">Feb</text>
                  <text x="120" y="145" fill="white" fontSize="10" textAnchor="middle">Mar</text>
                  <text x="150" y="145" fill="white" fontSize="10" textAnchor="middle">Apr</text>
                  <text x="180" y="145" fill="white" fontSize="10" textAnchor="middle">May</text>
                  <text x="210" y="145" fill="white" fontSize="10" textAnchor="middle">Jun</text>
                  <text x="240" y="145" fill="white" fontSize="10" textAnchor="middle">Jul</text>
                  <text x="270" y="145" fill="white" fontSize="10" textAnchor="middle">Aug</text>
                  <text x="300" y="145" fill="white" fontSize="10" textAnchor="middle">Sep</text>
                  <text x="330" y="145" fill="white" fontSize="10" textAnchor="middle">Oct</text>
                  <text x="360" y="145" fill="white" fontSize="10" textAnchor="middle">Nov</text>
                </svg>
              </div>
            </div>
            <div className="chart-content">
              <h4>Email Subscriptions</h4>
              <p>Last Campaign Performance</p>
              <div className="chart-divider"></div>
              <div className="chart-footer">
                <span className="clock-icon">🕐</span>
                <span>campaign sent 2 days ago</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header blue">
              <div className="chart-container">
                <svg className="chart-svg" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid3" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid3)" />
                  
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
                <div className="content-section user-section">
                  <h2><FaClipboardList style={{ marginRight: '8px' }} />Recent Activities</h2>
                  <div style={{ lineHeight: '1.6' }}>
                    <p>• Completed project documentation for Q4 review</p>
                    <p>• Updated user profile settings</p>
                    <p>• Submitted weekly progress report</p>
                    <p>• Attended team meeting on new features</p>
                  </div>
                </div>

                <div className="content-section user-section">
                  <h2><FaTasks style={{ marginRight: '8px' }} />Current Projects</h2>
                  <div style={{ lineHeight: '1.6' }}>
                    <p>• <strong>Website Redesign:</strong> 75% complete - Due in 5 days</p>
                    <p>• <strong>Mobile App:</strong> 30% complete - Due in 2 weeks</p>
                    <p>• <strong>Database Migration:</strong> Planning phase</p>
                  </div>
                </div>

                <div className="content-section user-section">
                  <h2><FaChartLine style={{ marginRight: '8px' }} />Performance Overview</h2>
                  <div style={{ lineHeight: '1.6' }}>
                    <p>Your productivity has been excellent this month! You've completed 94% of assigned tasks and maintained a high quality standard. Keep up the great work!</p>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default UserDashboard;
