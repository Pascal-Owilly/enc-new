import React, { useState, useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from '../config/config';
import { useNavigate } from "react-router-dom";
import AuthContext from './AuthContext';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        image: null,
        role: 'customer',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext);

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
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}api/auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess('Sign up successful! Redirecting to login...');
                navigate('/auth/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    setError(''); // Clear previous errors

    const { credential } = response;
    try {
        const apiResponse = await fetch(`${BASE_URL}api/auth/google-login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credential }),
        });

        const data = await apiResponse.json(); // Directly parse JSON response
        
        console.log("Google login response:", data);

        if (apiResponse.ok) {
            if (data.user && data.token) {
                data.user.role = data.user.role || 'customer'; // Default role
                setToken(data.token);
                setUser(data.user);
                console.log("setToken:", setToken);
                console.log("setUser:", setUser);

                navigate('/');
            } else {
                setError("Unexpected response format.");
            }
        } else {
            setError(data.message || "Google login failed.");
        }
    } catch (networkError) {
        console.error("Network error:", networkError);
        setError("Network error during Google login. Please try again later.");
    } finally {
        setLoading(false);
    }
};

    const handleGoogleLoginError = (error) => {
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="143693841827-i3di9q4b0kc497cc9sj7q9ng9fcakhl1.apps.googleusercontent.com">
            <div className="signup-page">
                <div className="signup-container">
                    <h1 className="signup-title">Create Your Account</h1>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    {loading && <div className="dot-loader"></div>}
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
                        <div className="form-group d-none">
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
                    <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} useOneTap disabled={loading} />
                    <p className="login-link">Already have an account? <a href="/auth/login">Log in</a></p>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignUp;
