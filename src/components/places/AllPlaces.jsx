import React, { useEffect, useState, useRef } from 'react';
import './AllPlaces.css';
import { FaFrown } from 'react-icons/fa';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const AllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false); // State for loading more places
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, Infinity]);
    const [sortOption, setSortOption] = useState('');
    const [page, setPage] = useState(1);
    const placesPerPage = 8;
    const observer = useRef();

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}api/places/?page=${page}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaces((prev) => [...prev, ...data]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setLoadingMore(false); // Reset loadingMore after fetching
            }
        };

        fetchPlaces();
    }, [page]);

    const filteredPlaces = places
        .filter((place) => 
            place.name.toLowerCase().includes(filter.toLowerCase()) && 
            (!ratingFilter || place.rating >= ratingFilter) &&
            place.price >= priceRange[0] && place.price <= priceRange[1]
        )
        .sort((a, b) => {
            if (sortOption === 'priceLowToHigh') return a.price - b.price;
            if (sortOption === 'priceHighToLow') return b.price - a.price;
            if (sortOption === 'popular') return b.popularity - a.popularity;
            if (sortOption === 'visited') return b.visits - a.visits;
            if (sortOption === 'new') return new Date(b.created_at) - new Date(a.created_at);
            return 0;
        });

    const loadMorePlaces = (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading) {
            setLoadingMore(true); // Set loadingMore before incrementing the page
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const currentObserver = observer.current;
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const intersectionObserver = new IntersectionObserver(loadMorePlaces, options);
        if (currentObserver) {
            intersectionObserver.observe(currentObserver);
        }

        return () => {
            if (currentObserver) {
                intersectionObserver.unobserve(currentObserver);
            }
        };
    }, [observer]);

    if (loading && places.length === 0) return (
        <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );

    if (error) return <div className="error-message">Error: {error}</div>;

    if (!loading && filteredPlaces.length === 0) {
        return (
            <div className="no-places-found text-center">
                <FaFrown size={50} color="#ccc" />
                <p>No places found. Please try a different search or filter.</p>
                <a href="/all-places">Back</a>
            </div>
        );
    }

    return (
        <div className="places-container">
            <h1 className="page-title">Explore All Amazing Destinations</h1>
            <hr />
            <div className="filter-sort-section">
                <div className="filter-options">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {/*<select onChange={(e) => setRatingFilter(e.target.value)}>
                        <option value="">Filter by Rating</option>
                        <option value="4">4 stars & above</option>
                        <option value="3">3 stars & above</option>
                    </select>*/}
                    <select onChangenge={(e) => setPriceRange(JSON.parse(e.target.value))}>
                        <option value="">Price Range</option>
                        <option value="[0, 5000]">Under Ksh5000</option>
                        <option value="[5000, 10000]">Ksh5000 - Ksh10000</option>
                        <option value="[10000, 20000]">Ksh10000 - Ksh20000</option>
                    </select>
                </div>

                <div className="sort-options">
                    <select onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Sort by</option>
                       {/* <option value="popular">Most Popular</option>
                        <option value="visited">Most Visited</option>
                        <option value="new">New</option>*/}
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="all-places-grid">
                {filteredPlaces.map((place, index) => (
                    <a href={`/places/${place.id}`} className="all-places-card" style={{ textDecoration: 'none', width: '300px' }} key={index}>
                        <div
                            className={`category-${place.name ? place.name.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
                            style={{
                                backgroundImage: `url(${place.cover_image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                height: '300px',
                                color: 'white',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '20px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                            }}
                        >
                            <h3 style={{ margin: '0', fontSize: '1.5em', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>{place.name}</h3>
                            <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#ddd', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{place.description}</p>
                            <span className="price" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                <span className="discount-price" style={{ textDecoration: 'line-through', marginRight: '5px', color: 'rgba(255,255,255,0.7)' }}>{place.originalPrice ? `Ksh${place.originalPrice}` : 'N/A'}</span>
                                <b style={{ color: '#ffcc00' }}>Ksh{place.price}</b>
                            </span>
                            <span className="rating" style={{ fontSize: '0.9em', marginTop: '5px' }}>⭐ {place.rating} / 5</span>
                            <span className="explore-btn" style={{
                                marginTop: '10px',
                                padding: '10px 15px',
                                backgroundColor: 'transparent',
                                border: '1px solid #ddd',
                                color: '#fff',
                                borderRadius: '5px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s',
                            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffd700'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}>
                                Plan My Adventure
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Show loading spinner when loading more places */}
            {loadingMore && (
                <div className="dot-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={observer} style={{ height: '20px', margin: '20px 0' }}></div>
        </div>
    );
};

export default AllPlaces;