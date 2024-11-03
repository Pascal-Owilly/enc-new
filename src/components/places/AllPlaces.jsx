import React, { useEffect, useState } from 'react';
import './AllPlaces.css';
import { FaArrowRight, FaFrown } from 'react-icons/fa'; // Added FaFrown icon
import { BASE_URL } from '../config/config';
import { Link } from 'react-router-dom';
import { Container, Card } from "react-bootstrap";
const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 8;

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

  const filteredPlaces = places
    .filter((place) => 
      place.name.toLowerCase().includes(filter.toLowerCase()) && 
      (!ratingFilter || place.rating >= ratingFilter) &&
      place.price >= priceRange[0] && place.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') return a.price - b.price;
      if (sortOption === 'priceHighToLow') return b.price - a.price;
      if (sortOption === 'popular') return b.popularity - a.popularity;
      if (sortOption === 'visited') return b.visits - a.visits;
      if (sortOption === 'new') return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = filteredPlaces.slice(indexOfFirstPlace, indexOfLastPlace);

  const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  if (!loading && filteredPlaces.length === 0) {
    return (
      <div className="no-places-found text-center">
        <FaFrown size={50} color="#ccc" />
        <p>No places found. Please try a different search or filter.</p>
        <a href="/all-places">Back</a>
      </div>
    );
  }

  return (
    <div className="all-places-container">
      <h1 className="fade-in text-center page-title mt-5">Explore All Amazing Destinations</h1>

      <div className="filter-sort-section">
        <div className="filter-options">
          <input
            type="text"
            placeholder="Search by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="">Filter by Rating</option>
            <option value="4">4 stars & above</option>
            <option value="3">3 stars & above</option>
          </select>
          <select onChange={(e) => setPriceRange(JSON.parse(e.target.value))}>
            <option value="">Price Range</option>
            <option value="[0, 5000]">Under Ksh5000</option>
            <option value="[5000, 10000]">Ksh5000 - Ksh10000</option>
            <option value="[10000, 20000]">Ksh10000 - Ksh20000</option>
          </select>
        </div>

        <div className="sort-options">
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="popular">Most Popular</option>
            <option value="visited">Most Visited</option>
            <option value="new">New</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="places-grid">
        {currentPlaces.map((place, index) => (
          <div className="place-card" key={index}>
            <img src={place.cover_image} alt={place.name} className="place-image" />
            <div className="place-details">
              <h2>{place.name}</h2>
              <p>{place.description}</p>
             
              <div className="price-button-wrapper">
                    <p className="card-text destination-price"><strong>{place.price ? `Ksh${place.price}` : 'N/A'}</strong></p>
                    <button className="btn btn-sm btn-book-now">Book Now</button>
                  </div>
            </div>
          </div>
        ))}
      </div>

      {currentPlaces.map((place, index) => (


      <Card className="what-card-place" style={{ position: 'relative', backgroundColor: '#fff', width: '100%', height: '400px', overflow: 'hidden', color: '#333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border:'none', outline:'none' }}>
  <Card.Img
    src={place.cover_image}
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    }}
  />
  <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <div style={{ position: 'absolute', top: 20, left: 20, padding: '10px' }}>
      <h5 style={{ margin: 0, font: '40 Philosopher', color: '#fff' }}>{place.name}</h5>
    </div>
    {/* Price Container */}
    <div style={{ position: 'absolute', top: 20, right: 20, backgroundColor: '#fa9b30', color: '#fff', padding: '5px', borderRadius: ' 30px 0 0 30px ', right: 0 }}>
      <span style={{  font:'14px ', letterSpacing:'1px' }}>Ksh {place.price}</span>
    </div>
    {/* End Price Container */}
    <div style={{ position: 'absolute', bottom: 0, padding: '20px', width: '100%', color: '#fff' }}>
      <p style={{ marginTop: '10px' }}>{place.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button className="btn btn-sm bg-white" style={{borderRadius:'30px', right: 0, color:'#999999'}} onClick={() => handleSeeDescriptionClick(destination)}>
          See Description
        </button>
      </div>
      
    </div>
  </div>
</Card>
 ))}

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllPlaces;
