import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Destinations.css';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

const ArtWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = "art_workshops";

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch art workshops');
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching art workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(workshops.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faPaintBrush} /> Art Workshops
      </h2>

      {loading ? (
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : workshops.length > 0 ? (
        <>
          <Row xs={1} sm={2} md={3} className="g-4">
            {currentWorkshops.map((workshop) => (
              <Col key={workshop.id}>
                <div className="destination-card">
                  <img
                    src={`${BASE_URL}${workshop.imageUrl || workshop.cover_image}`}
                    alt={workshop.name}
                    className="workshop-image"
                    style={{ width: '100%' }}
                  />
                  <h5>{workshop.name}</h5>
                  <Badge bg="success">⭐ {workshop.average_rating || 'N/A'}</Badge>
                  <p>{workshop.description || 'No description available.'}</p>
                  <p>Duration: {workshop.duration || 'N/A'}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="card-footer text-center">
                      <BookingButton place={workshop} />
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
          <h4>No Art Workshops Available</h4>
          <p>Currently, there are no art workshops to display. Please check back later.</p>
        </div>
      )}
    </Container>
  );
};

export default ArtWorkshops;
