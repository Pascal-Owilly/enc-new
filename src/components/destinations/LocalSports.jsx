import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import './LocalSports.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const LocalSports = () => {
  const [sports, setSports] = useState([]); // State to store fetched sports
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State for any errors during data fetching
  const category = "local_sports_events"; // Set the category to local sports events
  const itemsPerPage = 6; // Items per page for pagination

  // Fetch local sports events from backend API
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        // Assuming the backend returns an array of sports events
        setSports(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSports();
  }, []); // Empty dependency array means this runs once after component mounts

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the sports array to get the items to show on the current page
  const currentSports = sports.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sports.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faFutbol} /> Local Sports</h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : sports.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faFutbol} size="3x" className="text-warning mb-3" />
          <h4>No Local Sports Events Available</h4>
          <p>Currently, there are no local sports events to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={2} lg={2} className="g-4">
          {currentSports.map(sport => (
            <Col key={sport.id}>
              <div className="sports-card">
                <Row>
                  <Col md={6}>
                    <img 
                      src={sport.imageUrl || 'https://via.placeholder.com/600x400'} 
                      alt={sport.name} 
                      className="img-fluid mb-3 rounded"
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{sport.name}</h5>
                    <Badge bg="success" className="mb-3">⭐ {sport.rating}</Badge>
                    <p>{sport.description}</p>
                    <p><strong>Duration:</strong> {sport.duration}</p>
                    <div className="d-flex">
                    <BookingButton place={sport} />

                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
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

export default LocalSports;
