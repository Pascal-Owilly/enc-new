import React from "react";
import './HeroBakup.css';
import heroImage from "../../assets/hero/hero2.jpg"; // Import the image

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className="hero-container-bg"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          position: 'relative',
        }}
      >
       <h1 style={{
            fontSize: '3rem', // Large text for visibility
            margin: '0',
            lineHeight: '1.2', // Spacing between lines
          }}>Unforgettable Experiences Await!</h1>
          <p style={{
            fontSize: '1.5rem', // Responsive size
            margin: '10px 0',
            maxWidth: '800px', // Limit width for readability
            marginLeft: 'auto',
            marginRight: 'auto',
            color:'white'
          }}>
            Discover your interests and explore exciting categories like culinary tours, sports, virtual reality, family fun etc — all at Enceptics!
          </p>
        <div className="hero-content" style={{
          textAlign: 'center',
          color: '#fff',
          paddingTop: '20%',
        }}>
         
          <div className="" style={{
            width: '50px',
            height: '50px',
            borderRadius: '100%',
            backgroundColor: 'transparent',
            border: '1px solid #fff',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 1s infinite',
            cursor: 'pointer',
          }}>
            ↓
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;