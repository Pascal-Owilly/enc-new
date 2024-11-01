import React, { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { MdTour } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css';

import heroImg from '../../assets/hero/hero.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Slide data with imported images
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
        {
            image: hero4,
            smallTitle: 'California, USA',
            mainTitle: 'YOSEMITE PARK',
            description: 'A breathtaking experience awaits at Yosemite’s natural wonders.',
        },
    ];

    // Handle carousel slide change
    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    return (
        <div className="hero-section d-flex" style={{ height: '100vh' }}>
            {/* Left Column - Dynamic content changes based on the selected slide */}
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-start p-4">
                <h5 className="small-title">{slidesData[currentIndex].smallTitle}</h5>
                <h1 className="main-title">{slidesData[currentIndex].mainTitle}</h1>
                <p className="description">{slidesData[currentIndex].description}</p>
                <div className="d-flex align-items-center mt-3">
                    <MdTour style={{ color: 'yellow', fontSize: '1.5em' }} />
                    <Button variant="primary" className="discover-btn ms-3">
                        Discover Location
                    </Button>
                </div>
            </div>

            {/* Right Column with Carousel and Card Display */}
            <div className="col-md-9 position-relative">
                {/* Main Carousel Display for the large image */}
                <Carousel activeIndex={currentIndex} onSelect={handleSelect} fade controls={false} indicators={false} interval={3000} className="main-carousel">
                    {slidesData.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div
                                className="carousel-image"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    height: '100vh',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* Cards Display */}
                <div className="cards-container d-flex justify-content-start position-absolute bottom-0 w-100 p-3">
                    {slidesData.map((slide, index) => (
                        <div key={index} className={`card-hover ${index === currentIndex ? 'active' : ''}`} onClick={() => handleSelect(index)}>
                            <div className="card-hover__content">
                                <h3 className="card-hover__title">{slide.mainTitle}</h3>
                                <hr />
                                <h4 className="mt-5 btn btn-warning btn-sm text-dark">Explore 
                            
                                </h4>
                            </div>
                            <img src={slide.image} alt={slide.mainTitle} />
                        </div>
                    ))}
                </div>

                {/* Carousel Indicators and Card Number */}
                <div className="carousel-footer position-absolute bottom-0 end-0 p-3 d-flex align-items-center">
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
                    <div className="line" style={{ flexGrow: 1, marginLeft: '70px', height: '4px', backgroundColor: '#fff' }}></div>
                    <span className="card-number ms-2" ></span>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
