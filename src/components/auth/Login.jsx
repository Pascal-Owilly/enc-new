import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from '../config/config';
import AuthContext from './AuthContext';  // Import the context
import './Login.css';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);  // Access login function from context
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Attempting login..."); // Debugging
        try {
            const { success, message } = await login(email, password); // Use context login function
            console.log('Login response:', success, message); // Debugging
            
            if (success) {
                // Check if there's a 'from' location (the page they were trying to access before being redirected)
                const from = location.state?.from || '/'; // Default to '/' if no 'from' location
                console.log("Navigating to:", from); // Debugging
                
                // Navigate to the original location or default to '/'
                navigate(from);
            } else {
                setError(data);
                console.log('Error:', data); // Debugging
            }
        } catch (error) {
            setError('An error occurred during login.');
            console.error('Login error:', error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log("Google login success:", credentialResponse); // Debugging
            const { success, message } = await googleLogin(credentialResponse.credential);
            if (success) {
                navigate('/');
            } else {
                setError(message);
            }
        } catch (error) {
            setError('Google login failed. Please try again.');
            console.error('Google login error:', error);
        }
    };

    const handleGoogleLoginError = () => {
        setError('Google Login Failed. Please try again.');
        console.error('Google Login Failed');
    };

    useEffect(() => {
        console.log('Login Page Mounted'); // Debugging

        // Ensure redirect only happens if no errors
        if (!error && location.state?.from) {
            const from = location.state.from || '/';
            console.log("Navigating to: ", from); // Debugging
            navigate(from);
        }

        return () => {
            console.log('Login Page Unmounted'); // Debugging
        };
    }, [error, location.state?.from, navigate]);

    return (
        <GoogleOAuthProvider clientId='143693841827-i3di9q4b0kc497cc9sj7q9ng9fcakhl1.apps.googleusercontent.com'>
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-title">Welcome Back!</h1>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                    />

                    <p className="signup-link">
                        Don’t have an account? <a href="/auth/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
