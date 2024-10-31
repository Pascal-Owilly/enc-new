// src/Destinations/ThemedPhotoWalks.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const ThemedPhotoWalks = () => {
  const walks = [
    { id: 1, name: 'Street Photography Walk', rating: 4.9, description: 'Capture the essence of the city through street photography.', duration: '2 hours' },
    { id: 2, name: 'Nature Photography Walk', rating: 4.8, description: 'Join us for a walk focused on capturing nature.', duration: '3 hours' },
    { id: 3, name: 'Night Photography Walk', rating: 4.7, description: 'Explore night photography techniques.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faCameraRetro} /> Themed Photo Walks</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {walks.map(walk => (
          <Col key={walk.id}>
            <div className="destination-card">
              <h5>{walk.name}</h5>
              <Badge bg="success">⭐ {walk.rating}</Badge>
              <p>{walk.description}</p>
              <p>Duration: {walk.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ThemedPhotoWalks;
