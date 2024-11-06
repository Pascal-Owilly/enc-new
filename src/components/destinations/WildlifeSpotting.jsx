import React, { useState } from 'react';
import './HistoricalTours.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { faPaw, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const cardData = Array.from({ length: 18 }, (_, index) => ({
  title: `Tree ${index + 1}`,
  description: "Trees are woody perennial plants in the kingdom Plantae.",
  imgSrc: "https://assets.codepen.io/4787486/oak_1.jpg",
  shortDescription: "Experience the beauty and history of ancient trees. Book your tour now to explore nature's wonders!",
  book: "Book Now!",
  rating: 4.7,


}));

const TreeInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cardData.slice(firstCardIndex, lastCardIndex);

  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    // Function to render stars based on rating
    const renderStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating - fullStars >= 0.5;
  
      return (
        <>
          {Array.from({ length: fullStars }, (_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="star" />
          ))}
          {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="star text-light" />}
        </>
      );
    };
  

  return (
    <div className="container">
      <div className="jumbotron">
      <h2 className="text-center all-headings text-dark my-4"><FontAwesomeIcon icon={faPaw} /> Wildlife Spotting</h2>
      <p className="text-dark" style={{ color: "#5e5e5e", fontSize: "1.2rem", marginBottom: "1rem" }}>
  Step into the heart of nature and experience the thrill of witnessing wildlife up close while discovering the stories of ancient ecosystems. Our tours not only offer adventure, but also a chance to contribute to the preservation of our planet’s most precious habitats.
</p>


        <div className="card-grid">
          {currentCards.map((card, index) => (
            <div key={index} className="wrap animate pop">
              <div className="overlay">
                <div className="overlay-content animate slide-left delay-2">
                  <h1 className="card-title animate slide-left pop delay-4">{card.title}</h1>
                  <p className="animate slide-left pop delay-5" style={{ marginBottom: '2.5rem' }}>
                    Kingdom: <em>Plantae</em>
                  </p>
                  <p className="card-short-description animate slide-left pop delay-5">
                    {card.shortDescription}
                  </p>
                  <button className="book-button">Book Now</button>
                </div>
                <div className="image-content animate slide delay-5"></div>
                <div className="dots animate">
                  
                  <Badge bg="white"  className="text-success">{card.rating}</Badge>
                  <div className="rating animate">
                  {renderStars(card.rating)}
                  <span className="rating-text"> {card.rating.toFixed(1)}</span>
                </div>
                </div>
              </div>
              <div className="text">
                <img className="inset" src={card.imgSrc} alt={card.title} />
                <p>{card.description}</p>
                <button  className='btn btn-sm' style={{background:'#d9d9d9', color:'#333'}}>{card.book}</button>

              </div>
            </div>
          ))}
        </div>

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

export default TreeInfo;
