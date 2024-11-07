import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Row } from 'react-bootstrap';

import heroImg from '../../assets/hero/hero.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';

const carouselData = [
    {
        title: "Stay in the know, even on the go",
        description: "Never want to miss a thing? We'll get you the latest news, trends, insights, and BCD news right in your inbox.",
        buttonText: "Sign Up Now",
        bookingText: "Book a Meeting",
        backgroundImage: heroImg
    },
    {
        title: "Your Business, Our Priority",
        description: "Get updates on the latest business insights tailored to help you grow.",
        buttonText: "Learn More",
        bookingText: "Book Now!",
        backgroundImage: hero2
    },
    {
        title: "Travel with Confidence",
        description: "Our travel insights will keep you prepared and informed wherever you go.",
        buttonText: "Get Started",
        bookingText: "Book Now!",
        backgroundImage: hero3
    },
    {
        title: "Stay Ahead of Trends",
        description: "Our research team curates trends so you can focus on what's important.",
        buttonText: "Explore Now",
        bookingText: "Book Now!",
        backgroundImage: hero4
    }
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const { title, description, buttonText, bookingText, backgroundImage } = carouselData[currentIndex];

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Container fluid>
        <Row>
        <section
            className="d-flex fade-in align-items-center justify-content-center text-white vh-100 position-relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out'
            }}
        >
            <div className="position-absolute w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
            <div className={`position-relative text-center ${fade ? 'fade show' : 'fade'}`} style={{width:'90'}}>
                <h1 className="display-4 all-headings fw-bold">{title}</h1>
                <p className="lead mb-4 text-white" style={{textTransform:'capitalize'}}>{description}</p>
                <a href="#" className="btn text-light btn-sm mx-2" style={{ background: '#000042' }}>{bookingText}</a>
            </div>
            
            {/* Wavy Border with Carousel Indicators */}
            <div className="wavy-border position-absolute bottom-0 w-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="50%" style={{ stopColor: "rgb(0, 0, 66, 0.8)", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "rgb(0, 0, 66, 0.9)", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path fill="url(#gradient)" fillOpacity="1" d="M0,256L60,240C120,224,240,192,360,160C480,128,600,96,720,80C840,64,960,64,1080,85.3C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                
                {/* Carousel Indicators */}
                <div className="carousel-indicators position-absolute text-center" style={{ bottom: "20px" }}>
                    {carouselData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`indicator-btn mx-2 ${currentIndex === index ? 'active' : ''}`}
                            style={{
                                border: '1px solid',
                                backgroundColor: currentIndex === index ? '#0077B6' : 'transparent',
                                borderColor: currentIndex === index ? '#0077B6' : '#fff',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                fontWeight: 'bold',
                                color: currentIndex === index ? '#000042' : '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                            }}
                        >
                            {index + 1} 
                        </button>
                    ))}
                </div>
            </div>
        </section>
        </Row>
        </Container>
    );
};

export default HeroSection;
