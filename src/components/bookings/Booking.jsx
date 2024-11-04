import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './Booking.css'; // Import the CSS file for styles

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const placeName = searchParams.get("placeName");
  const price = parseFloat(searchParams.get("price")) || 0;
  const placeId = searchParams.get("placeId");

  const [placeData, setPlaceData] = useState({});
  const [bookingData, setBookingData] = useState({
    checkin_date: '',
    checkout_date: '',
    phone: '',
    email: '',
    is_paid: false,
    user: null,
    place: null,
  });

  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  useEffect(() => {
    if (placeId) {
      axios.get(`${BASE_URL}book-place/${placeId}`)
        .then(placeResponse => {
          setPlaceData(placeResponse.data);
          setBookingData(prev => ({
            ...prev,
            place: placeResponse.data.id,
            checkin_date: placeResponse.data.checkin_date || '',
            checkout_date: placeResponse.data.checkout_date || '',
            phone: placeResponse.data.phone || '',
            email: placeResponse.data.email || '',
          }));
        })
        .catch(error => console.error('Error fetching place data:', error));
    }
  }, [navigate, placeId]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const orderPlace = { ...bookingData, place: placeId };

    axios.post(`${BASE_URL}/api/book-place/`, orderPlace)
      .then(() => {
        console.log(`Booking successful for ${bookingData.email} to ${placeName} at ${price}`);
        setShowPaymentMethods(true); // Show payment methods after booking
      })
      .catch(error => console.error('Booking error:', error));
  };

  const handlePayment = async (method) => {
    const paymentData = { id: placeId };
    const endpoint = `${BASE_URL}/api/auth/${method}/create/`;

    try {
      const response = await axios.post(endpoint, paymentData, { timeout: 30000 });
      const approvalUrl = response.data.approved_url;
      if (approvalUrl) window.location.href = approvalUrl;
    } catch (error) {
      console.error(`${method} Payment Error:`, error);
    }
  };

  return (
    <div className="bookng-contaner">
    <div className="booking-container ">
      <h3>Booking for {placeName}</h3>
      <form className="booking-form" onSubmit={handleBookingSubmit}>
          <input
          type="date"
          style={{ border: 'none', backgroundColor: 'rgb(238, 240, 251)', color: '#999999' }}
          className="form-control"
          name="checkin_date"
          value={bookingData.checkin_date}
          onChange={handleBookingChange}
          required
        />
        <input
          style={{ border: 'none', backgroundColor: 'rgb(238, 240, 251)', color: '#999999' }}
          type="date"
          className="form-control"
          name="checkout_date"
          value={bookingData.checkout_date}
          onChange={handleBookingChange}
          required
        />
        <input
          className="booking-input"
          name="phone"
          value={bookingData.phone}
          onChange={handleBookingChange}
          placeholder="Phone Number"
          required
        />
        <input
          className="booking-input"
          name="email"
          value={bookingData.email}
          onChange={handleBookingChange}
          placeholder="Email Address"
          required
        />
        <button className="booking-button" type="submit">Book Now</button>
      </form>

      {showPaymentMethods && (
        <div className="payment-methods">
          <h2>Select Payment Method:</h2>
          <button className="payment-button" onClick={() => handlePayment('paypal')}>
            <img src="/path/to/paypal-icon.png" alt="PayPal" className="payment-icon" />
            Pay with PayPal
          </button>
          <button className="payment-button" onClick={() => handlePayment('mpesa')}>
            <img src="/path/to/mpesa-icon.png" alt="M-Pesa" className="payment-icon" />
            Pay with M-Pesa
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Booking;
