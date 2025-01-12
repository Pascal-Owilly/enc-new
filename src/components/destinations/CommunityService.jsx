import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { faPaintBrush, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Destinations.css';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const CommunityService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=community_service`);
        if (!response.ok) {
          throw new Error('Failed to fetch community services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching community services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faHandsHelping} /> Community Service
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : services.length > 0 ? (
        <>
          <Row xs={1} sm={2} md={3} className="g-4">
            {currentServices.map((service) => (
              <Col key={service.id}>
                <div className="destination-card">
                  <img
                    src={`${BASE_URL}${service.imageUrl || service.cover_image}`}
                    alt={service.name}
                    className="service-image"
                    style={{ width: '100%' }}
                  />
                  <h5>{service.name}</h5>
                  <Badge bg="success">⭐ {service.average_rating || 'N/A'}</Badge>
                  <p>{service.description || 'No description available.'}</p>
                  <p>Duration: {service.duration || 'N/A'}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="card-footer text-center">
                      <BookingButton place={service} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Pagination className="justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
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
          <h4>No Community Service Opportunities Available</h4>
          <p>Currently, there are no community service opportunities to display. Please check back later.</p>
        </div>
      )}
    </Container>
  );
};

export default CommunityService;
