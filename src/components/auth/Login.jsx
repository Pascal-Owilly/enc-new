import React, { useState, useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from './AuthContext';  // Import the context
import './Login.css';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(null); // Store JSX instead of string
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");

    try {
        const { success, message } = await login(email, password);
        console.log('Login response:', success, message);

        if (success) {
            setSuccessMessage(
                <div>
                    <span>Success! Redirecting </span>
                    <div className="dot-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            );
            setError('');

            const from = location.state?.from || '/';
            console.log("Navigating to:", from);

            setTimeout(() => navigate(from), 1500);
        } else {
            setError(message);
            setSuccessMessage(null);
        }
    } catch (error) {
        setError('An error occurred during login.');
        
        console.error('Login failed:', error.response ? error.response.data : error.message);
        setSuccessMessage(null);
    }
};


    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log("Google login success:", credentialResponse);
            const { success, message } = await googleLogin(credentialResponse.credential);
            
            if (success) {
                setSuccessMessage(
                    <div>
                        <span>Success! Redirecting </span>
                        <div className="dot-loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                );
                
                setError('');
                const from = location.state?.from || '/'; // ✅ Define `from`
                setTimeout(() => navigate(from), 1500);
            } else {
                setError(message);
                setSuccessMessage(null);
            }
        } catch (error) {
            setError('Google login failed. Please try again.');
            setSuccessMessage(null);
            console.error('Google login error:', error);
        }
    };

    const handleGoogleLoginError = () => {
        setError('Google Login Failed. Please try again.');
        setSuccessMessage(null);
        console.error('Google Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId='143693841827-i3di9q4b0kc497cc9sj7q9ng9fcakhl1.apps.googleusercontent.com'>
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-title">Welcome Back!</h1>

                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <div className="success-message">{successMessage}</div>} 

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
                    <p className="signup-link">
                        Forgot password? <a href="/auth/reset-password">Reset</a>
                    </p>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
