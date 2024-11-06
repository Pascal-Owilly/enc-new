import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const CommunityService = () => {
  const services = [
    { id: 1, name: 'Beach Cleanup', rating: 4.9, description: 'Join us in cleaning up the local beach.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 2, name: 'Food Bank Volunteer', rating: 4.8, description: 'Help serve food at the local food bank.', duration: '4 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 3, name: 'Animal Shelter Help', rating: 4.7, description: 'Assist in caring for animals at the shelter.', duration: '2 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 4, name: 'Park Restoration', rating: 4.6, description: 'Help restore local parks by planting trees.', duration: '3.5 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 5, name: 'Soup Kitchen Service', rating: 4.5, description: 'Serve meals to those in need.', duration: '2.5 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 6, name: 'Clothing Drive', rating: 4.4, description: 'Collect and distribute clothes to the needy.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faHandsHelping} /> Community Service</h2>
      
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentServices.map(service => (
          <Col key={service.id}>
            <div className="destination-card">
              <img src={service.imageUrl} alt={service.name} className="service-image" style={{ width: '100%' }} />
              <h5>{service.name}</h5>
              <Badge bg="success">⭐ {service.rating}</Badge>
              <p>{service.description}</p>
              <p>Duration: {service.duration}</p>
              
              <div className="d-flex justify-content-between mt-3">
                <Button className="see-more-btn" size="sm">See More</Button>
                <Button className="book-btn" size="sm">Book</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default CommunityService;
