import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './PlaceDetails.css'; // Import CSS for styling

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}api/places/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const data = await response.json();
        setPlace(data);
        
        // Optionally, fetch the weather data here if required
        // const weatherResponse = await fetch(`...`); // Adjust the URL to fetch weather
        // const weatherData = await weatherResponse.json();
        // setWeather(weatherData);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!place) {
    return <div className="empty-message">No details available for this place.</div>;
  }

  return (
    <div className="place-details-container">
      <div className="hero-section"
           style={{ backgroundImage: `url(${place.cover_image})`, animation: "moveBackground 30s linear infinite" }}>
        <div className="hero-overlay">
          <div className="text-center text-white">
            <h1 className="place-title">{place.name}</h1>
            <p className="place-location">{place.destination}</p>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="place-info">
          <p className="place-description">{place.description}</p>
          <div className="place-meta mb-4">
            <p><strong>Price:</strong> Ksh {place.price ? place.price : 'N/A'}</p>
            <p><strong>Average Rating:</strong> {place.average_rating || 'Not Rated'}</p>
            <p><strong>Total Reviews:</strong> {place.total_reviews || 0}</p>
            {weather && <p><strong>Weather Forecast:</strong> {weather.forecast || 'N/A'}</p>}
          </div>
          <button className="btn btn-primary btn-lg">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;