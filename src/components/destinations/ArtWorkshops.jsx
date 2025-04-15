import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import './Destinations.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ArtWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const category = "art_workshops";

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch art workshops');
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching art workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentWorkshops = workshops.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(workshops.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="py-5">
      <h2 className="text-center mb-4 text-gradient fw-bold">
        <FontAwesomeIcon icon={faPaintBrush} className="me-2" />
        Inspiring Art Workshops
      </h2>

      {loading ? (
        <div className="dot-loader"><span></span><span></span><span></span></div>
      ) : workshops.length > 0 ? (
        <>
          <Row xs={1} sm={2} md={3} className="g-4">
            {currentWorkshops.map((workshop) => (
             <Col key={workshop.id}>
  <div className="destination-card h-100 w-100">
    <img
      src={`${BASE_URL}${workshop.imageUrl || workshop.cover_image}`}
      alt={workshop.name}
      className="workshop-image"
      style={{ borderRadius: '12px', width: '100%', objectFit: 'cover' }}
    />
    <h5 style={{ fontFamily: "'Poppins', sans-serif", marginTop: '10px' }}>{workshop.name}</h5>

    {/* Price and Location row */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '0.95rem',
        fontWeight: 500,
        marginBottom: '8px',
        color: '#4a4a4a',
      }}
    >
      <span style={{ color: '#773697' }}>{workshop.price ? `KES ${workshop.price}` : 'N/a'}</span>
      

      <span style={{ fontStyle: 'italic' }}><FaMapMarkerAlt style={{ color: '#e91e63' }} /> {workshop.location || 'N/A'}</span>
    </div>

    <div className="card-footer text-center">
      <BookingButton place={workshop} />
    </div>
  </div>
</Col>

            ))}
          </Row>

          <Pagination className="justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" className="text-warning mb-3" />
          <h4>No Art Workshops Available</h4>
          <p>Please check back later for creative experiences near you.</p>
        </div>
      )}
    </Container>
  );
};

export default ArtWorkshops;
