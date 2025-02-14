import React from "react";
import './HeroBakup.css';
import heroImage from "../../assets/hero/hero2.jpg"; // Import the image

const HomePage = () => {
  return (
   <div className="homepage" 
    style={{ backgroundImage: `linear-gradient(135deg, rgba(119, 54, 151), rgba(74, 20, 140))`,
}}
   >

      {/* Hero Section */}
      <section
  className="hero-container-bg"
  style={{
    backgroundImage: `linear-gradient(135deg, rgba(119, 54, 151, 0), rgba(74, 20, 140, 0)), url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    position: "relative",
  }}
>

       <h1 >Unforgettable Experiences Await!</h1>
          <p className='text-white'>
            Discover your interests and explore exciting categories like culinary tours, sports, virtual reality, family fun etc — all at Enceptics!
          </p>
        <div className="hero-content" style={{
          textAlign: 'center',
          color: '#fff',
          paddingTop: '20%',
        }}>
         
          <div className="bouncer-hero" style={{
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
            right: '50%',
            transform: 'translateY(-50%)',
            // animation: 'bounce 1s infinite',
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