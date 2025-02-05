import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/config';

const HeroSection = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroText, setHeroText] = useState(""); 
  const [images, setImages] = useState([]); // Store image URLs
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch the hero section data from the API
    axios.get(`${BASE_URL}api/hero/`) 
      .then(response => {
        const data = response.data;
        setImageIndex(data.image_index); 
        setHeroText(data.hero_text); 
        setImages([data.image1, data.image2, data.image3]); 
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the hero section data:", error);
        setLoading(false); // Stop loading even on error
      });
  }, []); // Empty dependency array ensures it runs only once on component mount

  // Check if the data is still loading, if so show a loading message
  if (loading) {
    return (
      <div className="hero-container">
        <div className="hero-contents text-center">
          <h1> <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
      </div></h1>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-container">
      <div
        className="hero-image"
        style={{
          backgroundImage: images[imageIndex] ? `url(${images[imageIndex]})` : 'none', // Add fallback for missing images
        }}
      ></div>

      <div className="hero-contents">
        {/* Hero text */}
        <h1 className="text-center" style={{ color: '#fff', fontWeight: 'bold' }}>{heroText}</h1>
        
        {/* Category buttons */}
        <div className="category-icons">
          <Link to="/destinations/culinary-tours">
            <button className="category-button">🍽️ Culinary</button>
          </Link>
          <Link to="/itineraries/family">
            <button className="category-button">👨‍👩‍👧 Family</button>
          </Link>
          <Link to="/destinations/cultural-exchange">
            <button className="category-button">🌍 Cultural</button>
          </Link>
          <Link to="/all-places">
            <button className="category-button">
              <FontAwesomeIcon icon={faArrowRight} className="forward-arrow text-dark" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
