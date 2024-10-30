// src/components/ProjectCarousel.js

import React from 'react';
import { Carousel, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import pos from '../../assets/showcase/pos-dashboard.png';
import clockin from '../../assets/showcase/Clockin-management.png';
import intellimaSellerDb from '../../assets/showcase/Intellima-seller-dashboard.png';
import mamlaka from '../../assets/showcase/mam-laka.png';
import yeshara from '../../assets/showcase/yeshara.png';

const projects = [
  {
    id: 1,
    title: 'Point of Sale System',
    description: 'Optimize sales and manage inventory with our Point of Sale system.',
    image: pos,
  },
  {
    id: 2,
    title: 'Employee Clock-in Management',
    description: 'Track attendance, assign locations, and allow clock-ins within a geofence, while recording the device IMEI for secure clock-ins.',
    image: clockin,
  },
  {
    id: 3,
    title: 'Supply Chain Management',
    description: 'Connect buyers and sellers globally. Sellers send quotes, buyers confirm or reject, and if confirmed, issue an LC to the seller’s bank for the process to start.',
    image: intellimaSellerDb,
  },
  {
    id: 4,
    title: 'Africa Trade Payment Network',
    description: 'Showcasing innovative payment solutions to empower financial systems in Africa.',
    image: mamlaka,
  },
  {
    id: 5,
    title: 'Real Estate Tokenization',
    description: 'Explore a minimalistic platform for real estate tokenization and sales insights.',
    image: yeshara,
  },
];

export default function ProjectCarousel() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showHelpModal, setShowHelpModal] = React.useState(false);

  const handleViewProject = (id) => {
    navigate(`/project-details/${id}`);
  };

  const handleRequestDemo = (projectTitle) => {
    navigate('/request-demo', { state: { title: projectTitle } }); // Pass the project title
  };

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
  };

  return (
    <Container fluid className="project-section py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 font-weight-bold section-title">Our Featured Projects</h1>
          <p className="lead section-subtitle">Explore some of the most impactful solutions we’ve delivered.</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Carousel
            activeIndex={currentIndex}
            onSelect={handleSelect}
            fade
            indicators={false}
            controls={false}
            interval={4000}
            className="project-carousel"
          >
            {projects.map((project, index) => (
              <Carousel.Item key={project.id}>
                <Row className="project-slide align-items-center">
                  <Col md={6} className="text-center project-image">
                    <img className="d-block w-100 rounded" src={project.image} alt={project.title} />
                  </Col>
                  <Col md={6} className="project-details">
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <div className="buttons">
                      <Button variant="primary" className="mr-3" onClick={() => handleRequestDemo(project.title)}>
                        Request a Demo
                      </Button> &nbsp;&nbsp;
                      <Button variant="outline-secondary" onClick={() => handleViewProject(project.id)}>
                        View Project
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Custom Controls */}
          <div className="custom-controls text-center mt-3">
            <button
              className="custom-prev"
              onClick={() => handleSelect((currentIndex - 1 + projects.length) % projects.length)}
            >
              &#8592;
            </button>
            <button
              className="custom-next"
              onClick={() => handleSelect((currentIndex + 1) % projects.length)}
            >
              &#8594;
            </button>
          </div>

          {/* Custom Indicators */}
          <div className="custom-indicators text-center mt-4">
            {projects.map((_, index) => (
              <span
                key={index}
                className={`indicator ${currentIndex === index ? 'active' : ''}`}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>

          {/* Help Button */}
          <div className="text-center mt-4">
            <Button variant="info" onClick={handleHelpClick}>
              Help
            </Button>
          </div>
        </Col>
      </Row>

      {/* Help Modal */}
      <Modal show={showHelpModal} onHide={handleCloseHelpModal}>
        <Modal.Header closeButton>
          <Modal.Title className='text-dark'>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-dark'>
            We recommend requesting a demo since some of these projects are vast and cannot be captured at a glance. This will provide you with a deeper understanding of our offerings and how they can meet your needs.
          </p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
