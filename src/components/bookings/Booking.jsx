import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const placeId = searchParams.get("placeId");
  const authToken = localStorage.getItem("authToken");

  const [bookingData, setBookingData] = useState({
    name: '',
    price: '',
    checkin_date: '',
    checkout_date: '',
    phone: '',
    email: '',
    place: placeId,
  });
  

  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesapalButtonHtml, setPesapalButtonHtml] = useState('');

  useEffect(() => {
    if (placeId) {
      axios.get(`${BASE_URL}/api/places/${placeId}/`)
        .then(response => {
          setBookingData(prev => ({
            ...prev,
            place: response.data.id,
            name: response.data.name,  
            price: response.data.price 
          }));
        })
        .catch(error => console.error('Error fetching place data:', error));
    }
  }, [placeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Remove `user_id` from bookingData since the backend gets it from the token
    const bookingPayload = { ...bookingData };
    delete bookingPayload.user_id; 
  
    axios.post(`${BASE_URL}/api/book-place/`, bookingPayload, {
      headers: {
        Authorization: `Token ${authToken}`
      }
    })
      .then(() => {
        console.log(`Booking successful for ${bookingData.email}`);
        setShowPaymentMethods(true);
        fetchPesapalButton();
      })
      .catch(error => console.error('Booking error:', error))
      .finally(() => setLoading(false));
  };
  
  const fetchPesapalButton = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/pesapal/payment/`, {
        place_id: placeId, // Only send place_id, backend extracts user from token
      }, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      });
  
      if (response.data.pesapal_button_html) {
        setPesapalButtonHtml(response.data.pesapal_button_html);
      } else {
        alert("Error processing payment. Try again.");
      }
    } catch (error) {
      console.error('Pesapal Payment Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container booking-container">
      <div className="booking-form">
        <h3>Booking for {bookingData.name}</h3>
        <p className="price">Price: ${bookingData.price}</p>
        
        <form onSubmit={handleBookingSubmit}>
          <label>Check-in Date:</label>
          <input type="date" name="checkin_date" value={bookingData.checkin_date} onChange={handleInputChange} required />

          <label>Check-out Date:</label>
          <input type="date" name="checkout_date" value={bookingData.checkout_date} onChange={handleInputChange} required />

          <label>Phone:</label>
          <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Book Now"}
          </button>
        </form>

        {showPaymentMethods && (
          <div className="payment-options">
            <h4>Select Payment Method</h4>
            {pesapalButtonHtml ? (
              <div dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
            ) : (
              <p>Loading Pesapal...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
