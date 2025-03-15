import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000
      }}>
        <div className="dot-loader">
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
          <span style={dotStyle}></span>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

// Define the style for the dots
const dotStyle = {
  width: '15px',
  height: '15px',
  margin: '0 5px',
  borderRadius: '50%',
  backgroundColor: '#28a745',
  animation: 'bounce 0.6s infinite alternate'
};

// Keyframes for the bounce animation
const styles = `
  @keyframes bounce {
    to {
      transform: translateY(-10px);
    }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PrivateRoute;
