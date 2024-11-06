import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const ArtWorkshops = () => {
  const workshops = [
    { id: 1, name: 'Watercolor Basics', rating: 4.9, description: 'Learn the basics of watercolor painting.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 2, name: 'Ceramic Art', rating: 4.6, description: 'Create beautiful ceramic pieces.', duration: '4 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 3, name: 'Acrylic Pouring', rating: 4.8, description: 'Experience the magic of acrylic pouring.', duration: '2 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 4, name: 'Oil Painting Mastery', rating: 4.7, description: 'Master the techniques of oil painting.', duration: '5 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 5, name: 'Sketching for Beginners', rating: 4.5, description: 'Learn the fundamentals of sketching.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 6, name: 'Advanced Pottery', rating: 4.8, description: 'Take your pottery skills to the next level.', duration: '6 hours', imageUrl: "https://via.placeholder.com/600x400" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(workshops.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faPaintBrush} /> Art Workshops</h2>
      
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentWorkshops.map(workshop => (
          <Col key={workshop.id}>
            <div className="destination-card">
              <img src={workshop.imageUrl} alt={workshop.name} className="workshop-image" style={{ width: '100%' }} />
              <h5>{workshop.name}</h5>
              <Badge bg="success">⭐ {workshop.rating}</Badge>
              <p>{workshop.description}</p>
              <p>Duration: {workshop.duration}</p>
              
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

export default ArtWorkshops;
