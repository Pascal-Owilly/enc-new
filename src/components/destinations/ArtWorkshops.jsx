// src/Destinations/ArtWorkshops.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const ArtWorkshops = () => {
  const workshops = [
    { id: 1, name: 'Watercolor Basics', rating: 4.9, description: 'Learn the basics of watercolor painting.', duration: '3 hours' },
    { id: 2, name: 'Ceramic Art', rating: 4.6, description: 'Create beautiful ceramic pieces.', duration: '4 hours' },
    { id: 3, name: 'Acrylic Pouring', rating: 4.8, description: 'Experience the magic of acrylic pouring.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faPaintBrush} /> Art Workshops</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {workshops.map(workshop => (
          <Col key={workshop.id}>
            <div className="destination-card">
              <h5>{workshop.name}</h5>
              <Badge bg="success">⭐ {workshop.rating}</Badge>
              <p>{workshop.description}</p>
              <p>Duration: {workshop.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArtWorkshops;
