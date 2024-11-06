import React, { useState } from 'react';
import './HistoricalTours.css';

const cardData = Array.from({ length: 18 }, (_, index) => ({
  title: `Tree ${index + 1}`,
  description: "Trees are woody perennial plants in the kingdom Plantae.",
  imgSrc: "https://assets.codepen.io/4787486/oak_1.jpg",
  shortDescription: "Experience the beauty and history of ancient trees. Book your tour now to explore nature's wonders!",
  book: "Book Now!",

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

  return (
    <div className="container">
      <div className="jumbotron">
        <h2 className="all-headings text-dark">Historical Tours</h2>
        <p className="text-dark" style={{ color: "#5e5e5e", fontSize: "1.2rem", marginBottom: "1rem" }}>
      Discover the hidden stories and legends of ancient sites. Our historical tours take you through landmarks and tales that shaped the world, providing a journey through time and culture.
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
                  <div className="dot animate slide-up delay-6"></div>
                  <div className="dot animate slide-up delay-7"></div>
                  <div className="dot animate slide-up delay-8"></div>
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
