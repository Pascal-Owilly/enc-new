import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import './GroupBookings.css';

const GroupBookings = () => {
    const [adventures, setAdventures] = useState([]);
    const [wishlisted, setWishlisted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const category = "group_booking";
    
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(adventures.length / itemsPerPage);

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}api/places/filter_by_category/?category=${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch adventures');
                }
                const data = await response.json();
                setAdventures(data);
                setWishlisted(Array(data.length).fill(false));
            } catch (error) {
                console.error('Error fetching adventures:', error);
                setError('Failed to load adventures. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdventures();
    }, [category]);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = adventures.slice(startIndex, startIndex + itemsPerPage);

    const AdventureItem = ({ title, description, size, image, adventure }) => (
        <div className="group-card shadow-sm border-0 w-100"
        style={{margin:'auto', width:'90%'}}> {/* Full width */}
            <img src={`${BASE_URL}${image}`} alt={title} className="card-img-top" />
            <div className="card-header">
                <h5>{title}</h5>
            </div>
            <div className="card-body">
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">Group Size: {size}</small></p>
            </div>
            <div className="card-footer text-center">
                <BookingButton place={adventure} />
            </div>
        </div>
    );

    return (
        <div className="container-fluid text-center">
            <h1 className="text-dark mb-2 group-title all-headings4 mb-4">Group Bookings</h1>
            <p className="lead mb-5">
                Plan unforgettable trips with your friends, family, or colleagues. Enjoy exclusive group rates and personalized itineraries!
            </p>
            {loading ? (
                <div className="dot-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <div className="row g-2">
                    {adventures.length > 0 ? (
                        currentItems.map((adventure, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4" key={adventure.id}>
                                <AdventureItem
                                    title={adventure.name}
                                    description={adventure.description}
                                    size={adventure.size}
                                    image={adventure.pictures}
                                    adventure={adventure}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No group bookings found.</p>
                    )}
                </div>
            )}

            <div className="pagination">
                <button className="btn btn-sm btn-info" onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                <button className="btn btn-sm btn-info" onClick={handleNext} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default GroupBookings;
