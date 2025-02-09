import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Ensure the path is correct
import { BASE_URL } from "../config/config";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}/api/users/`, {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((response) => setUserData(response.data))
                .catch((err) => setError('Error fetching user data: ' + (err.response?.data?.detail || err.message)));
        } else {
            setError('Token not found.');
        }
    }, [token]);

    if (error) return <div className="error-message">{error}</div>;
    if (!userData) return <div className="dot-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>;

    return (
        <div className="profile-page">
            <h3 className='text-center'>Profile</h3>
            <div className="profile-container">
                <div className="profile-picture">
                    <img src={userData.image || '/default-profile.png'} alt="Profile" />
                </div>
                <div className="user-details">
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Date Joined:</strong> {new Date(userData.date_joined).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="columns-container">
                <div className="column">
                    <h3>Visited Destinations</h3>
                    {userData.visitedDestinations?.length > 0 ? (
                        <ul>{userData.visitedDestinations.map((dest, i) => <li key={i}>{dest}</li>)}</ul>
                    ) : (
                        <p>No visited destinations yet.</p>
                    )}
                </div>
                <div className="column">
                    <h3>Wish List</h3>
                    {userData.wishList?.length > 0 ? (
                        <ul>{userData.wishList.map((item, i) => <li key={i}>{item}</li>)}</ul>
                    ) : (
                        <p>No items in wish list.</p>
                    )}
                </div>
            </div>
            <div className="columns-container">
                <div className="column">
                    <h3>Followers</h3>
                    <p>{userData.followers || 'No followers yet.'}</p>
                </div>
                <div className="column">
                    <h3>Following</h3>
                    <p>{userData.following || 'Not following anyone yet.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;