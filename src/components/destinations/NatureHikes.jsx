// src/Destinations/NatureHikes.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const NatureHikes = () => {
  const hikes = [
    { id: 1, name: 'Sunset Trail', rating: 4.8, description: 'A beautiful trail with stunning sunset views.', duration: '2 hours' },
    { id: 2, name: 'Mountain Path', rating: 4.5, description: 'An adventurous hike through the mountains.', duration: '3 hours' },
    { id: 3, name: 'Forest Walk', rating: 4.7, description: 'A serene walk through lush forests.', duration: '1.5 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faTree} /> Nature Hikes</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {hikes.map(hike => (
          <Col key={hike.id}>
            <div className="destination-card">
              <h5>{hike.name}</h5>
              <Badge bg="success">⭐ {hike.rating}</Badge>
              <p>{hike.description}</p>
              <p>Duration: {hike.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NatureHikes;
