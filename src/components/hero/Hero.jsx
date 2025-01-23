import React, { useState, useEffect } from 'react';
import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import heroImage1 from '../../assets/hero/bg_1.jpg';
import heroImage2 from '../../assets/hero/hero.jpg';
import heroImage3 from '../../assets/hero/hero3.jpg';
import cloudImage from '../../assets/hero/cloud.webp';
import Particles from 'react-tsparticles';
import { Link } from 'react-router-dom';

// import particlesConfig from '../config/ParticlesBackground.jsx';

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroText, setHeroText] = useState("Choose Your Purpose: Culinary Delights, Thrilling Sports, Cultural Journeys, and More!");

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 2);
      setHeroText(imageIndex === 0 ? "New Horizons Await" : "Discover Your Next Adventure");
    }, 5000);

    return () => clearInterval(interval);
  }, [imageIndex]);

  const handlePrevClick = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const handleNextClick = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  return (
    <div className="hero-container">
      
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${imageIndex === 0 ? heroImage3 : heroImage2})`,
          }}></div>

        <div
          className="cloud-image"></div>

      <div className="hero-contents" style={{zIndex:'3'}}>
        <h1 className="" style={{color:'#FFD700', fontWeight:'700'}}>Take a vacation with a purpose</h1>
        <p className='text-center' style={{color:'#fff',fontWeight:'bold'}}>{heroText}</p>
        <div className="category-icons">
      {/* <Link to="/destinations/culinary-tours"> 
        <button className="category-button">🍽️ Culinary</button>
      </Link> */}
      
      <Link to="/destinations/local-sports"> 
        <button className="category-button">⚽ Sports</button>
      </Link>

      <Link to="/itineraries/family"> 
        <button className="category-button">👨‍👩‍👧 Family</button>
      </Link>

      <Link to="/destinations/cultural-exchange"> 
        <button className="category-button">🌍 Cultural</button>
      </Link>

      <Link to="/destinations/all-categories"> 
        <button className="category-button">
        <FontAwesomeIcon icon={faArrowRight} className="forward-arrow text-dark" />
        </button>
      </Link> 
    </div>
      </div>

      {/* Controls */}
      {/* <div className="hero-controls">
        <button className="prev-btn" onClick={handlePrevClick}>
          ◀
        </button>
        <div className="indicator-container">
          <span className={`indicator ${imageIndex === 0 ? 'active' : ''}`}></span>
          <span className={`indicator ${imageIndex === 1 ? 'active' : ''}`}></span>
        </div>
        <button className="next-btn" onClick={handleNextClick}>
          ▶
        </button>
      </div> */}
    </div>
  );
};

export default HeroSection;
