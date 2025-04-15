import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import './CulturalFestivals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
    <Container fluid className="mt-2">
<h5 className="text-center">
  <FontAwesomeIcon icon={faMusic} /> Cultural Festivals
</h5>
<p className="text-center" style={{ fontStyle: 'italic', color: '#555', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
  Experience the rhythm, color, and spirit of local traditions through vibrant festivals that celebrate art, music, and community.
</p>


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
                    src={`${BASE_URL}${festival.cover_image }`}
                    alt={festival.name} 
                    className="festival-image" 
                  />

<div className="festival-details p-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
  <h5 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{festival.name}</h5>

  {/* Price and location in one line */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.95rem',
      marginBottom: '0.8rem',
      color: '#444',
    }}
  >
    <span style={{ color: '#773697', fontWeight: '500' }}>
      {festival.price ? `KES ${festival.price}` : 'Free'}
    </span>

    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FaMapMarkerAlt style={{ color: '#e91e63', marginRight: '4px' }} />
      {festival.location || 'N/A'}
    </span>
  </div>

  {/* Booking Button */}
  <div className="text-center mt-3">
    <BookingButton place={festival} />
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
