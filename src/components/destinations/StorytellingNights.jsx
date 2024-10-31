// src/Destinations/StorytellingNights.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const StorytellingNights = () => {
  const nights = [
    { id: 1, name: 'Local Tales', rating: 4.9, description: 'Experience local storytelling.', duration: '2 hours' },
    { id: 2, name: 'Folklore Evening', rating: 4.8, description: 'Enjoy an evening of folklore tales.', duration: '2 hours' },
    { id: 3, name: 'Personal Stories', rating: 4.7, description: 'Share and listen to personal stories.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faBook} /> Storytelling Nights</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {nights.map(night => (
          <Col key={night.id}>
            <div className="destination-card">
              <h5>{night.name}</h5>
              <Badge bg="success">⭐ {night.rating}</Badge>
              <p>{night.description}</p>
              <p>Duration: {night.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StorytellingNights;
