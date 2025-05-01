import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingButton.css';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BookingButton = ({ place }) => {
    const [isWished, setIsWished] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleWishlist = (e) => {
        e.stopPropagation();
        setIsWished(!isWished);
        // Add wishlist logic here
    };

    // Calculate average rating safely
    const averageRating = !isNaN(Number(place.average_rating)) ? Number(place.average_rating) : 0;
    const roundedRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal

    // Convert price to dollars (assuming 1 USD = 150 KES for example)
    const priceInDollars = place.price ? (place.price / 150).toFixed(2) : null;

    return (
        <div className="booking-component" style={{
            fontFamily: "'Poppins', sans-serif",
            width: '100%',
        }}>
            {/* Rating and Price Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
            }}>
                {/* Rating Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 215, 0, 0.15)',
                        padding: '6px 10px',
                        borderRadius: '20px',
                    }}>
                        <FaStar color="#FFD700" size={14} />
                        <span style={{
                            marginLeft: '5px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                        }}>
                            {roundedRating.toFixed(1)}
                        </span>
                    </div>

                    <span style={{
                        fontSize: '13px',
                        color: '#666',
                    }}>
                        ({place.total_reviews || 0} reviews)
                    </span>
                </div>

                {/* Price in Dollars */}
                {priceInDollars && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        <span style={{
                            fontSize: '14px',
                            color: '#666',
                            textDecoration: 'line-through',
                            opacity: 0.7,
                        }}>
                            ${(priceInDollars * 1.2).toFixed(2)}
                        </span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#FF7E5F',
                            backgroundColor: 'rgba(255, 126, 95, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '6px',
                        }}>
                            ${place.price}
                        </span>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
            }}>
                <Link 
                    to={`/place/${place.id}`}
                    style={{
                        flex: 1,
                        textDecoration: 'none',
                    }}
                >
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'transparent',
                        border: '1px solid #4A90E2',
                        borderRadius: '8px',
                        color: '#4A90E2',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        }
                    }}>
                        Details
                        <FontAwesomeIcon icon={faArrowRight} size="xs" />
                    </button>
                </Link>

                <button 
                    onClick={toggleWishlist}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isWished ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                        border: `1px solid ${isWished ? '#4A90E2' : '#ddd'}`,
                        borderRadius: '8px',
                        color: isWished ? '#4A90E2' : '#666',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            borderColor: '#4A90E2',
                            color: '#4A90E2',
                        }
                    }}
                >
                    {isWished ? (
                        <TiTick size={18} />
                    ) : (
                        isHovered ? <FaHeart size={14} /> : <FaRegHeart size={14} />
                    )}
                </button>

                <Link 
                    to={`/booking?placeName=${encodeURIComponent(place.name)}&placeId=${place.id}`}
                    style={{
                        flex: 1,
                        textDecoration: 'none',
                    }}
                >
                    <button style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4A90E2',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                            backgroundColor: '#3a80d6',
                            transform: 'translateY(-1px)',
                        }
                    }}>
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BookingButton;