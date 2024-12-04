/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContent";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // alert('Please login or create an account to access the dashboard');
    return<Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
