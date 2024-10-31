// src/Destinations/HistoricalTours.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

const HistoricalTours = () => {
  const tours = [
    { id: 1, name: 'Ancient Ruins', rating: 4.8, description: 'Explore the ancient ruins of our ancestors.', duration: '3 hours' },
    { id: 2, name: 'Historical City Walk', rating: 4.6, description: 'Discover the history of the city through a guided walk.', duration: '2 hours' },
    { id: 3, name: 'Museum Tour', rating: 4.9, description: 'A deep dive into the history at the local museum.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faLandmark} /> Historical Tours</h2>
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

export default HistoricalTours;
