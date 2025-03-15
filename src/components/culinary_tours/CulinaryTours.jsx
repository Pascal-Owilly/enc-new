import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Carousel } from 'react-bootstrap';
import { BASE_URL } from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import './CulinaryTours.css';
import BookingButton from '../bookings/BookingButton';

const CulinaryToursPage = () => {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSwitch, setImageSwitch] = useState(true);
  const category = "culinary_tours";

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch adventures');
        }
        const data = await response.json();
        console.log('Culinary tours', data);
        setAdventures(data);
      } catch (error) {
        console.error('Error fetching adventures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, [category]);

  // Image toggle logic
  useEffect(() => {
    const interval = setInterval(() => {
      setImageSwitch((prev) => !prev);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <Container fluid>
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
            <Carousel className="mb-4" controls={true} indicators={false}>
              {adventures.map((adventure) => (
                <Carousel.Item key={adventure.id}>
                  <img
                    className="d-block w-100"
                    src={`${BASE_URL}${imageSwitch ? adventure.cover_image : adventure.pictures}`}
                    alt={adventure.title}
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption>
                    <h3 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                      Culinary Tours
                    </h3>
                    <p className="text-left">
                      Experience the joy of tasting traditional and modern recipes, savor exquisite dishes, and immerse yourself 
                      in the rich flavors of different cuisines. 
                    </p>
                    <h3>{adventure.title}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Tour Cards */}
            <Row>
              {adventures.map((adventure) => (
                <Col md={6} className="mb-2" key={adventure.id}>
                  <Card className="tour-card shadow-lg">
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}${adventure.pictures}`}
                      alt={adventure.title}
                      className="tour-image"
                    />
                    <Card.Body>
                      <Badge bg="success" className="mb-2">
                        <FontAwesomeIcon icon={faStar} /> {adventure.average_rating}
                      </Badge>
                      <Card.Title className="tour-title">{adventure.name}</Card.Title>
                      <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
                        {adventure.location}
                      </Card.Text>
                      <Card.Text>
                        <FontAwesomeIcon icon={faClock} className="text-warning me-2" />
                        Duration: {adventure.duration}
                      </Card.Text>
                      <Card.Text className="tour-description">
                        {adventure.description}
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <div className="card-footer text-center">
                          <BookingButton place={adventure} />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CulinaryToursPage;