import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const CulturalExchange = () => {
  const [exchanges, setExchanges] = useState([]); // State to store fetched exchanges
  const [currentPage, setCurrentPage] = useState(1); // State for page number
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const category = "cultural_exchange"; // Category for cultural exchange
  const itemsPerPage = 6; // Number of items per page

  // Fetch the cultural exchange data from the backend API
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentExchanges = exchanges.slice(firstIndex, lastIndex); // Get current page exchanges

  const totalPages = Math.ceil(exchanges.length / itemsPerPage); // Calculate total pages

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faExchangeAlt} /> Cultural Exchange
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : exchanges.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faExchangeAlt} size="3x" className="text-warning mb-3" />
          <h4>No Cultural Exchange Available</h4>
          <p>Currently, there are no cultural exchange events to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentExchanges.map((exchange) => (
            <Col key={exchange.id}>
              <div className="exchange-card">
                <h5>{exchange.name}</h5>
                <Badge bg="success" className="mb-2">
                  ⭐ {exchange.rating}
                </Badge>
                <p>{exchange.description}</p>
                <p>
                  <strong>Duration:</strong> {exchange.duration}
                </p>

                {/* Image Gallery */}
                <Row xs={1} sm={2} md={3} className="g-2">
                  {exchange.images.map((image, index) => (
                    <Col key={index}>
                      <img
                        src={image}
                        alt={`${exchange.name} ${index + 1}`}
                        className="gallery-img"
                      />
                    </Col>
                  ))}
                </Row>

                {/* Book Button */}
                <div className="text-center mt-3">
                <BookingButton place={exchange} />

                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination Controls */}
      <div className="pagination text-center mt-4">
        <Button 
          variant="outline-primary" 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button 
          variant="outline-primary" 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default CulturalExchange;
