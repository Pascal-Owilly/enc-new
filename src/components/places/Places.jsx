import React, { useEffect, useState } from 'react';
import './Places.css';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'; // Import an additional icon
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel, Card } from 'react-responsive-carousel';
import { BASE_URL } from '../config/config';
import { Link } from 'react-router-dom';

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${BASE_URL}places/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  if (places.length === 0) {
    // No places found case
    return (
      <div className="no-places-found ">
        <FaMapMarkerAlt size={60} className="no-places-icon" />
        <p className="no-places-text">No places found. Start your adventure by adding new destinations!</p>
      </div>
    );
  }

  const chunks = chunkArray(places, 4);

  return (
    <div className="container-fluid  ">
     <h1
     className="fade-in text-center page-title mt-5 all-headings">Begin Your Adventure In Style</h1>
      <Carousel 
        showArrows={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false}
        autoPlay={true}
        interval={5000}
      >
        {chunks.map((chunk, index) => (
          <div className="carousel-slide" key={index}>
            {chunk.map((place, subIndex) => (
              <div className="card value-card" key={subIndex}>
                <img src={place.cover_image} alt={place.name} className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">{place.name}</h2>
                  <p className="card-text">{place.description}</p>
                  <div className="see-more-icon">
                    <Link to={`/place/${place.id}`} className="see-more-link">
                      See More <FaArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="price-button-wrapper">
                    <p className="card-text destination-price"><strong>{place.price ? `Ksh${place.price}` : 'N/A'}</strong></p>
                    <button className="btn btn-book-now">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      </Carousel>
      <Link to="/all-places" className="see-all-button">See All <FaArrowRight size={18} /></Link>
    </div>
  );
};

export default Places;
