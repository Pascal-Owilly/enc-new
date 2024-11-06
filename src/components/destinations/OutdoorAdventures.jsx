import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';

const OutdoorAdventures = () => {
  const adventures = [
    { id: 1, name: 'Rock Climbing', rating: 4.8, description: 'Experience the thrill of rock climbing.', duration: '3 hours' },
    { id: 2, name: 'Kayaking', rating: 4.7, description: 'Enjoy kayaking in scenic waters.', duration: '2 hours' },
    { id: 3, name: 'Zip Lining', rating: 4.9, description: 'Soar through the trees on a zip line.', duration: '1.5 hours' },
    { id: 4, name: 'Hiking', rating: 4.6, description: 'Hike through beautiful mountain trails.', duration: '5 hours' },
    { id: 5, name: 'Bungee Jumping', rating: 4.9, description: 'Jump off a bridge for an adrenaline rush!', duration: '1 hour' },
    { id: 6, name: 'Mountain Biking', rating: 4.8, description: 'Ride through challenging mountain paths.', duration: '3 hours' },
    { id: 7, name: 'Canoeing', rating: 4.7, description: 'Row through calm river waters.', duration: '2 hours' },
    { id: 8, name: 'Paragliding', rating: 5.0, description: 'Soar in the sky with stunning views.', duration: '2 hours' },
    { id: 9, name: 'Skydiving', rating: 4.8, description: 'Experience the thrill of freefalling.', duration: '2 hours' },
    { id: 10, name: 'Off-road Driving', rating: 4.7, description: 'Drive through rugged terrains.', duration: '4 hours' },
    { id: 11, name: 'Sandboarding', rating: 4.6, description: 'Ride down sand dunes on a board.', duration: '3 hours' },
    { id: 12, name: 'Caving', rating: 4.8, description: 'Explore deep caves and underground paths.', duration: '4 hours' },
    { id: 13, name: 'Wildlife Safari', rating: 4.9, description: 'Go on a thrilling wildlife safari.', duration: '5 hours' },
    { id: 14, name: 'Fishing', rating: 4.7, description: 'Enjoy a relaxing day of fishing.', duration: '3 hours' },
    { id: 15, name: 'Jet Skiing', rating: 4.8, description: 'Feel the speed on the water.', duration: '2 hours' },
    { id: 16, name: 'Horseback Riding', rating: 4.7, description: 'Ride horses through scenic trails.', duration: '2.5 hours' },
    { id: 17, name: 'Surfing', rating: 4.9, description: 'Catch some waves and ride the surf.', duration: '2 hours' },
    { id: 18, name: 'Snowboarding', rating: 5.0, description: 'Ride the slopes on a snowboard.', duration: '4 hours' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the adventures array to get the items to show on the current page
  const currentAdventures = adventures.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(adventures.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faMountain} /> Outdoor Adventures</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentAdventures.map(adventure => (
          <Col key={adventure.id}>
            <div className="destination-card">
              <img 
                src="https://assets.codepen.io/4787486/oak_1.jpg" 
                alt={adventure.name} 
                className="img-fluid mb-3" 
              />
              <h5>{adventure.name}</h5>
              <Badge bg="success">⭐ {adventure.rating}</Badge>
              <p>{adventure.description}</p>
              <p>Duration: {adventure.duration}</p>
              <Button variant="primary" className="me-2">Book Now</Button>
              <Button variant="secondary">Explore</Button>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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

export default OutdoorAdventures;
