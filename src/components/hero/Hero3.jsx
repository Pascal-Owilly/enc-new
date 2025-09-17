import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './Hero.css';

// Images
import culinary from './hero1.jpg';
import vr from './hero2.jpg';
import farm from './farm.jpg';
import art from './art.jpg';
import adventure from './adventure.jpg';

const slides = [
  {
    image: culinary,
    name: "The Flavor Hunter",
    description: "For those who chase spices, stories, and secret recipes.",
    link: "/destinations/culinary-tours",
  },
  {
    image: vr,
    name: " Virtual Worlds & Sports ",
    description: "Reality? Overrated. You see dimensions the rest of us dream about.",
    link: "/destinations/local-sports",
  },
  {
    image: farm,
    name: "Farmers Markets",
    description: "You don't shop—you forage with flair and local love.",
    link: "/destinations/farmers-markets",
  },
  {
    image: art,
    name: "Art Enthusiast",
    description: "Your soul finds meaning in strokes, colors, and creativity.",
    link: "/destinations/art-workshops",
  },
  {
    image: adventure,
    name: "Outdoor Adventurer",
    description: "You thrive in trails, detours, and nature’s surprises.",
    link: "/destinations/outdoor-adventures",
  },
];


export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSlideChange = (newIndex) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTransitioning(false);
    }, 300);
  };

  const goToPreviousSlide = () => {
    handleSlideChange((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    handleSlideChange((currentIndex + 1) % slides.length);
  };

  return (
    <div className="hero-section">
      {/* Slides */}
      <div className="hero-slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''} ${transitioning ? 'transitioning' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`hero-content ${transitioning ? 'fade-out' : 'fade-in'}`}>
        <h3 className="hero-title">{slides[currentIndex].name}</h3>
        <p className="hero-description">{slides[currentIndex].description}</p>

        <Link to={slides[currentIndex].link} className="hero-link">
          <button className="hero-button">
            <span>Explore</span>
            <ArrowRight className="hero-button-icon" />
          </button>
        </Link>
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-grid">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          >
            <div
              className="thumbnail-image"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="thumbnail-overlay" />
            <div className="thumbnail-badge">{slide.name}</div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>

      {/* Controls */}
      <button className="control-btn prev-btn" onClick={goToPreviousSlide} aria-label="Previous Slide">
        <ArrowLeft />
      </button>
      <button className="control-btn next-btn" onClick={goToNextSlide} aria-label="Next Slide">
        <ArrowRight />
      </button>
    </div>
  );
}
