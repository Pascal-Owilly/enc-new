import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Vr.css';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

function VRPageTwo() {
    const [vr, setVr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // You can adjust this number as needed
    const category = "sports_entertainment";

    useEffect(() => {
        const fetchVrData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
                const data = await response.json();
                setVr(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        };
        fetchVrData();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vr.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vr.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="page-two modern-look">
            <div className="text-center my-4">
                <h5 className="vr-heading">Step into the Future: The Joy of Virtual Reality</h5>
                <p className="vr-intro m-auto" style={{ maxWidth: '800px' }}>
                    Experience a world beyond imagination, where adventure, creativity, and limitless possibilities come to life.
                </p>
            </div>

            {loading ? (
                <div className="dot-loader"><span></span><span></span><span></span></div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : vr.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>No VRs Available</h4>
                    <p>Currently, there are no Virtual Reality events to display. Please check back later.</p>
                </div>
            ) : (
                <>
                    <div className="vr-carousel">
                        <Carousel indicators controls interval={3000} fade>
                            {vr.slice(0, 3).map((item, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100" src={`${BASE_URL}${item.pictures}`} style={{ height: '300px', objectFit: 'cover' }} alt={item.name} />
                                    <Carousel.Caption>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <BookingButton place={item} />
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    <div className="vr-grid container my-5">
                        {/* Map over the paginated items */}
                        {currentItems.map((item, index) => (
                            <div key={index} className="vr-card">
                                <img className="symbol" src={`${BASE_URL}${item.cover_image}`} alt={item.name} />
                                <h6>{item.name}</h6>
                                <BookingButton place={item} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <nav className="pagination-container my-4 d-flex justify-content-center">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePrevious} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handleNext} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default VRPageTwo;