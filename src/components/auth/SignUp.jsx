import React, { useState, useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from '../config/config';
import { useNavigate } from "react-router-dom";
import AuthContext from './AuthContext';  // Corrected import of AuthContext

import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext); // Use useContext to get context values

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch(`${BASE_URL}api/auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Sign up successful! Redirecting to login...');
                
                // Store token and user in context after successful signup
                // setToken(data.token); 
                // setUser(data.user);
                navigate('/auth/login'); // Redirect to login page
            } else {
                const errorData = await response.json();
                // Directly set the error response from backend
                setError(JSON.stringify(errorData));  // Convert the error object to a string for display
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };

    // Define Google login success and error handling
    const handleGoogleLoginSuccess = async (response) => {
        const { credential } = response;
    
        try {
            // Send the credential (Google OAuth token) to your backend for verification and user authentication
            const apiResponse = await fetch(`${BASE_URL}api/auth/google-login/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credential }),
            });
    
            if (apiResponse.ok) {
                const data = await apiResponse.json();
                console.log("Google login successful:", data);
    
                // Store token and user information in the context (for frontend state management)
                setToken(data.token); // assuming `data.token` is the JWT received
                setUser(data.user);   // assuming `data.user` contains the user's details
    
                // Redirect to a dashboard or home page after successful login
                navigate('/dashboard');
            } else {
                // Handle errors (e.g., user not found, invalid token)
                const errorData = await apiResponse.json();
                console.error("Error during Google login:", errorData);
                setError('Google login failed. Please try again.');
            }
        } catch (error) {
            console.error("Error in Google login request:", error);
            setError('Network error during Google login. Please try again later.');
        }
    };
    

    const handleGoogleLoginError = (error) => {
        console.error("Google login error", error);
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="143693841827-i3di9q4b0kc497cc9sj7q9ng9fcakhl1.apps.googleusercontent.com">
            <div className="signup-page">
                <div className="signup-container">
                    <h1 className="signup-title">Create Your Account</h1>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSignUp} className="signup-form">
                        {/* Form fields */}
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="">Select Role</option>
                                <option value="superuser">Superuser</option>
                                <option value="customer">Customer</option>
                                <option value="property_manager">Property Manager</option>
                                <option value="manager">Manager</option>
                                <option value="sub_manager">Sub-Manager</option>
                            </select>
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                    <div className="divider"><span>OR</span></div>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                    />
                    <p className="login-link">
                        Already have an account? <a href="/auth/login">Log in</a>
                    </p>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignUp;
