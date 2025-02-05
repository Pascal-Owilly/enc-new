import React from "react";
import './HeroBakup.css';
import heroImage from "../../assets/hero/hero2.jpg"; // Import the image

const HomePage = () => {  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className="hero-container-bg"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Correctly set the background image
      >
        <div className="hero-content">
          <h1>Find Your Perfect Getaway</h1>
          <p className='text-light'>Discover breathtaking destinations with unbeatable deals.</p>
          <span className="cta-button">Get Started</span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
