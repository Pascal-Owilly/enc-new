// src/Destinations/CulturalExchange.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const CulturalExchange = () => {
  const exchanges = [
    { id: 1, name: 'Cooking Class', rating: 4.9, description: 'Learn to cook traditional dishes.', duration: '3 hours' },
    { id: 2, name: 'Language Exchange', rating: 4.8, description: 'Practice languages with locals.', duration: '2 hours' },
    { id: 3, name: 'Cultural Sharing Session', rating: 4.7, description: 'Engage in a cultural sharing event.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faExchangeAlt} /> Cultural Exchange</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {exchanges.map(exchange => (
          <Col key={exchange.id}>
            <div className="destination-card">
              <h5>{exchange.name}</h5>
              <Badge bg="success">⭐ {exchange.rating}</Badge>
              <p>{exchange.description}</p>
              <p>Duration: {exchange.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CulturalExchange;
