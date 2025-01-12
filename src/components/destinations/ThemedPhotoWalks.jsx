import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import './ThemedPhotoWalks.css'; // CSS for specific styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const ThemedPhotoWalks = () => {
  const [walks, setWalks] = useState([]); // State to store fetched walks
  const [currentPage, setCurrentPage] = useState(1); // State for page number
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const category = "themed_photo_walks"; // Category for themed photo walks
  const itemsPerPage = 6; // Number of items per page

  // Fetch the themed photo walks data from the backend API
  useEffect(() => {
    const fetchWalks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        setWalks(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWalks();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentWalks = walks.slice(firstIndex, lastIndex); // Get current page walks

  const totalPages = Math.ceil(walks.length / itemsPerPage); // Calculate total pages

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faCameraRetro} /> Themed Photo Walks
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : walks.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faCameraRetro} size="3x" className="text-warning mb-3" />
          <h4>No Themed Photo Walks Available</h4>
          <p>Currently, there are no themed photo walks to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentWalks.map((walk) => (
            <Col key={walk.id}>
              <div className="photo-walk-card">
                <h5>{walk.name}</h5>
                <Badge bg="success" className="mb-2">⭐ {walk.rating}</Badge>
                <p>{walk.description}</p>
                <p><strong>Duration:</strong> {walk.duration}</p>
                
                <Row xs={1} sm={2} md={3} className="g-2">
                  {walk.images.map((image, index) => (
                    <Col key={index}>
                      <img src={image} alt={`${walk.name} ${index + 1}`} className="gallery-img" />
                    </Col>
                  ))}
                </Row>
                
                {/* Book Button */}
                <div className="text-center mt-3">
                <BookingButton place={walk} />
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

export default ThemedPhotoWalks;
