import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './Hero.css';
import culinary from './hero1.jpg';
import vr from './hero2.jpg';
import farm from './farm.jpg';
import hiking from './hiking.jpg';
import car from './car.jpg';

const images = [
  culinary,
  vr,
  farm,
  hiking,
  car
];

const captions = [
  "Indulge in Exquisite Culinary Delights!",
  "Explore the Wonders of Virtual Reality!",
  "Discover Vibrant Farmers Markets!",
  "Embark on Breathtaking Nature Hikes!",
  "Unleash Your Spirit of Adventure on the Road!"
];

// Define links for each slide
const links = [
  '/destinations/culinary-tours',  // Link for culinary image
  '/destinations/vr-2',  // Link for VR image
  '/destinations/farmers-markets',  
  '/destinations/nature-hikes',  // Link for hiking image
  '/destinations/outdoor-adventures'  // Link for car image
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="position-relative hero-section" style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="position-absolute bottom-0 w-100"
        style={{
          height: '90%',
          background: 'linear-gradient(to top, rgba(0, 0, 139, 0.9), transparent)',
        }}
      ></div>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white text-center p-4 position-relative">
        <h3 className="display-3 font-weight-bold mb-4 text-white">
          {captions[currentIndex]}
        </h3>

        <p className="lead mb-4 text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Explore stunning destinations and create unforgettable memories.
        </p>

        <Link to={links[currentIndex]} style={{ listStyleType: 'none', textDecoration: 'none' }}>
          <button className="btn btn-light get-started-btn btn-lg d-flex align-items-center">
            <span>Explore</span>
            <ArrowRight className="ml-2" />
          </button>
        </Link>

        {/* Controls */}
        <div className="position-absolute bottom-4 w-100 d-flex justify-content-between px-4">
          <button 
            className="control-btn prev-btn mt-3"
            onClick={goToPreviousSlide}
            aria-label="Previous Slide"
          >
            <ArrowLeft />
          </button>
          <button 
            className="control-btn next-btn mt-3"
            onClick={goToNextSlide}
            aria-label="Next Slide"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
