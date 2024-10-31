import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faUtensils, faStar, faGlobe, faHandsHelping, faUserTie } from '@fortawesome/free-solid-svg-icons';
import './CulinaryTours.css';

const CulinaryToursPage = () => {
  // Dummy data for tours
  const tours = [
    {
      id: 1,
      title: "Italian Cooking Adventure",
      location: "Rome, Italy",
      duration: "5 days",
      description: "Immerse yourself in the authentic flavors of Italy as you learn to make traditional pasta, pizza, and desserts.",
      rating: 4.8,
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      title: "Street Food Tour",
      location: "Bangkok, Thailand",
      duration: "3 days",
      description: "Dive into the bustling street food scene of Bangkok and experience the vibrant flavors of Thailand.",
      rating: 4.6,
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
      id: 3,
      title: "Vineyard and Cheese Tour",
      location: "Bordeaux, France",
      duration: "4 days",
      description: "Enjoy wine tasting and artisanal cheese workshops in the picturesque vineyards of Bordeaux.",
      rating: 4.9,
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
        id: 3,
        title: "Vineyard and Cheese Tour",
        location: "Bordeaux, France",
        duration: "4 days",
        description: "Enjoy wine tasting and artisanal cheese workshops in the picturesque vineyards of Bordeaux.",
        rating: 4.9,
        imageUrl: "https://via.placeholder.com/600x400",
      },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center my-5">Explore Culinary Tours</h2>
      
      <Row>
        {/* Main Content Area */}
        <Col lg={9} md={9}>
          {/* Carousel */}
          <Carousel className="mb-4">
            {tours.map(tour => (
              <Carousel.Item key={tour.id}>
                <img
                  className="d-block w-100"
                  src={tour.imageUrl}
                  alt={tour.title}
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3>{tour.title}</h3>
                  <p>{tour.location}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          
          {/* Tour Cards */}
          <Row>
            {tours.map(tour => (
              <Col md={6} className="mb-4" key={tour.id}>
                <Card className="tour-card shadow-lg">
                  <Card.Img variant="top" src={tour.imageUrl} alt={tour.title} className="tour-image" />
                  <Card.Body>
                    <Badge bg="success" className="mb-2">
                      <FontAwesomeIcon icon={faStar} /> {tour.rating}
                    </Badge>
                    <Card.Title className="tour-title">{tour.title}</Card.Title>
                    <Card.Text>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
                      {tour.location}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faClock} className="text-warning me-2" />
                      Duration: {tour.duration}
                    </Card.Text>
                    <Card.Text className="tour-description">{tour.description}</Card.Text>
                    <div className="d-flex align-items-center">
                        <Button variant="outline-primary" className="btn-explore btn btn-sm me-3">
                            Explore Tour
                        </Button>
                        <Button variant="primary" className="btn-explore btn btn-primary btn-sm text-white">
                            Book Now
                        </Button>
                        </div>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Sidebar Area */}
        <Col md={3} className="sticky-sidebar p-0"> {/* Removed padding from the column */}

  {/* Testimonials Section */}
  <div className="testimonial-section my-4">
  <h5 className="text-center testimonial-title">What Our Travelers Say</h5>
  <div className="testimonial my-3">
    <p className="text-muted testimonial-quote">“An unforgettable experience, I learned so much!”</p>
    <p className="text-end testimonial-author">– Jane Doe</p>
  </div>
  <div className="testimonial my-3">
    <p className="text-muted testimonial-quote">“Perfectly organized, highly recommend!”</p>
    <p className="text-end testimonial-author">– John Smith</p>
  </div>
  <div className="testimonial my-3">
    <p className="text-muted testimonial-quote">“Exceeded my expectations! The food was amazing!”</p>
    <p className="text-end testimonial-author">– Alice Johnson</p>
  </div>
</div>


</Col>

      </Row>
    </Container>
  );
};

export default CulinaryToursPage;
