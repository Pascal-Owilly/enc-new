import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import './Booking.css'; // Make sure to update this CSS file
import bg_1 from '../../assets/hero/cloud.jpg';

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
        setShowPaymentMethods(true);
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
<div
  className="container-fluid booking-container"
  // style={{ backgroundImage: `url(${bg_1})` }}
>
  <div className="overlay"></div>
  <div className="container py-">
    <div className="row justify-content-center">
      {/* Left Column: Booking Form */}
      <div className="col-md-6 ">
        <form
          className="booking-form p-4 shadow rounded"
          style={{ background: '#fff' }}
          onSubmit={handleBookingSubmit}
        >
          <h3>Booking for {placeName}</h3>
          <p className="place-price" style={{ color: 'gold', fontWeight: 'bold' }}>
            Price: ${price}
          </p>
          <div className="mb-3">
            <label htmlFor="checkin_date" className="form-label text-dark">
              Check-in Date:
            </label>
            <input
              type="date"
              id="checkin_date"
              className="form-control"
              name="checkin_date"
              value={bookingData.checkin_date}
              onChange={handleBookingChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="checkout_date" className="form-label text-dark">
              Check-out Date:
            </label>
            <input
              type="date"
              id="checkout_date"
              className="form-control"
              name="checkout_date"
              value={bookingData.checkout_date}
              onChange={handleBookingChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label text-dark">
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={bookingData.phone}
              onChange={handleBookingChange}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">
              Email Address:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={bookingData.email}
              onChange={handleBookingChange}
              placeholder="Email Address"
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Book Now
          </button>
        </form>
      </div>

      {/* Right Column: Booking Details */}
        {showPaymentMethods && (
          <div className="payment-methods">
            <h4 className="mb-3 text-white">Select Payment Method:</h4>
            <button
              className="btn btn-outline-primary d-flex align-items-center mb-2 w-100"
              onClick={() => handlePayment('paypal')}
            >
              <img
                src="/path/to/paypal-icon.png"
                alt="PayPal"
                className="me-2"
                style={{ width: '24px', height: '24px' }}
              />
              Pay with PayPal
            </button>
            <button
              className="btn btn-outline-success d-flex align-items-center w-100"
              onClick={() => handlePayment('mpesa')}
            >
              <img
                src="/path/to/mpesa-icon.png"
                alt="M-Pesa"
                className="me-2"
                style={{ width: '24px', height: '24px' }}
              />
              Pay with M-Pesa
            </button>
          </div>
        )}
      </div>
    </div>
  </div>


  );
};

export default Booking;