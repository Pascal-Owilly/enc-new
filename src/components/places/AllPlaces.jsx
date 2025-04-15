import React, { useEffect, useState, useRef } from 'react';
import './AllPlaces.css';
import { FaFrown } from 'react-icons/fa';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
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
                const response = await fetch(`${BASE_URL}/api/places/?page=${page}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaces((prev) => [...prev, ...data]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setLoadingMore(false);
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
            setLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const currentObserver = observer.current;
        const options = { root: null, rootMargin: '20px', threshold: 1.0 };

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
   <div className="new-places-container">
    <h3 className="">Explore All Amazing Destinations</h3>
    <hr />
    
    <div className="filter-sort-sectin" style={{
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <div className="filter-options" style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: 'auto'
        }}>
            <input
                type="text"
                placeholder="Search by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    width: '30%',
                    boxSizing: 'border-box',
                    marginRight: '15px'
                }}
            />
            <select
                onChange={(e) => setPriceRange(JSON.parse(e.target.value))}
                style={{
                    padding: '10px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    background: '#fff',
                    color: '#333',
                    boxSizing: 'border-box',
                    marginRight: '15px'
                }}
            >
                <option value="[0,Infinity]">All Prices</option>
                <option value="[0, 5000]">Under Ksh5000</option>
                <option value="[5000, 10000]">Ksh5000 - Ksh10000</option>
                <option value="[10000, 20000]">Ksh10000 - Ksh20000</option>
            </select>
            <select
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    background: '#fff',
                    color: '#333',
                    boxSizing: 'border-box'
                }}
            >
                <option value="">Sort by</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
            </select>
        </div>
    </div>

    {/* Places Listing */}
    <div className="new-places-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px',
    }}>
        {filteredPlaces.map((place) => (
            <div key={place.id} className="new-card" style={{
                background: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
                {/* Image and overlay */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage: `url(${place.cover_image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        position: 'relative',
                        borderRadius: '8px 8px 0 0',
                    }}
                >
                    <div className="card-overlay" style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '10px',
                        borderRadius: '5px',
                    }}>
                        <div className="new-location"><FaMapMarkerAlt style={{ color: 'goldenrod' }} />  {place.location}</div>
                        <div className="new-name">{place.name}</div>
                    </div>
                </div>

                {/* Price */}
                <span className="price" style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    padding: '10px 15px',
                }}>
                    KES {place.price ? `${place.price}` : "Price upon request"}
                </span>

                {/* Booking Button */}
                <BookingButton place={place} />
            </div>
        ))}
    </div>

    {/* Loading Indicator */}
    {loadingMore && (
        <div className="dot-loader" style={{
            textAlign: 'center',
            marginTop: '30px',
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )}

    {/* Scroll Trigger */}
    <div ref={observer} style={{
        height: '20px',
        margin: '20px 0',
    }}></div>

    {/* See All Buttons */}
    <div className="see-all-buttons" style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
    }}>
        <a href="/destinations/culinary-tours" className="see-all-btn" style={{
            padding: '10px 20px',
            backgroundColor: '#2575fc',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            textAlign: 'center',
        }}>
            See All Culinary Tours
        </a>
        <a href="/destinations/vr-2" className="see-all-btn" style={{
            padding: '10px 20px',
            backgroundColor: '#2575fc',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            textAlign: 'center',
        }}>
            See All VR Tours
        </a>
        <a href="/destinations/micro-adventure" className="see-all-btn" style={{
            padding: '10px 20px',
            backgroundColor: '#2575fc',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            textAlign: 'center',
        }}>
            See All Micro Adventures
        </a>
    </div>
</div>
);

};

export default AllPlaces;
