import React from 'react';
import './Profile.css'; // Adjust the path as necessary

const Profile = () => {
    const userData = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        degreeProgram: "Adventurous Traveler",
        visitedDestinations: ["Paris", "New York", "Tokyo", "Sydney"],
        wishList: ["Bali", "Santorini", "Machu Picchu"],
        followers: 120,
        following: 80,
        messages: [
            { from: "Alice", text: "Can't wait for our trip!", date: "2024-10-25" },
            { from: "Bob", text: "Have you booked the tickets?", date: "2024-10-20" },
            { from: "Charlie", text: "Let’s plan our itinerary!", date: "2024-10-18" },
        ],
        touristThemes: [
            { title: "Adventure", description: "Explore the wild and embrace the thrill of the great outdoors." },
            { title: "Culture", description: "Immerse yourself in the history and heritage of diverse cultures." },
            { title: "Relaxation", description: "Unwind and rejuvenate at serene locations worldwide." },
            { title: "Culinary", description: "Savor the flavors of the world with culinary tours and cooking classes." },
        ],
    };

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
                    {userData.visitedDestinations.map((destination, index) => (
                        <li key={index}>{destination}</li>
                    ))}
                </ul>
            </div>

            <div className="wish-list-section">
                <h2>Wish List</h2>
                <ul>
                    {userData.wishList.map((item, index) => (
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
                    {userData.messages.map((message, index) => (
                        <li key={index}>
                            <strong>{message.from}</strong>: {message.text} <em>({message.date})</em>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="themes-section">
                <h2>Tourist Themes</h2>
                <div className="grid-container">
                    {userData.touristThemes.map((theme, index) => (
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
