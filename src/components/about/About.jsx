import React from 'react';
import './About.css';
import { Carousel, Col, Row, Container } from 'react-bootstrap'; // Ensure react-bootstrap is installed

const AboutUs = () => {
  // Define data for each service card
  const serviceCards = [
    {
      title: "Register",
      // description: "Easily book your travel ",
      imgSrc: "https://axiomq.com/wp-content/uploads/2024/04/Business-Process-Digitalization-1.png"
    },
    {
      title: "Book",
      // description: "Easily book your travel ",
      imgSrc: "https://axiomq.com/wp-content/uploads/2024/04/Business-Process-Digitalization-1.png"
    },
    {
      title: "Receive Card",
      // description: "Get your Enceptics ",
      imgSrc: "https://axiomq.com/wp-content/uploads/2024/04/Business-Process-Digitalization-1.png"
    },
    {
      title: "Use the Card",
      // description: "Use your Enceptics card.",
      imgSrc: "https://axiomq.com/wp-content/uploads/2024/04/Business-Process-Digitalization-1.png"
    }
  ];

  return (
    <div className="about-us-page-section">
      <Container>
      <section className="about-us-intro">
        <h1 className="fade-in text-center page-title all-headings mt-4">Welcome to Enceptics</h1>
        <h2 className='all-headings5' style={{color:'#000042'}}>We focus on what's forgotten and rare</h2>
        <p style={{fontFamily:'Caladea'}}>We take care of your travel needs by giving you a card with expiry date and time so you can focus on making memories</p>
        <h1 className="fade-in text-center all-headings4 page-title mt-4">How It works</h1>

        <Container className="services-section">
          <Row className="d-flex">
            {serviceCards.map((card, index) => (
              <Col md={3} key={index}>
                <div className="question__wrapper service-animated">
                  <div className="question service__type">
                    <div className="question__shape" />
                    <div className="question__animation" />
                    <div className="question__inner">
                      <div className="question__hexagon-icon">
                        <img src={card.imgSrc} alt={card.title} />
                      </div>
                      <h5 className='all-headings4' >{card.title}</h5>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <h1 className="fade-in text-center all-headings4 page-title mt-4">What we offer</h1>
        <h1 className="fade-in text-center all-headings4 page-title mt-4">A variety of destinations</h1>
          <p></p>
        <h1 className="fade-in text-center all-headings4 page-title mt-4">Tourist's Blog</h1>

                    <p> Join our Chat room, share your travel stories, and connect with fellow adventurers.</p>
                    <h1 className="fade-in text-center all-headings4 page-title mt-4">Weather Updates</h1>

                    <p> Get real-time weather information for your destination to help you pack and prepare.
                    </p>

                    <h1 className="fade-in text-center all-headings4 page-title mt-4">What we want to achieve</h1>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>Employment Creation</h3>
            <p>
              </p>
          </div>
          <div className="impact-card">
            <h3>Flexibility</h3>
            <p>
              </p>
          </div>
          <div className="impact-card">
            <h3>Global Reach</h3>
            <p>
              </p>
          </div>
        </div>  
      </section>

      <section className="about-us-values">
        <div className="values-container">
          <div className="value-card">
            <h1 className="fade-in text-center all-headings4 mt-4">Our Mission</h1>

            <p>
            At Enceptics, our mission is to create unforgettable travel experiences by offering hassle-free bookings, expertly curated tours, and reliable services.            </p>
          </div>
          <div className="value-card">
            <h1 className="fade-in text-center all-headings4 mt-4">What We Do</h1>
            <p>We simplify the tokenization of assets, offering complete solutions from valuation to compliance, dividend management, and secondary trading options.</p>
          </div>
          <div className="value-card">
            <h1 className="fade-in text-center all-headings4 mt-4">Why Us?</h1>

            <p>
            Our vision is to connect travelers with their dream destinations, providing seamless transportation, accommodations, and insightful tour guides.
            </p>
                      </div>
        </div>
      </section>

      <section className="about-us-difference">
        <div className="difference-left">
          <h2>How We Started</h2>
          <p>
            </p>
        </div>
        <div className="difference-right">
          <img src="https://via.placeholder.com/400x250" alt="Innovation" />
        </div>
      </section>

      <section className="about-us-impact">
             

        {/* Carousel Section */}
        <h2 className='all-headings4 text-dark mb-5'>We partner with visionaries to drive <br /> global innovation
        </h2>
        <Carousel className="full-page-carousel">
          <Carousel.Item>
            <img className="d-block w-100" src="https://via.placeholder.com/1920x800?text=Our+Partners" alt="Our Partners" />
            <Carousel.Caption>
              <h3>Our Partners</h3>
              <p>We collaborate with industry leaders to bring innovative solutions in real estate investment.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://via.placeholder.com/1920x800?text=Innovative+Solutions" alt="Innovative Solutions" />
            <Carousel.Caption>
              <h3>Innovative Solutions</h3>
              <p>Experience the future of real estate investment with cutting-edge tokenization technology.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://via.placeholder.com/1920x800?text=Global+Accessibility" alt="Global Accessibility" />
            <Carousel.Caption>
              <h3>Global Accessibility</h3>
              <p>Join a diverse community of investors worldwide, all investing together.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h1 className="fade-in text-center all-headings4 page-title mt-4">Join Our Community</h1>
                    
                    <p style={{fontFamily:'Caladea'}}>
                    Enceptics is more than an app; it's a community of travelers sharing their journeys and experiences. Connect with like-minded individuals, exchange tips, and inspire each other.
                    Whether you're an avid globetrotter or a first-time traveler, you're welcome here. Let's explore the world together.
                    </p>
      </section>
      </Container>

    </div>
  );
};

export default AboutUs;
