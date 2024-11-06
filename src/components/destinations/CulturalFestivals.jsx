import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import './Destinations.css';
import './CulturalFestivals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const CulturalFestivals = () => {
  const festivals = [
    { id: 1, name: 'Harvest Festival', rating: 4.7, description: 'Celebrate the harvest with food and music.', duration: 'All day', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 2, name: 'Artisan Fair', rating: 4.5, description: 'Showcasing local artisans and their crafts.', duration: 'Weekend', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 3, name: 'Music Festival', rating: 4.9, description: 'Enjoy performances from local and national artists.', duration: '2 days', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 4, name: 'Film Festival', rating: 4.6, description: 'Screenings of local and international films.', duration: '3 days', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 5, name: 'Food & Wine Festival', rating: 4.8, description: 'Indulge in gourmet food and wines.', duration: 'All weekend', imageUrl: "https://via.placeholder.com/600x400" },
    { id: 6, name: 'Dance Festival', rating: 4.7, description: 'Experience various dance performances.', duration: '2 days', imageUrl: "https://via.placeholder.com/600x400" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFestivals = festivals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(festivals.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2 className="text-center my-4">
        <FontAwesomeIcon icon={faMusic} /> Cultural Festivals
      </h2>
      
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentFestivals.map(festival => (
          <Col key={festival.id}>
            <div className="festival-card">
              {/* Image */}
              <img src={festival.imageUrl} alt={festival.name} className="festival-image" />

              <div className="festival-details p-3">
                <h5>{festival.name}</h5>
                <Badge bg="success">⭐ {festival.rating}</Badge>
                <p>{festival.description}</p>
                <p><strong>Duration:</strong> {festival.duration}</p>

                <div className="d-flex justify-content-between mt-3">
                  <Button className="see-more-btn" size="sm">See More</Button>
                  <Button className="book-btn" size="sm">Book</Button>
                </div>
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

export default CulturalFestivals;
