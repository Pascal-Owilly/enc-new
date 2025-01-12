import React, { useEffect, useState } from 'react';
import './Itineraries.css'; // Adjust the path as necessary
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const SustainableDestinations = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const category = "sustainable_travels"; // Fixed typo from "sustanable_travels"

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch sustainable tours');
                }
                const data = await response.json();
                setTours(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [category]);

    return (
        <div className="sustainable-destinations">
            <h1>Explore Sustainable Destinations</h1>

            {loading ? (
                <div className="dot-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : error ? (
                <div className="text-danger text-center">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                    <h4>Error: {error}</h4>
                </div>
            ) : tours.length === 0 ? (
                <div className="text-center mt-5">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-warning mb-3" />
                    <h4>No Sustainable Tours Available</h4>
                    <p>Please check back later.</p>
                </div>
            ) : (
                <div className="destinations-list">
                    {tours.map((destination, index) => (
                        <div key={index} className="destination-card">
                            <img src={destination.pictures} alt={destination.name} className="destination-image" />
                            <h2>{destination.name}</h2>
                            <p>{destination.description}</p>
                            <BookingButton place={destination} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SustainableDestinations;