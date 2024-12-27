import React from 'react';
import './TourAndLearn.css';
import heroImage1 from '../../assets/hero/bg_1.jpg';

const TourAndLearn = () => {
  return (
    <div className="tour-learn-container">
      <header className="tour-learn-header">
        <img src={heroImage1} alt="Tour and Learn" className="hero-image" />
        <div className="learn-header-overlay">
          <h1 className="learn-header-title">Explore and Learn</h1>
          <p className="learn-header-subtitle">Join us for immersive experiences that ignite your curiosity!</p>
        </div>
      </header>
      
      <section className="tour-learn-content">
        <h2 className="learn-section-title">Why Choose Our Tours?</h2>
        <div className="learn-benefits">
          <div className="learn-benefit-item">
            <h3>🌍 Expert Guides</h3>
            <p>Learn from knowledgeable guides who are passionate about their subjects.</p>
          </div>
          <div className="learn-benefit-item">
            <h3>🎉 Engaging Activities</h3>
            <p>Participate in hands-on experiences that make learning fun and memorable.</p>
          </div>
          <div className="learn-benefit-item">
            <h3>🗓️ Flexible Itineraries</h3>
            <p>Choose from a variety of tours that fit your interests and schedule.</p>
          </div>
        </div>
      </section>

      <section className="learn-tour-options">
        <h2 className="learn-section-title">Our Popular Tours</h2>
        <div className="learn-tour-cards">
          <div className="learn-tour-card">
            <img src="https://via.placeholder.com/300" alt="Culinary Tour" className="tour-image" />
            <h3>Culinary Tour</h3>
            <p>Explore local cuisine and cooking classes.</p>
            <button className="learn-tour-button">Discover More</button>
            <button className="learn-tour-button">Book Now</button>
          </div>
          <div className="learn-tour-card">
            <img src="https://via.placeholder.com/300" alt="Historical Tour" className="tour-image" />
            <h3>Historical Tour</h3>
            <p>Discover the rich history of our region.</p>
            <button className="learn-tour-button">Discover More</button>
            <button className="learn-tour-button">Book Now</button>
          </div>
          <div className="learn-tour-card">
            <img src="https://via.placeholder.com/300" alt="Nature Hikes" className="tour-image" />
            <h3>Nature Hikes</h3>
            <p>Experience the beauty of nature on guided hikes.</p>
            <button className="learn-tour-button">Discover More</button>
            <button className="learn-tour-button">Book Now</button>
          </div>
        </div>
      </section>

      <footer className="tour-learn-footer">
        <p>&copy; 2024 Tour and Learn. All rights reserved.</p>
      </footer>
    </div>  
  );
};

export default TourAndLearn;