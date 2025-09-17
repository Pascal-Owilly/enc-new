import React, { useState, useEffect } from 'react';
import './MicroAdventure.css';
import hero2 from '../../assets/hero/hero2.jpg';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import { FaInfoCircle, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const MicroAdventure = () => {
    const [adventures, setAdventures] = useState([]);
    const [wishlisted, setWishlisted] = useState([]);
    const [loading, setLoading] = useState(true);
    const category = "adventure_outdoors";

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
                const data = await response.json();
                setAdventures(data);
                setWishlisted(Array(data.length).fill(false));
            } catch (error) {
                console.error('Error fetching adventures:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAdventures();
    }, [category]);
    

    const toggleWishlist = (index) => {
        const newWishlist = [...wishlisted];
        newWishlist[index] = !newWishlist[index];
        setWishlisted(newWishlist);
    };

    return (
        <div className="micro-adventure-page">
            <div className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">Micro-Adventures</h1>
                    <p className="hero-description">Quick, exciting escapes for busy schedules. Discover hidden gems, local secrets, and make lasting memories without the hassle.</p>
                </div>
            </div>

            <div className="content-section">
                {loading ? (
                    <div className="loading-indicator">
                        <div className="dot-loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                ) : (
                    <div className="adventure-list">
                        {adventures.length > 0 ? (
                            adventures.map((adventure, index) => (
                                <AdventureItem
                                    key={adventure.id}
                                    title={adventure.name}
                                    description={adventure.description}
                                    // Fix applied here: provide a default numeric value
                                    rating={adventure.average_rating || 4.5} 
                                    reviewCount={adventure.total_reviews || 0}
                                    image={adventure.pictures}
                                    wishlisted={wishlisted[index]}
                                    toggleWishlist={() => toggleWishlist(index)}
                                    adventure={adventure}
                                />
                            ))
                        ) : (
                            <div className="no-adventures-found">
                                <FaInfoCircle size={50} color="#6c757d" />
                                <p className="mt-3 text-muted">No adventures found at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const AdventureItem = ({ title, description, rating, reviewCount, image, wishlisted, toggleWishlist, adventure }) => {
    const defaultImage = "https://images.unsplash.com/photo-1517394553531-d85c2c77603c?fit=crop&w=1920&q=80";
    const imageUrl = image ? `${BASE_URL}${image}` : defaultImage;

    return (
        <div className="adventure-card">
            <div className="card-header">
                <img
                    src={imageUrl}
                    alt={title}
                    className="card-image"
                    onError={(e) => (e.target.src = defaultImage)}
                />
                <button className="wishlist-btn" onClick={toggleWishlist}>
                    {wishlisted ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
                </button>
            </div>
            <div className="card-body">
                <div className="card-meta">
                    <span className="location text-dark">{adventure.location}</span>
                    <div className="rating">
                        <FaStar color="#FFD700" />
                        {/* Fix applied here: conditional check for rating type */}
                        <span>{typeof rating === 'number' ? rating.toFixed(1) : 'N/A'}</span>
                    </div>
                </div>
                <h4 className="card-title">{title}</h4>
                <p className="card-description">{description}</p>
                <div className="card-footer">
                    <BookingButton place={adventure} />
                </div>
            </div>
        </div>
    );
};


export default MicroAdventure;