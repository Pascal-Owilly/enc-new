// src/BookingComponent.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingButton.css'; 
import { FaHeart, FaStar } from 'react-icons/fa'; 
import { TiTick } from 'react-icons/ti'; // Import tick icon

const BookingComponent = ({ place }) => {
    const [isWished, setIsWished] = useState(false);

    const toggleWishlist = () => {
        setIsWished(!isWished);
        // Logic to save to a wishlist in the backend or local storage can be added here
    };

    return (
        <div className="booking-component">
            <div className="place-detail">
                <div className="rating">
                    <span className="ratings">
                        {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color={index < place.rating ? '#FFD700' : '#ccc'} />
                        ))}
                    </span>
                    <span className="views">({place.visits} views)</span>
                    <span 
                        className={`wishlist-button ${isWished ? 'wished' : ''}`} 
                        onClick={toggleWishlist}
                    >
                        {isWished ? <TiTick /> : <FaHeart />}
                    </span>
                </div>
            </div>
            <div className="footer">
                <Link to={`/place/${place.id}`}>
                    <span className="details-button">View Details</span>
                </Link>
                <Link 
                    to={{
                        pathname: `/booking`,
                        search: `?placeName=${encodeURIComponent(place.name)}&placeId=${place.id}`
                    }}
                >
                    <button className="booking-button btn btn-sm">Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default BookingComponent;