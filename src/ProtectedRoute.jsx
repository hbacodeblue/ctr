import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userRole"); // either 'admin' or 'user'
  
  // For testing purposes, if no user role is set, set it to admin
  if (!user) {
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("userEmail", "admin@example.com");
  }
  
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
