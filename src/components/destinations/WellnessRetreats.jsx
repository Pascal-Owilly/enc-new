import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpa } from '@fortawesome/free-solid-svg-icons';

const WellnessRetreats = () => {
  const retreats = [
    { id: 1, name: 'Yoga Retreat', rating: 4.9, description: 'A calming yoga retreat for relaxation.', duration: 'Weekend' },
    { id: 2, name: 'Meditation Workshop', rating: 4.8, description: 'Learn the art of meditation in a serene setting.', duration: '2 hours' },
    { id: 3, name: 'Spa Day', rating: 4.7, description: 'Enjoy a full day of pampering at the spa.', duration: '1 day' },
    { id: 4, name: 'Detox Retreat', rating: 4.8, description: 'A retreat focused on detoxifying the body.', duration: 'Weekend' },
    { id: 5, name: 'Mindfulness Workshop', rating: 4.7, description: 'Learn mindfulness techniques to reduce stress.', duration: '4 hours' },
    { id: 6, name: 'Healing Retreat', rating: 4.9, description: 'A retreat dedicated to physical and mental healing.', duration: '3 days' },
    { id: 7, name: 'Ayurvedic Retreat', rating: 4.6, description: 'A holistic wellness retreat based on Ayurveda.', duration: '5 days' },
    { id: 8, name: 'Wellness Weekend', rating: 5.0, description: 'A weekend getaway focused on total wellness.', duration: 'Weekend' },
    { id: 9, name: 'Reiki Healing', rating: 4.8, description: 'Experience the healing power of Reiki.', duration: '1 hour' },
    { id: 10, name: 'Stress Relief Retreat', rating: 4.7, description: 'A retreat designed to relieve stress and tension.', duration: '2 days' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the index of the first and last items to display on the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Slice the retreats array to get the items to show on the current page
  const currentRetreats = retreats.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(retreats.length / itemsPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faSpa} /> Wellness Retreats</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentRetreats.map(retreat => (
          <Col key={retreat.id}>
            <div className="destination-card">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt={retreat.name} 
                className="img-fluid mb-3" 
              />
              <h5>{retreat.name}</h5>
              <Badge bg="success">⭐ {retreat.rating}</Badge>
              <p>{retreat.description}</p>
              <p>Duration: {retreat.duration}</p>
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

export default WellnessRetreats;
