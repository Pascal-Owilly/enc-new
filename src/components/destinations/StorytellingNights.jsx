import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const StorytellingNights = () => {
  const [nights, setNights] = useState([]); // State to store fetched nights
  const [currentPage, setCurrentPage] = useState(1); // State for page number
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const category = "story_telling_nights"; // Category for storytelling nights
  const itemsPerPage = 6; // Number of items per page

  // Fetch the storytelling nights data from the backend API
  useEffect(() => {
    const fetchNights = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        setNights(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchNights();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentNights = nights.slice(firstIndex, lastIndex); // Get current page nights

  const totalPages = Math.ceil(nights.length / itemsPerPage); // Calculate total pages

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faBook} /> Storytelling Nights
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : nights.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faBook} size="3x" className="text-warning mb-3" />
          <h4>No Storytelling Nights Available</h4>
          <p>Currently, there are no storytelling events to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentNights.map((night) => (
            <Col key={night.id}>
              <div className="destination-card">
                <img
                  src={night.imageUrl}
                  alt={night.name}
                  className="festival-image"
                  style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                />
                <h5 className="mt-3">{night.name}</h5>
                <Badge bg="success">⭐ {night.rating}</Badge>
                <p className="mt-2">{night.description}</p>
                <p>Duration: {night.duration}</p>
                <BookingButton place={night} />
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

export default StorytellingNights;
