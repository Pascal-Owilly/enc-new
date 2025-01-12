// src/AllPlaces.js
import React, { useEffect, useState } from 'react';
import './AllPlaces.css';
import { FaArrowRight, FaFrown } from 'react-icons/fa';
import { BASE_URL } from '../config/config';
import { Link } from 'react-router-dom';
import BookingButton from '../bookings/BookingButton'; 

const AllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, Infinity]);
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 8;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/places/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaces(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

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

    const indexOfLastPlace = currentPage * placesPerPage;
    const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
    const currentPlaces = filteredPlaces.slice(indexOfFirstPlace, indexOfLastPlace);

    const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="loading-spinner">Loading...</div>;
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
        <div className="all-places-container">
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
                    <select onChange={(e) => setRatingFilter(e.target.value)}>
                        <option value="">Filter by Rating</option>
                        <option value="4">4 stars & above</option>
                        <option value="3">3 stars & above</option>
                    </select>
                    <select onChange={(e) => setPriceRange(JSON.parse(e.target.value))}>
                        <option value="">Price Range</option>
                        <option value="[0, 5000]">Under Ksh5000</option>
                        <option value="[5000, 10000]">Ksh5000 - Ksh10000</option>
                        <option value="[10000, 20000]">Ksh10000 - Ksh20000</option>
                    </select>
                </div>

                <div className="sort-options">
                    <select onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Sort by</option>
                        <option value="popular">Most Popular</option>
                        <option value="visited">Most Visited</option>
                        <option value="new">New</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="places-grid">
                {currentPlaces.map((place, index) => (
                    <div className="place-card" key={index}
                    style={{
              
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${place.cover_image})`,
                     
                  }}
                    >
                        <div className="place-details">
                            <h4>{place.name}</h4>
                            <p className='text-white'>{place.description}</p>
                            <div className="price-button-wrapper">
                                <p className="text-white">
                                    <strong>{place.price ? `Ksh${place.price}` : 'N/A'}</strong>
                                </p>
                            </div>
                            <BookingButton place={place} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllPlaces;