// src/Destinations/LocalSports.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

const LocalSports = () => {
  const sports = [
    { id: 1, name: 'Soccer Match', rating: 4.8, description: 'Watch local teams battle it out on the field.', duration: '2 hours' },
    { id: 2, name: 'Basketball Game', rating: 4.7, description: 'Enjoy a thrilling basketball game.', duration: '2 hours' },
    { id: 3, name: 'Marathon', rating: 4.9, description: 'Join the excitement of a local marathon.', duration: 'All day' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faFutbol} /> Local Sports</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {sports.map(sport => (
          <Col key={sport.id}>
            <div className="destination-card">
              <h5>{sport.name}</h5>
              <Badge bg="success">⭐ {sport.rating}</Badge>
              <p>{sport.description}</p>
              <p>Duration: {sport.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LocalSports;
