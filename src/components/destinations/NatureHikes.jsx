import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const NatureHikes = () => {
  const hikes = [
    { id: 1, name: 'Sunset Trail', rating: 4.8, description: 'A beautiful trail with stunning sunset views.', duration: '2 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 2, name: 'Mountain Path', rating: 4.5, description: 'An adventurous hike through the mountains.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 3, name: 'Forest Walk', rating: 4.7, description: 'A serene walk through lush forests.', duration: '1.5 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 4, name: 'River Trek', rating: 4.6, description: 'Hike along a beautiful river.', duration: '3 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 5, name: 'Hill Climb', rating: 4.3, description: 'A challenging climb with rewarding views.', duration: '4 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 6, name: 'Valley Loop', rating: 4.9, description: 'Explore a scenic valley.', duration: '2.5 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 7, name: 'Desert Trail', rating: 4.2, description: 'A unique desert hiking experience.', duration: '5 hours', imageUrl: "https://via.placeholder.com/600x400"},
    { id: 8, name: 'Coastal Path', rating: 4.4, description: 'Walk along a stunning coastline.', duration: '3.5 hours', imageUrl: "https://via.placeholder.com/600x400"},
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHikes = hikes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hikes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4"><FontAwesomeIcon icon={faTree} /> Nature Hikes</h2>
      
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentHikes.map(hike => (
          <Col key={hike.id}>
            <div className="destination-card">
              <img variant="top" src={hike.imageUrl} alt={hike.title} className="hike-image" style={{width:'100%'}}/>
              <h5>{hike.name}</h5>
              <Badge bg="success">⭐ {hike.rating}</Badge>
              <p>{hike.description}</p>
              <p>Duration: {hike.duration}</p>
              
              <div className="d-flex justify-content-between mt-3">
                <Button className="see-more-btn " size="sm">See More</Button>
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

export default NatureHikes;
