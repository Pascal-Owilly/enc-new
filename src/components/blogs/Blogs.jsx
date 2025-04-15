import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import heroImage2 from '../../assets/hero/hero.jpg';
import heroImage3 from '../../assets/hero/hero3.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Blogs.css';
// import Slides from './Slides';
import adventure from '../../assets/categories/adventure.jpg';
import vr from '../../assets/categories/vr.jpg';
import story from '../../assets/categories/story.jpg';
import cultural from '../../assets/categories/cultural.jpg';
import photo from '../../assets/categories/photo.jpg';
import sports from '../../assets/categories/sports.jpg';
import retreats3 from '../../assets/categories/retreats3.jpg';
import community from '../../assets/categories/community.jpg';
import historical from '../../assets/categories/historical.jpg';
import nature2 from '../../assets/categories/nature2.jpg';
import group from '../../assets/categories/group.jpg';
import culinary from '../../assets/categories/culinary.jpg';
import outdoor from '../../assets/categories/outdoor.jpg';
import farming from '../../assets/categories/farming.jpg';
import art from '../../assets/categories/art.jpg';
import artisan from '../../assets/categories/artisan.jpg';
import music from '../../assets/categories/music.jpg';
import wildlife from '../../assets/categories/wildlife.jpg';

const VacationPage = () => {
  // Titles, descriptions, and links for the cards
  const cards = [
    {
      name: 'Culinary Dishes',
      description: 'Taste the local flavors and enjoy cooking classes.',
      // price: '$300',
      link: '/destinations/culinary-tours',
      image: culinary,
    },
     {
      name: 'Virtual Reality',
      description: 'Experience immersive virtual reality adventures.',
      // price: '300',
      link: '/destinations/vr-2',
      image: vr,
    },

    {
      name: 'Farmers\' Markets',
      description: 'Experience the best of local produce and artisan products.',
      // price: '$50',
      link: '/destinations/farmers-markets',
      image: farming,
    },
    {
      name: 'Nature Hikes',
      description: 'Explore breathtaking nature trails and serene landscapes.',
      // price: '$120',
      link: '/destinations/nature-hikes',
      image: nature2,
    },
        {
      name: 'Micro-Adventure',
      description: 'Embark on small adventures that bring big experiences.',
      // price: '150',
      link: '/destinations/micro-adventure',
      image: adventure,
    },
    {
      name: 'Art Workshops',
      description: 'Get creative with hands-on art sessions and local artists.',
      // price: '$200',
      link: '/destinations/art-workshops',
      image: art,
    },
    {
      name: 'Cultural Festivals',
      description: 'Dive into the rich culture through vibrant festivals.',
      // price: '$180',
      link: '/destinations/cultural-festivals',
      image: cultural,
    },
    {
      name: 'Historical Tours',
      description: 'Discover the history and landmarks of the area.',
      // price: '$250',
      link: '/destinations/historical-tours',
      image: historical,
    },
    {
      name: 'Community Service',
      description: 'Engage in activities that benefit local communities.',
      // price: '$100',
      link: '/destinations/community-service',
      image: community,
    },
    {
      name: 'Outdoor Adventures',
      description: 'Experience thrilling outdoor activities and nature.',
      // price: '$220',
      link: '/destinations/outdoor-adventures',
      image: outdoor,
    },
    {
      name: 'Group Booking',
      description: 'Organize trips for large groups at discounted rates.',
      // price: '500',
      link: '/destination/group-bookings',
      image: group,
    },
    {
      name: 'Wellness Retreats',
      description: 'Relax and rejuvenate with wellness programs.',
      // price: '$400',
      link: '/destinations/wellness-retreats',
      image: retreats3,
    },
    {
      name: 'Local Sports Events',
      description: 'Experience the excitement of local sports events.',
      // price: '$75',
      link: '/destinations/local-sports',
      image: sports,
    },
    {
      name: 'Music and Dance',
      description: 'Learn music and dance from local experts.',
      // price: '$150',
      link: '/destinations/music-dance',
      image: music,
    },
    {
      name: 'Local Artisan Tours',
      description: 'Explore the craftsmanship of local artisans.',
      // price: '130',
      link: '/destinations/artisan-tours',
      image: artisan,
    },
    {
      name: 'Themed Photo Walks',
      description: 'Capture beautiful moments on guided photo walks.',
      // price: '80',
      link: '/destinations/photo-walks',
      image: photo,
    },

    {
      name: 'Wildlife Spotting',
      description: 'Observe and learn about local wildlife.',
      // price: '200',
      link: '/destinations/wildlife-spotting',
      image: wildlife,
    },
    {
      name: 'Cultural Exchange',
      description: 'Engage in cultural exchanges with locals.',
      // price: '150',
      link: '/destinations/cultural-exchange',
      image: cultural,
    },
    {
      name: 'Storytelling Sessions',
      description: 'Enjoy sessions of storytelling and local tales.',
      // price: '50',
      link: '/destinations/storytelling',
      image: story,
    },
   
  ];

const itineraries = [
  { 
    href: '/itineraries/sustainable', 
    title: 'Sustainable Travels', 
    image: heroImage3, 
    description: "Explore the world responsibly with our eco-friendly travel options. Enjoy breathtaking destinations while minimizing your environmental impact." 
  },
  { 
    href: '/itineraries/custom', 
    title: 'Custom Itineraries', 
    image: heroImage2, 
    description: "Tailor your journey to match your unique travel style. From luxury escapes to adventure-packed trips, design an itinerary that's truly yours." 
  },
];

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  };

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  customPaging: (i) => <button>{i + 1}</button>, // optional custom numbering
  appendDots: dots => (
    <div>
      <ul className="custom-dots">{dots}</ul>
    </div>
  ),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


  return (
    <div className="container-fluid ">
      <div className="jumbotron">
        <main>
        {/*<Slides />*/}
          {/* Featured Destinations */}
        <section className="destination-showcase" style={{ position: 'relative' }}>
    <h3 className="text-dark">Explore All Categories</h3>

        <Slider {...settings}>
        {cards.map((card, index) => (
            <div key={index} className="card-wrapper">
              <a href={card.link} className="card-link">
                <div
                    className={`category-card category-${card.name ? card.name.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
                    style={{
                        backgroundImage: `url(${card.image})`,
                    }}
                >
                    <div className="card-content">
                      <h3 className="card-title">{card.name}</h3>
                      <p className="card-description " style={{color:'#FFD700', fontWeight:'bold'}}>{card.description}</p>
                      <a href={card.link} className="explore-btn" style={{fontWeight:'bold', letterSpacing:'1px'}}>
                          Plan My Adventure
                      </a>
                    </div>
                </div>
              </a>
            </div>
        ))}
    </Slider>
    
    <a href="/all-places" style={{
        position: 'absolute',
        bottom: '-10px',
        right: '20px',
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
        Explore All
    </a>
</section>

        {/* Custom Itineraries */}
       <hr />

        </main>
      </div>
    </div>
  );
};

export default VacationPage;