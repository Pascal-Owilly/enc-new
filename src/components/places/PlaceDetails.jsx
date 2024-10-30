import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './PlaceDetails.css'; // Import CSS for styling

const PlaceDetails = () => {
  const { id } = useParams(); // Get place ID from route params
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null); // State for weather data

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`${BASE_URL}places/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const data = await response.json();
        setPlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchPlace();
  }, [id]);

  // Show loading spinner while fetching
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Show error message if there's an issue
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Show a message when no place details are found
  if (!loading && !place) {
    return <div className="empty-message">No details available for this place.</div>;
  }

  return (
    <div className="place-details-container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${place.cover_image})`, // Dynamically set background image
          animation: "moveBackground 30s linear infinite" // Apply the animation
        }}
      >
        <div className="hero-overlay d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <h1 className="place-title display-4">{place.name}</h1>
            <p className="place-location">{place.location}</p>
          </div>
        </div>
      </div>

      {/* Place Details */}
      <div className="container my-4">
        <div className="place-info">
          <p className="place-description">{place.description}</p>
          <div className="place-meta mb-4">
            <p><strong>Price:</strong> {place.price ? `Ksh${place.price}` : 'N/A'}</p>
            <p><strong>Rating:</strong> {place.rating || 'Not Rated'}</p>
          </div>
          <button className="btn btn-primary btn-lg">Book Now</button>
        </div>
      </div>


        {/* Weather Forecast */}
        {/* {weather && ( */}
          <div className="weather-forecast-card">
            <h2>Current Weather in {place.name}</h2>
            <div className="weather-info">
              <div className="weather-temp">
                <span>26°C</span>
                {/* <img src={`https://your-icon-url.com/${weather.icon}.png`} alt={weather.summary} /> */}
              </div>
              <div className="weather-details">
                <p>Sunny in the morning hours</p>
                <p><strong>Humidity:</strong> 15%</p>
                <p><strong>Wind Speed:</strong> 21 m/s</p>
                <p><strong>UV Index:</strong> 67</p>
              </div>
            </div>
          </div>
        {/* )} */}
    </div>
  );
};

export default PlaceDetails;
