import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Adjust the path as necessary
import { BASE_URL } from "../config/config";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

    useEffect(() => {
        if (token) {
            // Fetch user profile data with token authentication
            axios
                .get(`${BASE_URL}profile/profile/`, {
                    headers: {
                        Authorization: `Token ${token}`,  // Add token to Authorization header
                    },
                })
                .then((response) => {
                    setUserData(response.data); // Set the user data from the response
                })
                .catch((err) => {
                    setError('Error fetching user data: ' + (err.response?.data?.detail || err.message));
                    console.error(err);
                });
        } else {
            setError('Token not found.');
        }
    }, [token]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    // Safely handle arrays by defaulting to empty array if undefined
    const visitedDestinations = Array.isArray(userData.visitedDestinations) ? userData.visitedDestinations : [];
    const wishList = Array.isArray(userData.wishList) ? userData.wishList : [];
    const messages = Array.isArray(userData.messages) ? userData.messages : [];
    const touristThemes = Array.isArray(userData.touristThemes) ? userData.touristThemes : [];

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="user-info">
                <h2>{userData.name}</h2>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Degree Program:</strong> {userData.degreeProgram}</p>
            </div>

            <div className="visited-section">
                <h2>Visited Destinations</h2>
                <ul>
                    {visitedDestinations.map((destination, index) => (
                        <li key={index}>{destination}</li>
                    ))}
                </ul>
            </div>

            <div className="wish-list-section">
                <h2>Wish List</h2>
                <ul>
                    {wishList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="social-section">
                <h2>Social Connections</h2>
                <p><strong>Followers:</strong> {userData.followers}</p>
                <p><strong>Following:</strong> {userData.following}</p>
            </div>

            <div className="messages-section">
                <h2>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <strong>{message.from}</strong>: {message.text} <em>({message.date})</em>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="themes-section">
                <h2>Tourist Themes</h2>
                <div className="grid-container">
                    {touristThemes.map((theme, index) => (
                        <div className="grid-item" key={index}>
                            <h3>{theme.title}</h3>
                            <p>{theme.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
