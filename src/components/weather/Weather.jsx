import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './Weather.css'; // Import custom CSS

const WeatherComponent = () => {
  const { place_name } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}weather-forecast/${place_name}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [place_name]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!weather) {
    return <div className="empty-message">No weather data available for this place.</div>;
  }

  return (
    <div className="weather-card">
      <h2 className="weather-location">{place_name}</h2>
      <img 
        className="weather-icon" 
        src={`https://path/to/icons/${weather.icon}.png`} 
        alt="weather-icon" 
      />
      <div className="weather-info">
        <p><strong>Temperature:</strong> {weather.temperature_celsius}°C</p>
        <p><strong>Summary:</strong> {weather.summary}</p>
        <p><strong>Humidity:</strong> {weather.humidity}%</p>
        <p><strong>Wind Speed:</strong> {weather.windSpeed} km/h</p>
        <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherComponent;
