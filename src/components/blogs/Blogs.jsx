import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Blogs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import heroImage2 from '../../assets/hero/hero.jpg';
import heroImage3 from '../../assets/hero/hero3.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      name: 'Micro-Adventure',
      description: 'Embark on small adventures that bring big experiences.',
      price: '150',
      link: '/destinations/micro-adventure',
      image: adventure,
    },

    {
      name: 'Group Booking',
      description: 'Organize trips for large groups at discounted rates.',
      price: '500',
      link: '/destination/group-bookings',
      image: group,
    },
    {
      name: 'Culinary Tours',
      description: 'Taste the local flavors and enjoy cooking classes.',
      price: '$300',
      link: '/destinations/culinary-tours',
      image: culinary,
    },
    {
      name: 'Farmers\' Markets',
      description: 'Experience the best of local produce and artisan products.',
      price: '$50',
      link: '/destinations/farmers-markets',
      image: farming,
    },
    {
      name: 'Nature Hikes',
      description: 'Explore breathtaking nature trails and serene landscapes.',
      price: '$120',
      link: '/destinations/nature-hikes',
      image: nature2,
    },
    {
      name: 'Art Workshops',
      description: 'Get creative with hands-on art sessions and local artists.',
      price: '$200',
      link: '/destinations/art-workshops',
      image: art,
    },
    {
      name: 'Cultural Festivals',
      description: 'Dive into the rich culture through vibrant festivals.',
      price: '$180',
      link: '/destinations/cultural-festivals',
      image: cultural,
    },
    {
      name: 'Historical Tours',
      description: 'Discover the history and landmarks of the area.',
      price: '$250',
      link: '/destinations/historical-tours',
      image: historical,
    },
    {
      name: 'Community Service',
      description: 'Engage in activities that benefit local communities.',
      price: '$100',
      link: '/destinations/community-service',
      image: community,
    },
    {
      name: 'Outdoor Adventures',
      description: 'Experience thrilling outdoor activities and nature.',
      price: '$220',
      link: '/destinations/outdoor-adventures',
      image: outdoor,
    },
    {
      name: 'Wellness Retreats',
      description: 'Relax and rejuvenate with wellness programs.',
      price: '$400',
      link: '/destinations/wellness-retreats',
      image: retreats3,
    },
    {
      name: 'Local Sports Events',
      description: 'Experience the excitement of local sports events.',
      price: '$75',
      link: '/destinations/local-sports',
      image: sports,
    },
    {
      name: 'Music and Dance Classes',
      description: 'Learn music and dance from local experts.',
      price: '$150',
      link: '/destinations/music-dance',
      image: music,
    },
    {
      name: 'Local Artisan Tours',
      description: 'Explore the craftsmanship of local artisans.',
      price: '130',
      link: '/destinations/artisan-tours',
      image: artisan,
    },
    {
      name: 'Themed Photo Walks',
      description: 'Capture beautiful moments on guided photo walks.',
      price: '80',
      link: '/destinations/photo-walks',
      image: photo,
    },
    {
      name: 'Wildlife Spotting',
      description: 'Observe and learn about local wildlife.',
      price: '200',
      link: '/destinations/wildlife-spotting',
      image: wildlife,
    },
    {
      name: 'Cultural Exchange',
      description: 'Engage in cultural exchanges with locals.',
      price: '150',
      link: '/destinations/cultural-exchange',
      image: cultural,
    },
    {
      name: 'Storytelling Nights',
      description: 'Enjoy evenings of storytelling and local tales.',
      price: '50',
      link: '/destinations/storytelling',
      image: story,
    },
    {
      name: 'Virtual Reality',
      description: 'Experience immersive virtual reality adventures.',
      price: '300',
      link: '/destinations/vr-2',
      image: vr,
    },
  ];

  const itineraries = [
    { href: '/itineraries/sustainable', title: 'Sustainable Travels', image: heroImage3 },
    { href: '/itineraries/custom', title: 'Custom Itineraries', image: heroImage2 },
    // { href: '/destinations/tour-and-learn', title: 'Tour & Learn' , image: heroImage3},
  ];

  const [welcomeText, setWelcomeText] = useState('Discover Your   Adventure');

  const texts = [
    'Explore Categories ',
    'Find Your Perfect Match',
    'Create Memories to Cherish Forever',
  ];

  useEffect(() => {
    gsap.from('.welcome-text', {
      duration: 1.5,
      opacity: 0,
      y: -100,
      ease: 'bounce.out',
    }); 

    const textInterval = setInterval(() => {
      setWelcomeText((prevText) => {
        const currentIndex = texts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % texts.length;
        return texts[nextIndex];
      });
    }, 4000);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.welcome-text',
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'bounce.out' }
    );
  }, [welcomeText]);

  useEffect(() => {
    gsap.to('.clouds', {
      x: '+=1000',
      duration: 30,
      repeat: -1,
      ease: 'linear',
      repeatDelay: 2,
    });
  }, []);

  useEffect(() => {
    gsap.to('.offer-card', {
      scrollTrigger: {
        trigger: '.special-offers',
        start: 'top 0%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: 'power1.inOut',
    });
  }, []);

  const testimonials = [
    {
      quote: "The service was amazing! I've never had such a smooth experience with any company. Highly recommend!",
      author: "John Doe",
      image: "https://via.placeholder.com/80", // Replace with your image URL
    },
    {
      quote: "Their attention to detail and customer service are unparalleled. I felt valued and appreciated.",
      author: "Jane Smith",
      image: "https://via.placeholder.com/80", // Replace with your image URL
    },
    {
      quote: "Fantastic experience! I'll definitely be returning for more. Thank you for going above and beyond.",
      author: "Emily Johnson",
      image: "https://via.placeholder.com/80", // Replace with your image URL
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const partners = [
    { name: "Partner 1", logo: "https://via.placeholder.com/100x50" }, // Replace with partner logo URL
    { name: "Partner 2", logo: "https://via.placeholder.com/100x50" },
    { name: "Partner 3", logo: "https://via.placeholder.com/100x50" },
    { name: "Partner 4", logo: "https://via.placeholder.com/100x50" },
    { name: "Partner 5", logo: "https://via.placeholder.com/100x50" },
    { name: "Partner 6", logo: "https://via.placeholder.com/100x50" },
  ];

  return (
    <div className="container-fluid categories">
      <div className="jumbotron">
        <header>
          {/* <h3 className="welcome-text m-auto" style={{ maxWidth: '70%' }}>
            {welcomeText}
          </h3> */}
        </header>
        <main>
          {/* Featured Destinations */}
          <section className="destination-showcase">
          <h3 className="all-headi text-dark">Explore Categories</h3>
          <div className="cards-container" >
  {cards.map((card, index) => (
    <a href={card.link} className="card" style={{ textDecoration: 'none', width: '300px' }} key={index}>
      <div
        className={`category-${card.title ? card.title.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          height: '300px',
          color: 'white',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
      >
        <h3 style={{ margin: '0', fontSize: '1.5em', fontWeight: 'bold',color:'#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>{card.name}</h3>
        <p style={{ margin: '5px 0', fontSize: '0.9em',color:'#ddd', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{card.description}</p>
        <span className="price" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          <span className="discount-price" style={{ textDecoration: 'line-through', marginRight: '5px', color: 'rgba(255,255,255,0.7)' }}>${card.originalPrice}</span>
          <b style={{ color: '#ffcc00' }}>{card.price}</b>
        </span>
        <span className="rating" style={{ fontSize: '0.9em', marginTop: '5px' }}>⭐ {card.rating} / 5</span>
        <a href={card.link} className="explore-btn" style={{
          marginTop: '10px',
          padding: '10px 15px',
          backgroundColor: 'transparent',
          border:'1px solid #ddd',
          color: '#fff',
          borderRadius: '5px',
          textAlign: 'center',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffd700'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}>
          Plan My Adventure
        </a>
      </div>
    </a>
  ))}
</div>

          </section>

        {/* Custom Itineraries */}
        <hr />

        <section className="itineraries-showcase">
          <h3 className="all-head text-dark">Custom Itineraries</h3>

          <div className="cards-container">
            {itineraries.map((itinerary, index) => (
            <a href={itinerary.href} className="card" style={{textDecoration:'none'}}>

            <div
            className={` category-${itinerary.  title ? itinerary.title.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
            key={index}
          >
                <div className="image-placeholder">
                  <img src={itinerary.image} alt={itinerary.title} style={{ width: '100%' }} />
                </div>
                <h3>{itinerary.title}</h3>
                <a href={itinerary.href} className="btn">
                  View Details
                </a>
              </div>
              </a>
            ))}
          </div>
        </section>

      {/* Special Offers */}
      <section className="promotions-section">

      <div className="special-offers">
        <h2>Special Offers</h2>
        <div className="offer-card">
          <div className="offer-content">
            <h3>🔥 Limited Time Deal! 🔥</h3>
            <p>
              Save up to <strong>50%</strong> on our exclusive adventure packages. 
              Book now and make memories that last a lifetime!
            </p>
            <button className="offer-btn">Grab the Deal</button>
          </div>
        </div>
      </div>
    </section>
   {/* Testimonials */}
<div className="container-fluid my-5 py-4" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
  {/* Heading */}
  <h1 className="welcome-text text-left">From travel stories</h1>

  <div style={{ display: "flex", overflow: "hidden", position: "relative", flexWrap: "wrap", maxWidth:'100%'}}>
  <div
    style={{
      display: "flex",
      transform: `translateX(-${activeIndex * 100}%)`,
      transition: "transform 0.5s ease-in-out",
      width: '100%',
    }}
  >
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        className="col-12 col-sm-6 col-md-4 p-3"  // Bootstrap grid classes for responsiveness
        style={{
          flex: "0 0 100%",
          padding: "30px",
          boxSizing: "border-box",
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 10px",
        }}
      >
        {/* Quote Section */}
        <div style={{
          position: "relative",
          padding: "20px",
          fontStyle: "italic",
          color: "#555",
          fontSize: "1.1em",
          lineHeight: "1.6",
          textAlign: "center",
          borderLeft: "10px solid #773697",
          borderRadius: "5px",
        }}>
          <blockquote style={{ margin: "0" }}>
            <span style={{
              position: "absolute",
              left: "-20px",
              top: "50%",
              maxWidth: '100%',
              borderTop: "10px solid transparent",
              borderRight: "10px solid #773697",
              borderBottom: "10px solid transparent",
            }}></span>  
            "{testimonial.quote}"
          </blockquote>
        </div>

        {/* Author Section */}
        <div style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}>
          <img src={testimonial.image} alt={testimonial.author} className="img-fluid rounded-circle" style={{
            width: "60px",
            height: "60px",
            marginRight: "10px",
            position: "absolute",
            bottom: "-10px",
            left: "30px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }} />
          <div>
            <p style={{
              fontWeight: "bold",
              color: "#333",
              fontSize: "1em",
              marginBottom: "0",
            }}>
              - {testimonial.author}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

</div>

        </main>
      </div>
    </div>
  );
};

export default VacationPage;
