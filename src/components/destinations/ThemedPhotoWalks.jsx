import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import './ThemedPhotoWalks.css'; // CSS for specific styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const ThemedPhotoWalks = () => {
  const walks = [
    {
      id: 1,
      name: 'Street Photography Walk',
      rating: 4.9,
      description: 'Capture the essence of the city through street photography.',
      duration: '2 hours',
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
      ],
    },
    {
      id: 2,
      name: 'Nature Photography Walk',
      rating: 4.8,
      description: 'Join us for a walk focused on capturing nature.',
      duration: '3 hours',
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
      ],
    },
    {
      id: 3,
      name: 'Night Photography Walk',
      rating: 4.7,
      description: 'Explore night photography techniques.',
      duration: '2 hours',
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
      ],
    },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faCameraRetro} /> Themed Photo Walks
      </h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {walks.map((walk) => (
          <Col key={walk.id}>
            <div className="photo-walk-card">
              <h5>{walk.name}</h5>
              <Badge bg="success" className="mb-2">⭐ {walk.rating}</Badge>
              <p>{walk.description}</p>
              <p><strong>Duration:</strong> {walk.duration}</p>
              
              <Row xs={1} sm={2} md={3} className="g-2">
                {walk.images.map((image, index) => (
                  <Col key={index}>
                    <img src={image} alt={`${walk.name} ${index + 1}`} className="gallery-img" />
                  </Col>
                ))}
              </Row>
              
              {/* Book Button */}
              <div className="text-center mt-3">
                <Button variant="primary" size="sm">Book Now</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ThemedPhotoWalks;
