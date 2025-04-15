import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import { FaMapMarkerAlt } from 'react-icons/fa';

const WellnessRetreats = () => {
  const [retreats, setRetreats] = useState([]); // State to store fetched retreats
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State for any errors during data fetching
  const category = "wellness_retreats"; // Set the category to wellness retreats
  const itemsPerPage = 6; // Items per page for pagination

  // Fetch wellness retreats from backend API
  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        
        // Assuming the backend returns an array of retreats
        setRetreats(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchRetreats();
  }, []); // Empty dependency array means this runs once after component mounts

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the retreats array to get the items to show on the current page
  const currentRetreats = retreats.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(retreats.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="">
      <h5 className="text-center "><FontAwesomeIcon icon={faSpa} /> Wellness Retreats</h5>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : retreats.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faSpa} size="3x" className="text-warning mb-3" />
          <h4>No Wellness Retreats Available</h4>
          <p>Currently, there are no wellness retreats to display. Please check back later.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {currentRetreats.map(retreat => (
            <Col key={retreat.id}>
              <div className="destination-card w-100">
                <img 
                  src={`${BASE_URL}${retreat.cover_image }`}
                  alt={retreat.name} 
                  className="img-fluid mb-3" 
                />
                <h5>{retreat.name}</h5>
                <div className="price-location d-flex justify-content-between align-items-center mb-2">
                  <span className="retreat-price">KES {retreat.price}</span>

                  <span className="retreat-location text-muted"><FaMapMarkerAlt style={{ color: '#e91e63', marginRight: '4px' }} /> {retreat.location}</span>
                </div>

                <BookingButton place={retreat} />
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

export default WellnessRetreats;
