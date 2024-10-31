// src/Destinations/WellnessRetreats.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpa } from '@fortawesome/free-solid-svg-icons';

const WellnessRetreats = () => {
  const retreats = [
    { id: 1, name: 'Yoga Retreat', rating: 4.9, description: 'A calming yoga retreat for relaxation.', duration: 'Weekend' },
    { id: 2, name: 'Meditation Workshop', rating: 4.8, description: 'Learn the art of meditation in a serene setting.', duration: '2 hours' },
    { id: 3, name: 'Spa Day', rating: 4.7, description: 'Enjoy a full day of pampering at the spa.', duration: '1 day' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faSpa} /> Wellness Retreats</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {retreats.map(retreat => (
          <Col key={retreat.id}>
            <div className="destination-card">
              <h5>{retreat.name}</h5>
              <Badge bg="success">⭐ {retreat.rating}</Badge>
              <p>{retreat.description}</p>
              <p>Duration: {retreat.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WellnessRetreats;
