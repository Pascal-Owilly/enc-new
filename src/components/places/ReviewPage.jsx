import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewPage.css';  // Add CSS for styling

const ReviewPage = () => {
  const { id } = useParams(); // Get the adventure ID from the URL
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Fetch reviews for the specific adventure
    axios.get(`/api/adventures/${id}/reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Send the new review for the adventure
    axios.post(`/api/adventures/${id}/reviews`, { review: newReview })
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview('');
      })
      .catch(error => {
        console.error('Error posting review:', error);
      });
  };

  return (
    <div className="review-page">
      <h2>Reviews for Adventure #{id}</h2>

      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
