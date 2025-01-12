import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from '../config/config'; // Ensure this is set correctly

import './SignUp.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/auth/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sign up success:', data);
                // Handle the sign-up success, e.g., redirect to login
            } else {
                const error = await response.json();
                console.error('Sign up error:', error);
                // Handle error, e.g., show a message
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        // Use the Google credentials to authenticate with your backend
        console.log('Google Sign Up Success:', credentialResponse);
        // Send `credentialResponse.credential` to your backend for verification
    };

    const handleGoogleLoginError = () => {
        console.error('Google Sign Up Failed');
    };

    return (
        <GoogleOAuthProvider clientId="">
            <div className="signup-page">
                <div className="signup-container">
                    <h1 className="signup-title">Create Your Account</h1>
                    <form onSubmit={handleSignUp} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
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
                                placeholder="Create your password"
                                required
                            />
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

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
