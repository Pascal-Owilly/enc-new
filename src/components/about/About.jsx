import React from 'react';
import './About.css';
import { Carousel, Col, Row, Container } from 'react-bootstrap';
import heroImage2 from '../../assets/hero/hero.jpg';
import Section1 from '../../components/about/Section1';

const AboutUs = () => {
  const goals = [
    { year: "2025", progress: 20, description: "Expand to 5 countries." },
    { year: "2026", progress: 40, description: "Expand to 10 countries." },
    { year: "2027", progress: 60, description: "Achieve 1 million customers." },
    { year: "2028", progress: 80, description: "Become a leader in sustainable travel." },
    { year: "2030", progress: 100, description: "Revolutionize global travel experiences." }
  ];

  const vision = "To be the global leader in sustainable and memorable travel experiences.";
  const mission = "Empowering travelers through innovative solutions and exceptional service.";

  const partnerLogos = Array.from({ length: 8 }, (_, i) => ({
    imgSrc: `https://via.placeholder.com/150?text=Partner+${i + 1}`,
  }));

  const serviceCards = [
    { title: "Register", imgSrc: heroImage2 },
    { title: "Book", imgSrc: heroImage2 },
    { title: "Receive Card", imgSrc: heroImage2 },
    { title: "Use the Card", imgSrc: heroImage2 }
  ];

  return (
    <div className="about-us-page-section">
      <Container fluid>
        <section className="about-us-intro">
          <h1 style={{color:'#fff'}} className=" all-headings">Welcome to Enceptics</h1>
          <h4 style={{color:'#fff'}} >We focus on what's forgotten and rare</h4>
          <Section1 /> 

        </section>

        <section className="about-us__progress">
          <h1>Our Goals</h1>
          <div className="progress-bar__container">
            {goals.map((goal, index) => (
              <div key={index} className="progress-bar__item">
                <span>{goal.year}</span>
                <progress value={goal.progress} max="100"></progress>
                <p>{goal.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-us__values">
          <h1>Vision & Mission</h1>
          <div className="timeline">
            <div className="timeline__item">
              <h2>Vision</h2>
              <p>{vision}</p>
            </div>
            <div className="timeline__item">
              <h2>Mission</h2>
              <p>{mission}</p>
            </div>
          </div>
        </section>

        <section className="about-us-difference">
          <div>
            <h2>How We Started</h2>
            <p>Our journey began with a passion for travel...</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/400x250" alt="Innovation" />
          </div>
        </section>

        <section className="about-us__partners">
          <h1>Our Partners</h1>
          <div className="partner-carousel">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="partner-logo">
                <img src={logo.imgSrc} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
        <Container className="services-section">
            <Row>
              {serviceCards.map((card, index) => (
                <Col md={3} key={index}>
                  <div className="service-animated">
                    <img src={card.imgSrc} alt={card.title} style={{width:'30px'}}/>
                    <h5>{card.title}</h5>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        <h1 className="all-headings mt-4">What We Offer</h1>
          <p>Join our Chat room, share your travel stories, and connect with fellow adventurers.</p>
          <h1 className="all-headings mt-4">Weather Updates</h1>
          <p>Get real-time weather information for your destination to help you pack and prepare.</p>
        <section className="about-us-impact">
          <h1 className="fade-in text-center all-headings mt-4">Join Our Community</h1>
          <p>Enceptics is more than an app; it's a community of travelers sharing their journeys and experiences...</p>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;