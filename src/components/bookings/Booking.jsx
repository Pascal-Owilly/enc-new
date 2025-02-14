import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../config/config";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect"); // Preserve redirect

  const placeId = searchParams.get("placeId");
  const placeName = searchParams.get("placeName");
  const placePrice = searchParams.get("price");
  const authToken = localStorage.getItem("authToken");

  const [bookingData, setBookingData] = useState({
    name: placeName || "",
    price: placePrice || "",
    checkin_date: "",
    checkout_date: "",
    phone: "",
    email: "",
    place: placeId,
  });

  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesapalButtonHtml, setPesapalButtonHtml] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authToken) {
      // Save current path and query params before redirecting
      navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
    }
  }, [authToken, navigate, location.pathname, location.search]);

  useEffect(() => {
    if (placeId) {
      axios
        .get(`${BASE_URL}/api/places/${placeId}/`)
        .then((response) => {
          setBookingData((prev) => ({
            ...prev,
            place: response.data.id,
            name: response.data.name,
            price: response.data.price,
          }));
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
          setMessage("Failed to fetch place details.");
          setMessageType("error");
        });
    }
  }, [placeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    axios
      .post(`${BASE_URL}/api/book-place/`, bookingData, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then(() => {
        setMessage("Booking successful! Proceed with payment.");
        setMessageType("success");
        setShowPaymentMethods(true);
        fetchPesapalButton();
      })
      .catch((error) => {
        console.error("Booking error:", error);
        const errorMsg =
          error.response?.data?.detail || "An error occurred while booking.";
        setMessage(errorMsg);
        setMessageType("error");
      })
      .finally(() => setLoading(false));
  };

  const fetchPesapalButton = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/pesapal/payment/`,
        {
          place_id: placeId,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.data.pesapal_button_html) {
        setPesapalButtonHtml(response.data.pesapal_button_html);
      } else {
        setMessage("Error processing payment. Try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Pesapal Payment Error:", error);
      setMessage("Failed to fetch payment options.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container booking-container">
      <div className="booking-form">
        <h3>Booking for {bookingData.name}</h3>
        <p className="price">Price: KES {bookingData.price}</p>

        <form onSubmit={handleBookingSubmit}>
          <label>Check-in Date:</label>
          <input
            type="date"
            name="checkin_date"
            value={bookingData.checkin_date}
            onChange={handleInputChange}
            required
          />

          <label>Check-out Date:</label>
          <input
            type="date"
            name="checkout_date"
            value={bookingData.checkout_date}
            onChange={handleInputChange}
            required
          />

          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={bookingData.phone}
            onChange={handleInputChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Book Now"}
          </button>
        </form>

        {showPaymentMethods && (
          <div className="payment-options">
            <h4>Select Payment Method</h4>
            {message && <div className={`message ${messageType}`}>{message}</div>}

            {pesapalButtonHtml ? (
              <div className="pesapal-button-wrapper">
                <div dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
              </div>
            ) : (
              <div className="dot-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
