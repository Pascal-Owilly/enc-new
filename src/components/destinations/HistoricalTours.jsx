import React, { useState, useEffect } from 'react';
import './HistoricalTours.css';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';
import cloudImage from '../../assets/hero/cloud.webp';

const HistoricalTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = "historical_tours";

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical tours');
        }
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error('Error fetching historical tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  const lastTourIndex = currentPage * toursPerPage;
  const firstTourIndex = lastTourIndex - toursPerPage;
  const currentTours = tours.slice(firstTourIndex, lastTourIndex);

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="container">
      <div className="jumbotron">
        <h2 className="all-headings text-dark">Historical Tours</h2>
        <p className="text-dark" style={{ color: "#5e5e5e", fontSize: "1.2rem", marginBottom: "1rem" }}>
          Discover the hidden stories and legends of ancient sites. Our historical tours take you through landmarks and tales that shaped the world, providing a journey through time and culture.
        </p>

        {loading ? (
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : tours.length > 0 ? (
          <div className="card-grid">
            {currentTours.map((tour, index) => (
             <div key={index} className="wrap animate pop">
             <div 
               className="overlay" 
               style={{ 
                 backgroundImage: `url(${BASE_URL}${tour.cover_image})`,
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center', 
                 height: '100%' 
               }}
             >
               <div className="overlay-content animate slide-left delay-4">
                 <h5 className="card-title animate slide-left" style={{ fontWeight: 'bold', color: '#fff' }}>
                   {tour.name}
                 </h5>
                 <p 
                   className="tour-location animate slide-left" 
                   style={{ fontWeight: 'bold', color: '#fff', display: 'inline-block', marginRight: '10px' }}
                 >
                   {tour.location || 'Location not available'}
                 </p>
                 <p 
                   className="tour-rating animate slide-left" 
                   style={{ fontWeight: 'bold', color: '#fff', display: 'inline-block' }}
                 >
                   Rating: {tour.average_rating || 'No rating available'} ({tour.total_reviews} Visitors)
                 </p>
               </div>
             </div>
           
             <div className="text">
               <h5 className="card-title animate slide-left">{tour.name}</h5>
               <img className="inset" src={`${BASE_URL}${tour.pictures}`} alt={tour.name} />
               <p>{tour.description || 'No description available.'}</p>
               <p>
                 <BookingButton place={tour} />
               </p>
             </div>
           </div>
           
            
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">
            <h4>No Historical Tours Available</h4>
            <p>Currently, there are no historical tours to display. Please check back later.</p>
          </div>
        )}

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTours;
