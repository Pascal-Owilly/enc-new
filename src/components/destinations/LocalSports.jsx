import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import './LocalSports.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

const LocalSports = () => {
  const sports = [
    { id: 1, name: 'Soccer Match', rating: 4.8, description: 'Watch local teams battle it out on the field.', duration: '2 hours' },
    { id: 2, name: 'Basketball Game', rating: 4.7, description: 'Enjoy a thrilling basketball game.', duration: '2 hours' },
    { id: 3, name: 'Marathon', rating: 4.9, description: 'Join the excitement of a local marathon.', duration: 'All day' },
    { id: 4, name: 'Tennis Tournament', rating: 4.8, description: 'Catch the best local tennis players in action.', duration: '3 hours' },
    { id: 5, name: 'Cycling Race', rating: 4.7, description: 'Cheer on the cyclists as they race through the streets.', duration: '3 hours' },
    { id: 6, name: 'Boxing Match', rating: 4.9, description: 'Experience the excitement of a live boxing match.', duration: '2 hours' },
    { id: 7, name: 'Volleyball Game', rating: 4.6, description: 'Get involved in a fun and competitive volleyball game.', duration: '2 hours' },
    { id: 8, name: 'Baseball Game', rating: 4.8, description: 'Enjoy an exciting baseball game with local teams.', duration: '3 hours' },
    { id: 9, name: 'Rugby Match', rating: 4.7, description: 'Feel the adrenaline of a local rugby match.', duration: '2 hours' },
    { id: 10, name: 'Badminton Tournament', rating: 4.8, description: 'Join the excitement of a badminton tournament.', duration: '3 hours' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentSports = sports.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sports.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faFutbol} /> Local Sports</h2>
      <Row xs={1} sm={2} md={2} lg={2} className="g-4">
        {currentSports.map(sport => (
          <Col key={sport.id}>
            <div className="sports-card">
              <Row>
                <Col md={6}>
                  <img 
                    src="https://via.placeholder.com/600x400" 
                    alt={sport.name} 
                    className="img-fluid mb-3 rounded"
                  />
                </Col>
                <Col md={6}>
                  <h5>{sport.name}</h5>
                  <Badge bg="success" className="mb-3">⭐ {sport.rating}</Badge>
                  <p>{sport.description}</p>
                  <p><strong>Duration:</strong> {sport.duration}</p>
                  <div className="d-flex">
                    <Button variant="primary" className="me-2">Book Now</Button>
                    <Button variant="secondary">Explore</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>

      <div className="pagination text-center mt-4">
        <Button 
          variant="outline-primary" 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button 
          variant="outline-primary" 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default LocalSports;
