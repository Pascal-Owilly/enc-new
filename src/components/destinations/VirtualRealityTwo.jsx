import React, { useState, useEffect } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './Vr.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

function VRPageTwo() {
  const [vr, setVr] = useState([]); // State to store fetched VR data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const category = "virtual_reality"; // Correct category spelling
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchVrData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        setVr(data); // Set VR data to the state
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchVrData(); // Fetch VR data on mount
  }, []);

  return (
    <div className="page-two">
      {/* Full Background Image Section */}
      <section className="web-design-info">
        {/* Section content could be placed here */}
      </section>
      
      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : vr.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No VRs Available</h4>
          <p>Currently, there are no Virtual Reality events to display. Please check back later.</p>
        </div>
      ) : (
        <div className="vr-background">
          <Carousel indicators={true} controls={true} interval={3000} nextIcon={<span className="carousel-control-next-icon" />} prevIcon={<span className="carousel-control-prev-icon" />} fade>
            {vr.slice(0, itemsPerPage).map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.cover_image} // Fallback image
                  alt={`Slide ${index + 1}`}
                />
                <Carousel.Caption>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <BookingButton place={item} />

                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

        </div>
      )}
    </div>
  );
}

export default VRPageTwo;
