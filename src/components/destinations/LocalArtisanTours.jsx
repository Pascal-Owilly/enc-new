// src/Destinations/LocalArtisanTours.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

const LocalArtisanTours = () => {
  const tours = [
    { id: 1, name: 'Pottery Workshop', rating: 4.8, description: 'Learn pottery making from local artisans.', duration: '2 hours' },
    { id: 2, name: 'Textile Tour', rating: 4.7, description: 'Explore local textile production.', duration: '3 hours' },
    { id: 3, name: 'Craft Beer Tasting', rating: 4.9, description: 'Enjoy a tasting tour at local breweries.', duration: '3 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faHammer} /> Local Artisan Tours</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {tours.map(tour => (
          <Col key={tour.id}>
            <div className="destination-card">
              <h5>{tour.name}</h5>
              <Badge bg="success">⭐ {tour.rating}</Badge>
              <p>{tour.description}</p>
              <p>Duration: {tour.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LocalArtisanTours;
