import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingButton.css';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config'; // Import BASE_URL

const BookingButton = ({ place }) => {
    const [isWished, setIsWished] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleWishlist = (e) => {
        e.stopPropagation();
        setIsWished(!isWished);
    };

    const averageRating = !isNaN(Number(place.average_rating)) ? Number(place.average_rating) : 0;
    const roundedRating = Math.round(averageRating * 10) / 10;
    const priceInDollars = place.price ? (place.price / 150).toFixed(2) : null;

    // Define the full image URL. Use optional chaining for safety.
    const imageUrl = place?.cover_image ? `${BASE_URL}${place.cover_image}` : null;

    return (
        <div className="booking-component">
            {/* Image Section - New Code */}
            {imageUrl && (
                <div 
                    className="booking-image-container" 
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            )}
            
            {/* Rating and Price Section */}
            <div className="booking-header">
                {/* Rating Section */}
                <div className="rating-container">
                    <div className="rating-badge">
                        <FaStar color="#FFD700" size={14} />
                        <span className="rating-value">{roundedRating.toFixed(1)}</span>
                    </div>
                    <span className="review-count">({place.total_reviews || 0} reviews)</span>
                </div>
                {/* Price in Dollars */}
                {priceInDollars && (
                    <div className="price-container">
                        <span className="current-price">KES {place.price}</span>
                    </div>
                )}
            </div>
            {/* Action Buttons */}
            <div className="action-buttons">
                <Link to={`/place/${place.id}`} className="details-btn">
                    Details
                    <FontAwesomeIcon icon={faArrowRight} size="xs" className="arrow-icon" />
                </Link>
                <button
                    onClick={toggleWishlist}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`wishlist-btn ${isWished ? 'is-wished' : ''}`}
                >
                    {isWished ? (
                        <TiTick size={18} />
                    ) : (
                        isHovered ? <FaHeart size={14} /> : <FaRegHeart size={14} />
                    )}
                </button>
                <Link to={`/booking?placeName=${encodeURIComponent(place.name)}&placeId=${place.id}`} className="book-now-btn">
                    Book Now
                </Link>
            </div>
        </div>
    );
};

export default BookingButton;