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

const VacationPage = () => {
  // Titles, descriptions, and links for the cards
  const cards = [
    {
      name: 'Micro-Adventure',
      description: 'Embark on small adventures that bring big experiences.',
      price: '$150',
      link: '/destinations/micro-adventure',
      image: heroImage2,

    },
    {
      name: 'Explore',
      description: 'Discover new places and expand your horizons.',
      price: '$200',
      link: '/destinations/explore',
      image: heroImage3,

    },
    {
      name: 'Group Booking',
      description: 'Organize trips for large groups at discounted rates.',
      price: '$500',
      link: '/destinations/group-booking',
      image: heroImage2,

    },
    {
      name: 'Culinary Tours',
      description: 'Taste the local flavors and enjoy cooking classes.',
      price: '$300',
      link: '/destinations/culinary-tours',
      image: heroImage3,

    },
    {
      name: 'Farmers\' Markets',
      description: 'Experience the best of local produce and artisan products.',
      price: '$50',
      link: '/destinations/farmers-markets',
      image: heroImage2,

    },
    {
      name: 'Nature Hikes',
      description: 'Explore breathtaking nature trails and serene landscapes.',
      price: '$120',
      link: '/destinations/nature-hikes',
      image: heroImage3,

    },
    {
      name: 'Art Workshops',
      description: 'Get creative with hands-on art sessions and local artists.',
      price: '$200',
      link: '/destinations/art-workshops',
      image: heroImage2,

    },
    {
      name: 'Cultural Festivals',
      description: 'Dive into the rich culture through vibrant festivals.',
      price: '$180',
      link: '/destinations/cultural-festivals',
      image: heroImage3,

    },
    {
      name: 'Historical Tours',
      description: 'Discover the history and landmarks of the area.',
      price: '$250',
      link: '/destinations/historical-tours',
      image: heroImage2,

    },
  ];

  const itineraries = [
    { href: '/itineraries/relaxation', title: 'Relax & Rejuvenate', image: heroImage2 },
    { href: '/itineraries/family', title: 'Family Fun', image: heroImage3 },
    { href: '/itineraries/exploration', title: 'Explore the Unknown', image: heroImage2 },
    { href: '/itineraries/sustainable', title: 'Sustainable Travels', image: heroImage3 },
    { href: '/itineraries/custom', title: 'Custom Itineraries', image: heroImage2 },
    { href: '/itineraries/tour-learn', title: 'Tour & Learn' , image: heroImage3},
  ];

  const [welcomeText, setWelcomeText] = useState('Discover Your Next Adventure');

  const texts = [
    'Discover Your Next Adventure',
    'Explore Exciting Categories and Find Your Perfect Match',
    'Experience Unforgettable Journeys Around the World',
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
          <h1 className="welcome-text m-auto" style={{ maxWidth: '70%' }}>
            {welcomeText}
          </h1>
        </header>
        <main>
          {/* Featured Destinations */}
          <section className="destination-showcase">
            <div className="cards-container">
              {cards.map((card, index) => (
                <div
                className={`card category-${card.title ? card.title.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
                >
                  <div className="image-placeholder">
                    <img src={card.image} alt={card.name} style={{ width: '100%' }} />
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                  <span className="price">{card.price}</span>
                  <a href={card.link} className="btn">
                    View Details  
                  </a>
                </div>
              ))}
            </div>
          </section>

        {/* Custom Itineraries */}
        <section className="itineraries-showcase">
          <h2>Custom Itineraries</h2>
          <div className="cards-container">
            {itineraries.map((itinerary, index) => (
            <div
            className={`card category-${itinerary.title ? itinerary.title.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`}
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
          <div style={{ width: "80%", margin: "50px auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      {/* <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>What Our Customers Say</h2> */}
      <h1 className='welcome-text mt-5 text-left'>From travel stories</h1>

      <div style={{ display: "flex", overflow: "hidden", position: "relative" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
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
                    transform: "translateY(-50%)",
                    width: "0",
                    height: "0",
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
                <img src={testimonial.image} alt={testimonial.author} style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  position: "absolute",
                  bottom: "-30px",
                  left: "20px",
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

      {/* Navigation Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "10",
      }}>
        <button
          onClick={goToPrevSlide}
          style={{
            padding: "10px 15px",
            margin: "0 5px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ◀
        </button>
        <button
          onClick={goToNextSlide}
          style={{
            padding: "10px 15px",
            margin: "0 5px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ▶
        </button>
      </div>
    </div>

     {/* Partners Section */}
     <div style={{ textAlign: "center", margin: "50px auto", width: "80%" }}>
        <h2 style={{ fontSize: "1.8em", fontWeight: "bold", color: "#333", marginBottom: "30px" }}>
          We partner with visionaries to drive global innovations
        </h2>

        <div style={{ display: "flex", overflow: "hidden", position: "relative" }}>
          <div
            style={{
              display: "flex",
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
              width: `${partners.length * 100}%`,
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 100%",
                  padding: "20px",
                  boxSizing: "border-box",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <img src={partner.logo} alt={partner.name} style={{ width: "100px", height: "50px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "10",
        }}>
          <button
            onClick={goToPrevSlide}
            style={{
              padding: "10px 15px",
              margin: "0 5px",
              border: "none",
              borderRadius: "50%",
              backgroundColor: "#333",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ◀
          </button>
          <button
            onClick={goToNextSlide}
            style={{
              padding: "10px 15px",
              margin: "0 5px",
              border: "none",
              borderRadius: "50%",
              backgroundColor: "#333",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        </div>
      </div>
        </main>
      </div>
    </div>
  );
};

export default VacationPage;
