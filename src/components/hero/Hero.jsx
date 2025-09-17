import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Hero.css';
import Blogs from '../../components/blogs/Blogs';

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Adventures');
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search input

  const navigate = useNavigate(); // Hook to get the navigate function

  useEffect(() => {
    const particlesContainer = document.getElementById('hero-particles-3');
    const numberOfParticles = 30;

    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle-3');
      
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 10 + 15;
      particle.style.animationDuration = `${duration}s`;
      
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    console.log(`Selected category: ${category}`);
  };

  // New function to handle input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Updated function to handle the search action
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // The `Maps` function is used to change the URL.
      // This will take the user to a route like `/search?query=hiking`.
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      
      // Optionally reload the page to ensure fresh data, as in the inspiration.
      window.location.reload(); 
    } else {
      alert("Please enter a search query.");
    }
  };

  // Optional: Handle search on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

return (
  <section className="hero-3">
    <div className="hero-particles-3" id="hero-particles-3"></div>
    {/* Correct placement: All content is now inside the container */}
    <div className='container-fluid hero-content-3'>
      <h1>
        Discover your <span className="hero-highlight-3">passion</span> and bring it to <span className="hero-highlight-3">life</span>
      </h1>
      <p className="hero-subtitle-3">
        Transform your hobbies into unforgettable adventures — experiences so good, you’ll never want to stop.
      </p>

      <div className="hero-search-box-3">
        <input
          type="text"
          className="hero-search-input-3"
          placeholder="What adventure are you looking for?"
          id="searchInput-3"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="hero-search-btn-3" onClick={handleSearch}>
          Explore
        </button>
      </div>

      <div className="hero-categories-">
        <Blogs />
      </div>
    </div>
  </section>
);
};

export default HeroSection;