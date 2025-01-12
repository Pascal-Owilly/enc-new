import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const OutdoorAdventures = () => {
  const [adventures, setAdventures] = useState([]); // State to store fetched adventures
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const category = "outdoor_adventures";
  const [error, setError] = useState(null); // State for any errors during data fetching
  const itemsPerPage = 6; // Items per page for pagination

  // Fetch outdoor adventures from backend API
  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        // Assuming the backend returns an array of adventures
        setAdventures(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchAdventures();
  }, []); // Empty dependency array means this runs once after component mounts

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the adventures array to get the items to show on the current page
  const currentAdventures = adventures.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(adventures.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faMountain} /> Outdoor Adventures
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : adventures.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" className="text-warning mb-3" />
          <h4>No Outdoor Adventure Available</h4>
          <p>Currently, there are no outdoor adventures to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentAdventures.map(adventure => (
            <Col key={adventure.id}>
              <div className="destination-card">
                <img 
                  src={adventure.imageUrl || 'https://assets.codepen.io/4787486/oak_1.jpg'} 
                  alt={adventure.name} 
                  className="img-fluid mb-3" 
                />
                <h5>{adventure.name}</h5>
                <Badge bg="success">⭐ {adventure.rating}</Badge>
                <p>{adventure.description}</p>
                <p>Duration: {adventure.duration}</p>
                <BookingButton place={adventure} />
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

export default OutdoorAdventures;
