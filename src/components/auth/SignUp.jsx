import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from '../config/config';

import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
                setSuccess('Sign up successful! Please check your email to verify your account.');
                console.log('Sign up success:', data);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to sign up.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log('Google Sign Up Success:', credentialResponse);
        // Forward Google token to the backend
    };

    const handleGoogleLoginError = () => {
        console.error('Google Sign Up Failed');
        setError('Google sign up failed.');
    };

    return (
        <GoogleOAuthProvider clientId="143693841827-i3di9q4b0kc497cc9sj7q9ng9fcakhl1.apps.googleusercontent.com">
            <div className="signup-page">
                <div className="signup-container">
                    <h1 className="signup-title">Create Your Account</h1>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSignUp} className ="signup-form">
                        {/* First Name */}
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        
                        {/* Last Name */}
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                        
                        {/* Email */}
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

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create your password"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="manager">Manager</option>
                                <option value="role2">Role 2</option>
                            </select>
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>

                    {/* Divider */}
                    <div className="divider"><span>OR</span></div>

                    {/* Google OAuth */}
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                    />

                    {/* Login Link */}
                    <p className="login-link">
                        Already have an account? <a href="/auth/login">Log in</a>
                    </p>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignUp;
