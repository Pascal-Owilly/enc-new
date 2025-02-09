import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [decodedToken, setDecodedToken] = useState(null);  // New state for decoded token
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

  // Decode token and set decoded data (like user ID) when token changes

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

  // Signup function
  const signUp = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/auth/register/`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.status === 201) {
        const { token, user } = response.data;
        setToken(token);  // Set the token from response
        setUser(user); // Set user data
        return { success: true };
      } else {
        setError('Sign up failed');
        return { success: false, message: 'Sign up failed' };
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.detail || "An error occurred during signup.");
      return { success: false, message: error.response?.data?.detail || "An error occurred during signup." };
    }
  };

  // Login function
  // const login = async (email, password) => {
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}api/auth/login/`,
  //       { email, password },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );
      
  //     if (response.status === 200) {
  //       const { token, user } = response.data;
  //       setToken(token);  // Set the token from response
  //       setUser(user); // Set user data
  //       return { success: true };
  //     } else {
  //       setError('Login failed');
  //       return { success: false, message: 'Login failed' };
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setError(error.response?.data?.detail || "An error occurred during login.");
  //     return { success: false, message: error.response?.data?.detail || "An error occurred during login." };
  //   }
  // };

const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}api/auth/login/`,
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            return { success: true };
        } else {
            return { success: false, message: 'Login failed' };
        }
    } catch (error) {
        console.error("Login error:", error.response?.data || error);

        // Extract error message safely
        let errorMessage = "An error occurred during login.";

        if (error.response?.data) {
            const errorData = error.response.data;

            // Check if 'non_field_errors' exists
            if (errorData.non_field_errors) {
                errorMessage = errorData.non_field_errors.join(', '); // Convert array to string
            } else if (typeof errorData === 'string') {
                errorMessage = errorData; // If backend sends a string error
            } else {
                errorMessage = JSON.stringify(errorData); // Fallback: Convert object to string
            }
        }

        return { success: false, message: errorMessage };
    }
};

  // RESET Password

  const resetPassword = async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/auth/password/reset/`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        return { success: true, message: "Password reset email sent successfully!" };
      } else {
        return { success: false, message: "Failed to send password reset email." };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || "An error occurred. Please try again.",
      };
    }
  };
 

  // Google login function
  const googleLogin = async (token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}api/auth/google-login/`,
        { token },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        setToken(token);  // Set the token from response
        setUser(user); // Set user data
        return { success: true };
      } else {
        setError('Google login failed');
        return { success: false, message: 'Google login failed' };
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.response?.data?.detail || "An error occurred during Google login.");
      return { success: false, message: error.response?.data?.detail || "An error occurred during Google login." };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{
      user, 
      login, 
      googleLogin, 
      signUp, 
      logout, 
      token, 
      error, 
      loading, 
      resetPassword, 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
