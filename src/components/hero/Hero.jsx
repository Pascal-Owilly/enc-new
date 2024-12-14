import React, { useState, useEffect } from 'react';
import './Hero.css';
import heroImage1 from '../../assets/hero/bg_1.jpg';
import heroImage2 from '../../assets/hero/hero.jpg';
import heroImage3 from '../../assets/hero/hero3.jpg';
import cloudImage from '../../assets/hero/cloud.webp';
import Particles from 'react-tsparticles';
import particlesConfig from '../config/ParticlesBackground.jsx';

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroText, setHeroText] = useState("Discover Your Next Adventure");

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
      {/* Particle Effect Container */}
      <div className="particle-effect">
        <Particles options={particlesConfig} />
      </div>

        {/* Hero image */}
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${imageIndex === 0 ? heroImage3 : heroImage2})`,
          }}
        ></div>

        {/* Cloud layer */}
        <div
          className="cloud-image"
          // style={{
          //   backgroundImage: `url(${cloudImage})`,
          // }}
        ></div>

      <div className="hero-content">
        <div className="hero-text text-center">
          <h1>{heroText}</h1>
          <p>Explore stunning destinations and create unforgettable memories.</p>
          {/* <button className="btn-explor offer-card ">Explore Now</button> */}

        </div>
      </div>

      {/* Controls */}
      <div className="hero-controls">
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
      </div>
    </div>
  );
};

export default HeroSection;
