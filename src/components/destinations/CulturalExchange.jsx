import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const CulturalExchange = () => {
  const exchanges = [
    {
      id: 1,
      name: 'Cooking Class',
      rating: 4.9,
      description: 'Learn to cook traditional dishes.',
      duration: '3 hours',
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
      ],
    },
    {
      id: 2,
      name: 'Language Exchange',
      rating: 4.8,
      description: 'Practice languages with locals.',
      duration: '2 hours',
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
      ],
    },
    {
      id: 3,
      name: 'Cultural Sharing Session',
      rating: 4.7,
      description: 'Engage in a cultural sharing event.',
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
        <FontAwesomeIcon icon={faExchangeAlt} /> Cultural Exchange
      </h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {exchanges.map((exchange) => (
          <Col key={exchange.id}>
            <div className="exchange-card">
              <h5>{exchange.name}</h5>
              <Badge bg="success" className="mb-2">
                ⭐ {exchange.rating}
              </Badge>
              <p>{exchange.description}</p>
              <p>
                <strong>Duration:</strong> {exchange.duration}
              </p>

              {/* Image Gallery */}
              <Row xs={1} sm={2} md={3} className="g-2">
                {exchange.images.map((image, index) => (
                  <Col key={index}>
                    <img
                      src={image}
                      alt={`${exchange.name} ${index + 1}`}
                      className="gallery-img"
                    />
                  </Col>
                ))}
              </Row>

              {/* Book Button */}
              <div className="text-center mt-3">
                <Button variant="primary" size="lg">
                  Book Now
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CulturalExchange;
