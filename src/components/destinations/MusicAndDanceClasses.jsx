// src/Destinations/MusicAndDanceClasses.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

const MusicAndDanceClasses = () => {
  const classes = [
    { id: 1, name: 'Salsa Dance Class', rating: 4.9, description: 'Learn salsa dancing in a fun environment.', duration: '1.5 hours' },
    { id: 2, name: 'Guitar Workshop', rating: 4.8, description: 'Join our guitar workshop for beginners.', duration: '2 hours' },
    { id: 3, name: 'Hip Hop Dance Class', rating: 4.7, description: 'Get your groove on with hip hop dance.', duration: '1 hour' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faTheaterMasks} /> Music and Dance Classes</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {classes.map(cl => (
          <Col key={cl.id}>
            <div className="destination-card">
              <h5>{cl.name}</h5>
              <Badge bg="success">⭐ {cl.rating}</Badge>
              <p>{cl.description}</p>
              <p>Duration: {cl.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MusicAndDanceClasses;
