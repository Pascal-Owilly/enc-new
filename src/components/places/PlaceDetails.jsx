import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import Slider from "react-slick"; // Import the slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PlaceDetails.css';
import BookingButton from '../bookings/BookingButton';

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch place details: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched place data:", data); // Log the data here
        setPlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="dot-loader">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!place) {
    return <div className="empty-message">No details available for this place.</div>;
  }

  // Destructure all necessary fields, including 'images'
  const { name, destination, description, price, average_rating, total_reviews, images } = place;

  // Slider settings for React Slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  // Calculate the total image count, including the cover image
  const totalImageCount = (images ? images.length : 0) + (place.cover_image ? 1 : 0);

  return (
    <div className="place-details-page">
      <div className="image-gallery-container">
        {/* Check if images exist before rendering the slider */}
        {images && images.length > 0 ? (
          <div>
            <Slider {...sliderSettings}>
              {images.map((imgObj, index) => (
                <div key={index}>
                  <img
                    src={imgObj.image}
                    alt={`${name} image ${index + 1}`}
                    className="gallery-image"
                  />
                </div>
              ))}
            </Slider>
            <div className="image-count">
              {images.length}
            </div>
          </div>
        ) : (
          <img
            src={place.cover_image || '/default-image.jpg'}
            alt={`${name} cover`}
            className="gallery-image"
          />
        )}
      </div>

      <div className="details-main-content">
        <div className="details-info-box">
          <h2 className="section-title">About the Adventure</h2>
          <p className="description-text">{description}</p>
          <div className="meta-grid">
            <div className="meta-item">
              <strong>Price</strong>
              <span>Ksh {price || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <strong>Rating</strong>
              <span>{average_rating || 'Not Rated'} ({total_reviews || 0} reviews)</span>
            </div>
          </div>
          <div className="booking-btn-container">
            <BookingButton place={place} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;