import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const StorytellingNights = () => {
  const nights = [
    { id: 1, name: 'Local Tales', rating: 4.9, description: 'Experience local storytelling.', duration: '2 hours', imageUrl: 'https://via.placeholder.com/600x400' },
    { id: 2, name: 'Folklore Evening', rating: 4.8, description: 'Enjoy an evening of folklore tales.', duration: '2 hours', imageUrl: 'https://via.placeholder.com/600x400' },
    { id: 3, name: 'Personal Stories', rating: 4.7, description: 'Share and listen to personal stories.', duration: '2 hours', imageUrl: 'https://via.placeholder.com/600x400' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faBook} /> Storytelling Nights</h2>
      
      <Row xs={1} sm={2} md={3} className="g-4">
        {nights.map(night => (
          <Col key={night.id}>
            <div className="destination-card">
              <img src={night.imageUrl} alt={night.name} className="festival-image" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
              <h5 className="mt-3">{night.name}</h5>
              <Badge bg="success">⭐ {night.rating}</Badge>
              <p className="mt-2">{night.description}</p>
              <p>Duration: {night.duration}</p>
              <Button className="mt-3" variant="primary" size="sm">Join the Night</Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StorytellingNights;
