import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  // Save token to local storage
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}blogposts/`, {
        email,
        password,
      });
      setToken(response.data.access); // Save token
      setUser(response.data.user);   // Save user info
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || "Error" };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  // Fetch user data when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}auth/user/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch {
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
