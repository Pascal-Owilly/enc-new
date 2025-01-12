import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingButton.css';
import { FaStar, FaHeart } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BookingButton = ({ place }) => {
    const [isWished, setIsWished] = useState(false);

    const toggleWishlist = () => {
        setIsWished(!isWished);
        // Logic to save to a wishlist in the backend or local storage can be added here
    };

    // Debugging log
    console.log('Place Object:', place);
    console.log('Average Rating:', place.average_rating);

    // Validate average rating
    const averageRating = !isNaN(Number(place.average_rating)) ? Number(place.average_rating) : 0;

    return (
        <div className="booking-component">
            <div className="place-detail">
                {/* Display Rating (Play Store Style) */}
                <div className="rating">
                    <span className="stars">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                color={index < Math.round(averageRating) ? '#FFD700' : '#ccc'}
                            />
                        ))}
                    </span>
                    <span className="rating-value">{averageRating.toFixed(1)}</span>
                    <span className="views">({place.total_reviews || 0} Visitors)</span>
                    <span
                        className={`wishlist-button ${isWished ? 'wished' : ''}`}
                        onClick={toggleWishlist}
                    >
                        {isWished ? <TiTick /> : <FaHeart />}
                    </span>
                </div>
                {/* Reviews Link */}
                <div className="view-reviews-link">
                    <Link to={`/place/${place.id}/reviews`}>
                        <span>{place.total_reviews || 0} reviews</span>
                    </Link>
                </div>
            </div>
            <div className="footer">
                <Link to={`/place/${place.id}`}>
                    <span className="details-button">
                    More <br />  <FontAwesomeIcon icon={faArrowRight} className="forward-arrow text-primary" />
                        
                        </span>
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

export default BookingButton;
