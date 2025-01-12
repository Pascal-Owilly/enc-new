import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const MusicAndDanceClasses = () => {
  const [classes, setClasses] = useState([]); // State to store fetched classes
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State for any errors during data fetching
  const category = "music_and_dance_classes"; // Set the category to music and dance classes
  const itemsPerPage = 6; // Items per page for pagination

  // Fetch music and dance classes from backend API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        // Assuming the backend returns an array of classes
        setClasses(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchClasses();
  }, []); // Empty dependency array means this runs once after component mounts

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the classes array to get the items to show on the current page
  const currentClasses = classes.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faTheaterMasks} /> Music and Dance Classes</h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : classes.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faTheaterMasks} size="3x" className="text-warning mb-3" />
          <h4>No Music and Dance Classes Available</h4>
          <p>Currently, there are no music and dance classes to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentClasses.map(cl => (
            <Col key={cl.id}>
              <div className="destination-card">
                <h5>{cl.name}</h5>
                <Badge bg="success">⭐ {cl.rating}</Badge>
                <p>{cl.description}</p>
                <p>Duration: {cl.duration}</p>
              </div>
              <BookingButton place={cl} />
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

export default MusicAndDanceClasses;
