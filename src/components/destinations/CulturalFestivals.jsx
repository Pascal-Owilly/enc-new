import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import './CulturalFestivals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const CulturalFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = "cultural_festivals";

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cultural festivals');
        }
        const data = await response.json();
        setFestivals(data);
      } catch (error) {
        console.error('Error fetching cultural festivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFestivals = festivals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(festivals.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faMusic} /> Cultural Festivals
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : festivals.length > 0 ? (
        <>
          <Row xs={1} sm={2} md={3} className="g-4">
            {currentFestivals.map(festival => (
              <Col key={festival.id}>
                <div className="festival-card">
                  {/* Image */}
                  <img 
                    src={`${BASE_URL}${festival.imageUrl || festival.cover_image}`} 
                    alt={festival.name} 
                    className="festival-image" 
                  />

                  <div className="festival-details p-3">
                    <h5>{festival.name}</h5>
                    <Badge bg="success">⭐ {festival.average_rating || 'N/A'}</Badge>
                    <p>{festival.description || 'No description available.'}</p>
                    <p><strong>Duration:</strong> {festival.duration || 'N/A'}</p>

                    <div className="d-flex justify-content-between mt-3">
                      <div className="card-footer text-center">
                        <BookingButton place={festival} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination className="justify-content-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item 
                key={index + 1} 
                active={index + 1 === currentPage} 
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" className="text-warning mb-3" />
          <h4>No Cultural Festivals Available</h4>
          <p>Currently, there are no cultural festivals to display. Please check back later.</p>
        </div>
      )}
    </Container>
  );
};

export default CulturalFestivals;
