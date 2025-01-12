  import React, { useState, useEffect } from 'react';
  import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTree, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
  import './Destinations.css';
  import { BASE_URL } from '../config/config';
  import BookingButton from '../bookings/BookingButton';

  const NatureHikes = () => {
    const [hikes, setHikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const category = "nature_hikes";

    useEffect(() => {
      const fetchHikes = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
          if (!response.ok) {
            throw new Error('Failed to fetch nature hikes');
          }
          const data = await response.json();
          setHikes(data);
        } catch (error) {
          console.error('Error fetching nature hikes:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHikes();
    }, [category]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHikes = hikes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(hikes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <Container className="mt-5">
        <h2 className="text-center my-4">
          <FontAwesomeIcon icon={faTree} /> Nature Hikes
        </h2>
        
        {loading ? (
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : hikes.length > 0 ? (
          <>
            <Row xs={1} sm={2} md={3} className="g-4">
              {currentHikes.map((hike) => (
                <Col key={hike.id}>
                  <div className="destination-card">
                    <img
                      src={`${BASE_URL}${hike.imageUrl || hike.cover_image}`}
                      alt={hike.name}
                      className="hike-image"
                      style={{ width: '100%' }}
                    />
                    <h5>{hike.name}</h5>
                    <Badge bg="success">⭐ {hike.rating || 'N/A'}</Badge>
                    <p>{hike.description || 'No description available.'}</p>
                    <p>Duration: {hike.duration || 'N/A'}</p>
                    <div className="d-flex justify-content-between mt-3">
                    <div className="card-footer text-center">
                          <BookingButton place={hike} />
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
            <h4>No Nature Hikes Available</h4>
            <p>Currently, there are no nature hikes to display. Please check back later.</p>
          </div>
        )}
      </Container>
    );
  };

  export default NatureHikes;
