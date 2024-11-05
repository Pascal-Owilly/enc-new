import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Carousel } from 'react-bootstrap';
import { MdTour } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css';

import heroImg from '../../assets/hero/hero.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';

const Dot = () => {
    // Random initial position and size for each dot
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const size = Math.random() * 3 + 3; // Dot size range from 2 to 10

    return (
        <motion.div
        className="dot"
        style={{
            position: 'absolute',
            top: randomY,
            left: randomX,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: '#ffc107', 
        }}
        animate={{
            y: [0, 20, 0], // Vertical floating animation
            x: [0, 10, -10, 0], // Horizontal floating animation
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop', // Change this to 'loop' for continuous motion
            ease: 'easeInOut',
        }}
    />

    );
};

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slidesData = [
        {
            image: hero2,
            smallTitle: 'Switzerland Alps',
            mainTitle: 'SAINT ANTÖNIEN',
            description: 'Mauris malesuada facilisis enim, eget accumsan turpis eleifend.',
        },
        {
            image: heroImg,
            smallTitle: 'Japan Alps',
            mainTitle: 'NAGANO PREFECTURE',
            description: 'Explore the scenic views and serene landscapes of Nagano.',
        },
        {
            image: hero3,
            smallTitle: 'Sahara Desert, Morocco',
            mainTitle: 'MARRAKECH MERZOUGA',
            description: 'Discover the unique charm and beauty of the Moroccan Sahara.',
        },

    ];

    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    // Generate an array of dots
    const dotsArray = Array.from({ length: 50 }, (_, index) => <Dot key={index} />);

    return (
        <div className="hero-section d-flex fade-in position-relative" style={{ height: '100vh' }}>
            {/* Moving dots */}
            <div className="dots-container position-absolute w-100 h-100">
                {dotsArray}
            </div>

            {/* Left Column - Dynamic content */}
            
            <div className="col-md-3 comp-screen d-flex flex-column justify-content-center align-items-start p-4">
                <h5 className="small-title text-dark">{slidesData[currentIndex].smallTitle}</h5>
                <h3 className="main-title all-headings text-dark">{slidesData[currentIndex].mainTitle}</h3>
                <p className="description text-dark">{slidesData[currentIndex].description}</p>
                <div className="d-flex align-items-center mt-3">
                    <MdTour style={{ color: '#1c85e8', fontSize: '1.5em' }} />
                    <Button variant="" className="discover-btn ms-3 text-light" style={{backgroundColor:'#000042'}}>
                        Get Started
                    </Button>
                </div>
            </div>
            <div className="container-fluid">
                        <div className="row">
                            {/* Right Column with Carousel */}
                            <div className="col-md-12 col-sm-12 position-relative">
                            <Carousel
                        activeIndex={currentIndex}
                        onSelect={handleSelect}
                        fade
                        controls={false}
                        indicators={false}
                        interval={3000}
                        className="main-carousel"
                    >
                        {slidesData.map((slide, index) => (
                            <Carousel.Item key={index}>
                                <div
                                    className="carousel-image"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        
                                    }}
                                ></div>
                                
                                {/* Caption Content */}
                                
                                <Carousel.Caption className="d-flex flex-column align-items-start phone-screen mb-4">
                                    <h6 className="text-light small-title">{slide.smallTitle}</h6>
                                    <h3 className="text-light main-title fw-bold">{slide.mainTitle}</h3>
                                    <p className="text-light description">{slide.description}</p>
                                    <button className='book-now-btn '>Book Now!</button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    <br />

            {/* Cards Display */}
            <div className="cards-container d-flex flex-wrap justify-content-start position-absolute bottom-0 w-100 p-3">
                {slidesData.map((slide, index) => (
                    <div
                        key={index}
                        className={`${
                            index === 0 ? 'col-12' : ' col-md-3 col-sm-12'
                        } mb-3 card-hover hero-card-hover ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleSelect(index)}
                    >
                        <div className="card-hover__content">
                            <h3 className="card-hover__title">{slide.mainTitle}</h3>
                            <hr />
                            <h4
                                className="mt-5 btn btn-sm text-white"
                                style={{ background: '#000042' }}
                            >
                                Explore
                            </h4>
                        </div>
                        <img style={{height:'50vh'}} src={slide.image} alt={slide.mainTitle} className="w-100 hero-img" />
                    </div>
                ))}
            </div>

            {/* Carousel Indicators and Card Number */}
            <div className="carousel-footer position-absolute phone bottom-0 end-0 p-3 d-flex align-items-center">
                <div className="carousel-indicators">
                    {slidesData.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleSelect(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div
                    className="line"
                   
                ></div>
            </div>
        </div>
    </div>
</div>

        </div>
    );
};

export default HeroSection;
