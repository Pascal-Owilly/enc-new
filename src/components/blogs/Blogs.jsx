import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Blogs.css';

const VacationPage = () => {
  // Titles and descriptions for the cards based on the previous navigation items
  const cards = [
    {
      name: 'Micro-Adventure',
      description: 'Embark on small adventures that bring big experiences.',
      price: '$150',
    },
    {
      name: 'Explore',
      description: 'Discover new places and expand your horizons.',
      price: '$200',
    },
    {
      name: 'Group Booking',
      description: 'Organize trips for large groups at discounted rates.',
      price: '$500',
    },
    {
      name: 'About',
      description: 'Learn more about the adventure travel company and our mission.',
      price: 'Free',
    },
    {
      name: 'Culinary Tours',
      description: 'Taste the local flavors and enjoy cooking classes.',
      price: '$300',
    },
    {
      name: 'Farmers\' Markets',
      description: 'Experience the best of local produce and artisan products.',
      price: '$50',
    },
    {
      name: 'Nature Hikes',
      description: 'Explore breathtaking nature trails and serene landscapes.',
      price: '$120',
    },
    {
      name: 'Art Workshops',
      description: 'Get creative with hands-on art sessions and local artists.',
      price: '$200',
    },
    {
      name: 'Cultural Festivals',
      description: 'Dive into the rich culture through vibrant festivals.',
      price: '$180',
    },
    {
      name: 'Historical Tours',
      description: 'Discover the history and landmarks of the area.',
      price: '$250',
    },
  ];

  useEffect(() => {
    // Animating cards moving horizontally
    gsap.to('.cards-container', {
      x: '-50%',
      duration: 20,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  return (
    <div className="container-fluid">
      <header>
        <h1 className="welcome-text">Discover Your Next Adventure</h1>
      </header>
      <main>
        <section className="destination-showcase">
          {/* <h2>Featured Destinations</h2> */}
          <div className="cards-container">
            {cards.map((card, index) => (
              <div className="card" key={index}>
                <div className="image-placeholder">Image</div>
                <h3>{card.name}</h3>
                <p>{card.description}</p>
                <span className="price">{card.price}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default VacationPage;
