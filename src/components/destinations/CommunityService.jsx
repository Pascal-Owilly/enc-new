// src/Destinations/CommunityService.js
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const CommunityService = () => {
  const services = [
    { id: 1, name: 'Beach Cleanup', rating: 4.9, description: 'Join us in cleaning up the local beach.', duration: '3 hours' },
    { id: 2, name: 'Food Bank Volunteer', rating: 4.8, description: 'Help serve food at the local food bank.', duration: '4 hours' },
    { id: 3, name: 'Animal Shelter Help', rating: 4.7, description: 'Assist in caring for animals at the shelter.', duration: '2 hours' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faHandsHelping} /> Community Service</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {services.map(service => (
          <Col key={service.id}>
            <div className="destination-card">
              <h5>{service.name}</h5>
              <Badge bg="success">⭐ {service.rating}</Badge>
              <p>{service.description}</p>
              <p>Duration: {service.duration}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommunityService;
