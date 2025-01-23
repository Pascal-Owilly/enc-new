import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state

  // Save token to local storage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  // Initialize token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch user data when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setLoading(true);  // Set loading to true while fetching
        try {
          const response = await axios.get(`${BASE_URL}api/users/`, {
            headers: { Authorization: `Token ${token}` },
          });
          setUser(response.data);  // Set user data if successful
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 401) {
            // Token is invalid or expired, log out the user
            logout();
          } else {
            setError("An error occurred while fetching user data.");
          }
        } finally {
          setLoading(false);  // Set loading to false once data is fetched or error occurs
        }
      } else {
        setLoading(false);  // If no token, stop loading
      }
    };
    fetchUser();
  }, [token]);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/auth/login/`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.status === 200) {
        const { token, user } = response.data;
        setToken(token);  // Set the token from response
        setUser(user); // Set user data
        return { success: true };
      } else {
        setError('Login failed');
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.detail || "An error occurred during login.");
      return { success: false, message: error.response?.data?.detail || "An error occurred during login." };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
