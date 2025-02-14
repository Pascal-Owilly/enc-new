import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
