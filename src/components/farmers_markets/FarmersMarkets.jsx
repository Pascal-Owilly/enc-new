import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import './FarmersMarkets.css';
import BookingButton from '../bookings/BookingButton';
import { BASE_URL } from '../config/config';

const FarmersMarketsPage = () => {
  const [adventures, setAdventures] = useState([]); // Backend data
  const [loading, setLoading] = useState(true);
  const category = "farmers_markets";

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch farmers markets');
        }
        const data = await response.json();
        console.log('Farmers markets:', data);
        setAdventures(data);
      } catch (error) {
        console.error('Error fetching farmers markets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, [category]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMarkets = adventures.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(adventures.length / itemsPerPage);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5 farmers-market-page">
      <h2 className="text-center my-5 farmers-market-title">Discover Farmers Markets</h2>
        <p className='text-center'>Explore vibrant farmers markets offering fresh produce, unique crafts, and top-rated experiences—all in one place.</p>
      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : adventures.length === 0 ? (
        <div className="no-data text-center mt-5">
          <FaInfoCircle size={50} color="#6c757d" />
          <p className="mt-3 text-muted">No farmers markets available at the moment. Please check back later!</p>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={4} className="g-4 m-2">
            {currentMarkets.map((market) => (
              <Col key={market.id} className="mb-4">
                <div className="market-card shadow-sm rounded">
                  <img
                    src={`${BASE_URL}${market.imageUrl || market.cover_image}`}
                    alt={market.name}
                    className="market-image rounded-top"
                  />
                  <div className="p-3">
                    <Badge bg="success" className="mb-2">
                      ⭐ {market.average_rating || 'N/A'}
                    </Badge>
                    <h5 className="market-name">{market.name}</h5>
                    <p className="market-location">📍 {market.location || 'Unknown Location'}</p>
                    <p className="market-description">{market.description || 'No description available.'}</p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="card-footer text-center">
                        <BookingButton place={market} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="pagination-container d-flex justify-content-center my-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant="light"
                className={`pagination-button mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default FarmersMarketsPage;
