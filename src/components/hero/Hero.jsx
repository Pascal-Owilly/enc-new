import React from 'react';
import './Hero.css'; // Import CSS file for styling
import heroImage from '../../assets/hero/bg_1.jpg'; // Correct import for the background image

const HeroSection = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>Discover Your Next Adventure</h1>
                <p>Explore stunning destinations and create unforgettable memories.</p>
                <button className="btn-explore">Explore Now</button>
            </div>
            <div
                className="hero-image"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // opacity: '0.8',  
                    // zIndex: 1, 

                    // filter: 'blur(5px)', 
                }}
            ></div>
        </div>
    );
};

export default HeroSection;
