import React from 'react';
import './MicroAdventure.css'; // Adjust the path as necessary

const MicroAdventure = () => {
    return (
        <div className="micro-adventure-page">
            <h1>Micro-Adventure Experiences</h1>
            <p>Discover unique and immersive experiences tailored for the adventurous spirit in you!</p>
            <div className="adventure-list">
                <div className="adventure-item">
                    <h2>Forest Trekking</h2>
                    <p>Explore the beauty of nature with guided forest trekking tours. Immerse yourself in stunning landscapes and wildlife.</p>
                    <p>Rating: ★★★★☆</p>
                </div>
                <div className="adventure-item">
                    <h2>City Scavenger Hunt</h2>
                    <p>Engage in an exciting scavenger hunt throughout the city, discovering hidden gems and local favorites.</p>
                    <p>Rating: ★★★★★</p>
                </div>
                <div className="adventure-item">
                    <h2>Stargazing Nights</h2>
                    <p>Join us for a magical evening of stargazing and learn about constellations from expert astronomers.</p>
                    <p>Rating: ★★★★☆</p>
                </div>
            </div>
        </div>
    );
};

export default MicroAdventure;
