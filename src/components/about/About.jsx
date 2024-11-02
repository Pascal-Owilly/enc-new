import React from 'react';
import './About.css';
import { Carousel } from 'react-bootstrap'; // Make sure to install react-bootstrap for the carousel

const AboutUs = () => {
  return (
    <div className="about-us-page">


      <section className="about-us-intro">
        <h1 className="fade-in">Welcome to Enceptics</h1>
        <p>
          Enceptics is revolutionizing real estate investment through cutting-edge tokenization technology. We make property investment accessible, efficient, and globally inclusive — all while maintaining top-tier compliance.
        </p>
      </section>

      <section className="about-us-values">
        <div className="values-container">
          <div className="value-card">
            <h2>Our Mission</h2>
            <p>We strive to democratize real estate investment, making it easy for both small and large investors to participate. Transparency, efficiency, and compliance are our core pillars.</p>
          </div>
          <div className="value-card">
            <h2>What We Do</h2>
            <p>We simplify the tokenization of assets, offering complete solutions from valuation to compliance, dividend management, and secondary trading options.</p>
          </div>
          <div className="value-card">
            <h2>Why Choose Us?</h2>
            <p>We combine expertise in real estate and blockchain to provide flexible, legally-compliant investment options tailored to both issuers and investors.</p>
          </div>
        </div>
      </section>

      <section className="about-us-difference">
        <div className="difference-left">
          <h2>Innovative Solutions</h2>
          <p>Blockchain technology meets real estate, bringing a whole new level of liquidity, efficiency, and global reach to your investments.</p>
        </div>
        <div className="difference-right">
          <img src="https://via.placeholder.com/400x250" alt="Innovation" />
        </div>
      </section>

      <section className="about-us-impact">
        <h2 className="impact-heading">Making a Real Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>Compliance</h3>
            <p>Enceptics ensures that every tokenized offering adheres to stringent regulatory standards, creating a secure environment for investors.</p>
          </div>
          <div className="impact-card">
            <h3>Flexibility</h3>
            <p>From fractional ownership to secondary trading, we provide unmatched flexibility for both issuers and investors.</p>
          </div>
          <div className="impact-card">
            <h3>Global Reach</h3>
            <p>With Enceptics, you can access a global pool of investors, breaking down barriers to real estate capital.</p>
          </div>
        </div>
      <h2>Partners</h2>
              {/* Carousel Section */}
      <Carousel className="full-page-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x800?text=Our+Partners"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Our Partners</h3>
            <p>We collaborate with industry leaders to bring innovative solutions in real estate investment.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x800?text=Innovative+Solutions"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Innovative Solutions</h3>
            <p>Experience the future of real estate investment with cutting-edge tokenization technology.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x800?text=Global+Accessibility"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Global Accessibility</h3>
            <p>Join a diverse community of investors from around the world, all investing together.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </section>
    </div>
  );
};

export default AboutUs;
