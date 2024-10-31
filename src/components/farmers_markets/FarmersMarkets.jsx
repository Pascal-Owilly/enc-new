import React, { useState } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './FarmersMarkets.css';

const FarmersMarketsPage = () => {
  // Dummy data for farmers markets
  const markets = [
    {
      id: 1,
      name: "Sunnydale Farmers Market",
      location: "Sunnydale, CA",
      description: "A vibrant market with fresh produce, artisanal goods, and local crafts.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Green Valley Market",
      location: "Green Valley, AZ",
      description: "Explore a wide variety of organic fruits and vegetables directly from local farmers.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Old Town Market",
      location: "Old Town, TX",
      description: "Experience the charm of local vendors and delicious food options in the heart of Old Town.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.8,
    },
    {
      id: 4,
      name: "River Bend Market",
      location: "River Bend, FL",
      description: "Fresh produce and homemade goods from local farmers and artisans.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Mountain View Market",
      location: "Mountain View, CO",
      description: "A beautiful market with stunning views and fresh, local produce.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Seaside Farmers Market",
      location: "Seaside, OR",
      description: "A coastal market featuring fresh seafood and local produce.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.8,
    },
    {
      id: 7,
      name: "Desert Springs Market",
      location: "Desert Springs, NV",
      description: "A unique market with local crafts, produce, and delicious food.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.9,
    },
    {
      id: 8,
      name: "Forest Grove Market",
      location: "Forest Grove, OR",
      description: "Enjoy a variety of organic products and handmade crafts.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.7,
    },
    {
      id: 9,
      name: "Lakeside Market",
      location: "Lakeside, MI",
      description: "Fresh fruits and vegetables from local farms by the lake.",
      imageUrl: "https://via.placeholder.com/600x400",
      rating: 4.8,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMarkets = markets.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(markets.length / itemsPerPage);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5 farmers-market-page">
      <h2 className="text-center my-5 farmers-market-title">Discover Local Farmers Markets</h2>
      <Row xs={1} sm={2} md={4} className="g-4 m-2"> {/* Responsive grid settings */}
        {currentMarkets.map((market) => (
          <Col key={market.id} className="mb-4"> {/* Added margin-bottom for spacing */}
            <div className="market-card shadow-sm rounded"> {/* Using a div instead of Card */}
              <img src={market.imageUrl} alt={market.name} className="market-image rounded-top" />
              <div className="p-3">
                <Badge bg="success" className="mb-2">
                  ⭐ {market.rating}
                </Badge>
                <h5 className="market-name">{market.name}</h5>
                <p className="market-location">📍 {market.location}</p>
                <p className="market-description">{market.description}</p>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <Button variant="outline-success" className=" btn btn-sm text-warning me-2">
                    Explore Market 
                  </Button>
                  <Button variant="outline-primary" className="btn-explore btn btn-sm text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="pagination-container d-flex justify-content-center my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button 
            key={index + 1} 
            variant="light" 
            className={`pagination-button mx-1 ${currentPage === index + 1 ? 'active' : ''}`} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default FarmersMarketsPage;
