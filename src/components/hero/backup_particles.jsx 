import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import Typed from 'typed.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import intellimaSellerDb from '../../assets/showcase/Intellima-seller-dashboard.png';
import mamlaka from '../../assets/showcase/mam-laka.png';
import yeshara from '../../assets/showcase/yeshara.png';
import heroImg from '../../assets/hero/hero.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';

const destinations = [
    
    {
        image: hero2,
        title: 'Intellima Seller Dashboard',
        description: 'Manage your bookings with ease and reach new customers with our intuitive dashboard.',
    },
    {
        image: hero3,
        title: 'Mamlaka',
        description: 'Seamless booking integration to maximize occupancy for hotels and Airbnb hosts.',
    },
    {
        image: hero4,
        title: 'Yeshara',
        description: 'Take advantage of our platform to increase your visibility and secure more reservations.',
    },
];

const styles = {
    heroContainer: {
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        backgroundColor: '#000042',
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'moveBackground 20s infinite linear', // Parallax effect
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '2rem',
        zIndex: 2, // Ensure text is above the carousel
    },
    ovalContainer: {
        overflow: 'hidden',
        // border: '10px solid #1c85e8', 
        border: '', 

        height: 'auto',
        width: '90%',
        margin: '0 auto',
        position: 'relative',
        boxShadow: '0 3px 3px rgba(255, 255, 255, 0.4)',
        transition: 'transform 0.8s ease-in-out',
    },
    carousel: {
        height: '400px',
        opacity: 0.8, // Semi-transparent carousel
        position: 'relative',
        zIndex: 1, // Keep carousel behind the text
        
    },
    primaryColor: '#1c85e8',
    button: {
        backgroundColor: '#000042',
        border: 'none',
        borderRadius: '30px',
        fontWeight: 'bold',
        padding: '12px 30px',
        fontSize: '1.2rem',
        boxShadow: '0 4px 15px rgba(28, 133, 232, 0.6)',
    },
    heading: {
        fontWeight: '700',
        marginBottom: '20px',
        textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        width: '100%',
    },
    subText: {
        fontSize: '1.5rem',
        marginTop: '1rem',
        opacity: 0.95,
        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
    },
    star: {
        position: 'absolute',
        width: '4px',
        height: '4px',
        borderRadius: '10%',
        backgroundColor: 'yellow',
        opacity: 0.9,
    },
};

// CSS for parallax effect
const parallaxStyles = `
  @keyframes moveBackground {
    0% {
      background-position: center;
    }
    100% {
      background-position: center top;
    }
  }
`;

const generateParticles = (numParticles) => {
    return Array.from({ length: numParticles }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1, // Smaller size for star-like particles
        duration: Math.random() * 5 + 5, // Duration between 5 and 10 seconds
        delay: Math.random() * 0, // Random delay
    }));
};

export default function HeroSection() {
    const typedElement = useRef(null);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setParticles(generateParticles(350)); // Generate particles

        const options = {
            strings: [
                'Running a hotel or Airbnb?',
                'Need more bookings?',
                'Boost your reservations with Enceptics!',
            ],
            typeSpeed: 60,
            backSpeed: 50,
            backDelay: 1000,
            showCursor: true,
            loop: true,
        };
        const typed = new Typed(typedElement.current, options);
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <style>{parallaxStyles}</style> {/* Parallax background animation */}
            <motion.section
                style={styles.heroContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        style={{
                            ...styles.star,
                            width: particle.size,
                            height: particle.size,
                            top: particle.y,
                            left: particle.x,
                        }}
                        animate={{
                            y: [particle.y, particle.y - 100, particle.y + 100],
                            x: [particle.x, particle.x + 50, particle.x - 50],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}

                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col md={6} className="p-0 d-flex justify-content-center align-items-center">
                            <motion.div
                                style={styles.ovalContainer}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            >
                              <Carousel
  indicators={false}
  controls={true}
  className="carousel-fade"
  interval={4000}
//   onSelect={handleSlideChange}
  style={styles.carousel}
>
  {destinations.map((destination, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100 carousel-image"
        src={destination.image}
        alt={`Destination ${index + 1}`}
        style={{ objectFit: 'cover', height: '100%', width: '100%', opacity: 0.5 }} // Adjust the opacity here
      />
      <Carousel.Caption style={{ zIndex: 10 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '', textShadow: '0 4px 10px rgba(0,0,0,0.7)', color: '#fff' }}>
          {destination.description}
        </h3>
        <p style={{ fontSize: '1rem', color: '#ffffff', textShadow: '0 2px 5px rgba(0,0,0,0.7)' }}>
          {/* Additional caption text if needed */}
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel>

                            </motion.div>
                        </Col>

                        <Col md={4} className="p-0 d-flex justify-content-center align-items-center" style={styles.textContainer}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <h4 style={styles.heading}>
                                    <span ref={typedElement} id="typed-text"></span>
                                </h4>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button className="btn-lg mt-3 hero-button" style={styles.button}>
                                        Get Started <FontAwesomeIcon icon={faArrowRight} />
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>
        </>
    );
}
