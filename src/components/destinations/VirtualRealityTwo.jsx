import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './Vr.css';

function VRPageTwo() {
  return (
    <div className="page-two">
      {/* Full Background Image Section */}
       {/* Section Content */}
    

      <section className="web-design-info">
       
      </section>
      <div className="vr-background">
        <Carousel indicators={true} controls={true} interval={3000} nextIcon={<span className="carousel-control-next-icon" />} prevIcon={<span className="carousel-control-prev-icon" />} fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Immersive Virtual Reality Awaits</h3>
              <p>Step into a new world with our cutting-edge VR experiences.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x400"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Explore Beyond Your Imagination</h3>
              <p>Discover how VR is revolutionizing the way we experience digital content.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x400"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Ready to Dive Into the Future?</h3>
              <p>Get ready for an unforgettable journey with virtual reality.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* "Book Now" Button */}
        <div className="cta-container">
          <Button className="cta-button" size="lg" variant="primary">Book Now</Button>
        </div>
      </div>

     
    </div>
  );
}

export default VRPageTwo;
    