// src/Destinations/OutdoorAdventures.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';

const OutdoorAdventures = () => {
  const adventures = [
    { id: 1, name: 'Rock Climbing', rating: 4.8, description: 'Experience the thrill of rock climbing.', duration: '3 hours' },
    { id: 2, name: 'Kayaking', rating: 4.7, description: 'Enjoy kayaking in scenic waters.', duration: '2 hours' },
    { id: 3, name: 'Zip Lining', rating: 4.9, description: 'Soar through the trees on a zip line.', duration: '1.5 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faMountain} /> Outdoor Adventures</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {adventures.map(adventure => (
          <Col key={adventure.id}>
            <div className="destination-card">
              <h5>{adventure.name}</h5>
              <Badge bg="success">⭐ {adventure.rating}</Badge>
              <p>{adventure.description}</p>
              <p>Duration: {adventure.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OutdoorAdventures;
