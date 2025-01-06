import React from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    // Redirect to login if token is not found or expired
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
