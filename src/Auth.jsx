import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import img from "./assets/1.jpg"; // <-- import the background image
import overlayImg from "./assets/1.jpg"; // <-- import the overlay image (same image)

const Auth = () => {
  const [role, setRole] = useState("user");
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Sample login logic
      if (mode === "login") {
        if (formData.email && formData.password) {
          // Store user role in localStorage
          localStorage.setItem("userRole", role);
          localStorage.setItem("userEmail", formData.email);
          
          // Redirect based on role
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        } else {
          alert("Please fill in all fields");
        }
      } else {
        // Sign up logic
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords don't match");
        } else if (formData.email && formData.password) {
          alert("Account created successfully! Please login.");
          setMode("login");
          setFormData({ email: "", password: "", confirmPassword: "" });
        } else {
          alert("Please fill in all fields");
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT IMAGE PANE */}
        <div
          className="auth-left-pane"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="overlay-content">
            <img src={overlayImg} alt="Overlay" className="overlay-image" />
          </div>
        </div>

        {/* RIGHT FORM PANE */}
        <div className="auth-right-pane">
          <div className="auth-card">
            {/* Role Switch */}
            <div className="auth-header">
              <button
                className={`nav-btn ${role === "user" ? "active" : ""}`}
                onClick={() => setRole("user")}
              >
                User
              </button>
              <button
                className={`nav-btn ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email" 
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password" 
                  required
                />
              </div>

              {mode === "signup" && (
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password" 
                    required
                  />
                </div>
              )}

              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? "Loading..." : (mode === "login" ? "Login" : "Sign Up")}
              </button>
            </form>

            {/* Bottom Mode Switch */}
            <div className="auth-switch">
              <button
                className={`nav-btn ${mode === "login" ? "active" : ""}`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`nav-btn ${mode === "signup" ? "active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
