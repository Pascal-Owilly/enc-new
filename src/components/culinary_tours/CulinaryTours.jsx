import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Carousel, Button } from 'react-bootstrap';
import { BASE_URL } from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import './CulinaryTours.css';
import BookingButton from '../bookings/BookingButton';
import { Link } from 'react-router-dom';

const CulinaryToursPage = () => {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSwitch, setImageSwitch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of cards per page

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=food_culinary`);
        if (!response.ok) {
          throw new Error('Failed to fetch adventures');
        }
        const data = await response.json();
        setAdventures(data);
      } catch (error) {
        console.error('Error fetching adventures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSwitch((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adventures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adventures.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container fluid className="full-background">
      <Row>
        {loading ? (
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <Col lg={12}>
            {/* Carousel */}
            <div className="carousel-container">
              <Carousel className="mb-4" controls={true} indicators={true} interval={5000}>
                {adventures.map((adventure) => (
                  <Carousel.Item key={adventure.id}>
                    <Link to={`/place/${adventure.id}`}>
                      <img
                        className="d-block w-100"
                        src={adventure.cover_image}
                        alt={adventure.name}
                      />
                      <Carousel.Caption className="carousel-caption">
                        <h3 className="carousel-title">Culinary Tours</h3>
                        <p>
                          Experience the joy of tasting traditional and modern recipes, savor exquisite dishes, and immerse yourself
                          in the rich flavors of different cuisines.
                        </p>
                        <h3 className="carousel-item-title">{adventure.name}</h3>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Tour Cards */}
            <Row className='p-5'>
              {currentItems.map((adventure) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={adventure.id}>
                  <Card className="tour-card shadow-lg m-auto">
                    <Card.Img
                      variant="top"
                      src={adventure.cover_image}
                      alt={adventure.title}
                      className="tour-image"
                    />
                    <Card.Body>
                      <Card.Title className="tour-title">{adventure.name}</Card.Title>
                      <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
                        {adventure.location}
                      </Card.Text>
                      <div className="text-center">
                        <BookingButton place={adventure} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <Button onClick={handlePrev} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CulinaryToursPage;