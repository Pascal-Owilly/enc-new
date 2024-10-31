// src/Destinations/WildlifeSpotting.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const WildlifeSpotting = () => {
  const activities = [
    { id: 1, name: 'Bird Watching', rating: 4.9, description: 'Join our expert for a day of bird watching.', duration: '4 hours' },
    { id: 2, name: 'Safari Tour', rating: 4.8, description: 'Experience a thrilling safari tour.', duration: 'All day' },
    { id: 3, name: 'Nature Walk', rating: 4.7, description: 'Discover local wildlife on a guided nature walk.', duration: '3 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faPaw} /> Wildlife Spotting</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {activities.map(activity => (
          <Col key={activity.id}>
            <div className="destination-card">
              <h5>{activity.name}</h5>
              <Badge bg="success">⭐ {activity.rating}</Badge>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WildlifeSpotting;
