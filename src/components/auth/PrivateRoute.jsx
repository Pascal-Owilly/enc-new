import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation(); // Get the current location

  // If we're still loading user data, don't redirect yet, just render children
  if (loading) {
    return (
      <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  // If no token or user exists, redirect to login with the current location
  if (!token || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
