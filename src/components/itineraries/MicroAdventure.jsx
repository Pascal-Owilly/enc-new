import React, { useState, useEffect } from 'react';
import './MicroAdventure.css';
import hero2 from '../../assets/hero/hero2.jpg'; // Fallback image
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const MicroAdventure = () => {
    const [adventures, setAdventures] = useState([]);
    const [wishlisted, setWishlisted] = useState([]);
    const [loading, setLoading] = useState(true);
    const category = "micro_adventure";

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch(`${BASE_URL}api/places/filter_by_category/?category=${category}`);
                const data = await response.json();
                console.log('Backend Response:', data); // Log the data to inspect
                setAdventures(data);
                setWishlisted(Array(data.length).fill(false));
            } catch (error) {
                console.error('Error fetching adventures:', error);
            } finally {
                setLoading(false); // End loading
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
        <div className="micro-adventure-page container m-auto">
            <header 
                className="hero-banner text-center" 
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '100px',
                }}
            >
                <h4 className="fade-in text-center page-title all-headings fade-in">Micro-Adventure</h4>
            </header>
            <br />

            {loading ? (
                <div className="loading-indicator">
                    <div className="dot-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            {adventures.length > 0 ? (
                                adventures.map((adventure, index) => (
                                    <AdventureItem
                                        key={adventure.id}
                                        title={adventure.name}
                                        description={adventure.description}
                                        rating={adventure.average_rating || "N/A"}
                                        reviewCount={adventure.total_reviews || 0}
                                        image={adventure.pictures}
                                        wishlisted={wishlisted[index]}
                                        toggleWishlist={() => toggleWishlist(index)}
                                        reviewLink={`/reviews/${adventure.id}`} 
                                        adventure={adventure} // Pass the adventure object
                                    />
                                ))
                            ) : (
                                <p>No adventures found.</p>
                            )}
                        </div>
                    </div>  
                    <div className="col-md-2"></div>
                </div>
            )}
        </div>
    );
};

const AdventureItem = ({ title, description, rating, reviewCount, image, wishlisted, toggleWishlist, reviewLink, adventure }) => {
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [reviewing, setReviewing] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (newRating === 0) {
            setError('Please select a rating!');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}profile/reviews/${adventure.id}/add_review/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ rating: newRating, comment: newComment }),
            });

            if (response.ok) {
                const data = await response.json();
                setReviews([...reviews, data]);
                setNewRating(0);
                setNewComment('');
                setError('');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('An error occurred while submitting your review. Please try again.');
        }
    };

    const toggleReviewForm = () => {
        setReviewing(!reviewing);
        setError('');
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BASE_URL}profile/reviews/${adventure.id}/get_reviews/`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [adventure.id]);

    return (
        <div className="col-md-6 mb-4">
            <div className="adventure-item d-flex flex-column flex-md-row align-items-start">
                <div className="adventure-image">
                    <img
                        src={`${BASE_URL}${image}`}
                        alt={title}
                        className="img-fluid rounded"
                        onError={(e) => (e.target.src = hero2)}
                    />
                </div>
                <div className="adventure-text ms-md-3 mt-3 mt-md-0">
                    <h4 className="text-secondary" style={{fontSize:'18px', fontWeight:'600'}}>{title}</h4>
                    <p className="text-dark">{description}</p>
                    <div className="d-flex align-items-center mt-3">
                        <BookingButton place={adventure} />
                    </div>
                </div>
                {error && <div className="error-message alert alert-danger mt-4">{error}</div>}
            </div>
        </div>
    );
};


export default MicroAdventure;
