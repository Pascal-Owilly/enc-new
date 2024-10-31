// src/Destinations/CulturalFestivals.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const CulturalFestivals = () => {
  const festivals = [
    { id: 1, name: 'Harvest Festival', rating: 4.7, description: 'Celebrate the harvest with food and music.', duration: 'All day' },
    { id: 2, name: 'Artisan Fair', rating: 4.5, description: 'Showcasing local artisans and their crafts.', duration: 'Weekend' },
    { id: 3, name: 'Music Festival', rating: 4.9, description: 'Enjoy performances from local and national artists.', duration: '2 days' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faMusic} /> Cultural Festivals</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {festivals.map(festival => (
          <Col key={festival.id}>
            <div className="destination-card">
              <h5>{festival.name}</h5>
              <Badge bg="success">⭐ {festival.rating}</Badge>
              <p>{festival.description}</p>
              <p>Duration: {festival.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CulturalFestivals;
