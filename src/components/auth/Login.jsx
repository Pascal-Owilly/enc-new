import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
import { BASE_URL } from '../config/config';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form-based login using Axios
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${BASE_URL}auth/login/`, 
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.status === 200) {
                const { token } = response.data;  // Assuming the backend returns a token
                console.log('Login successful, token received:', token);
                
                // Save the token to localStorage or state
                localStorage.setItem('authToken', token);
                // Redirect user or update UI
            } else {
                console.error('Login failed:', response.data);
            }
        } catch (error) {
            // Capture the actual error and its response
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Login error:', error.response.data);
                console.error('Status code:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Login error: No response received:', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Login error:', error.message);
            }
        }
    };
   
    // Function to handle Google login success
    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);
        // You can send `credentialResponse.credential` to your backend for verification
    };

    // Function to handle Google login error
    const handleGoogleLoginError = () => {
        console.error('Google Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId="">
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-title">Welcome Back!</h1>
                    
                    {/* Custom Form-based Login */}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Email Address</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username or email"
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

                    {/* Google Login Component */}
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
