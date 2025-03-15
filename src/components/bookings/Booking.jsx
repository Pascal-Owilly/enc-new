import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../config/config";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
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
      navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
    }
  }, [authToken, navigate, location.pathname, location.search]);

  // Fetch place data
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
        scrollToTop();  // Scroll to top on successful booking
      })
      .catch((error) => {
        console.error("Booking error:", error);
        const errorMsg = error.response?.data?.detail || "An error occurred while booking.";
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
        { place_id: placeId },
        { headers: { Authorization: `Token ${authToken}` } }
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container-fluid booking-container">
      <div
        className="booking-form"
        style={{
          maxWidth: "400px",
          margin: "15px auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h3 className="text-dark">Booking for {bookingData.name}</h3>
        <p className="price text-success">Kes {bookingData.price}</p>

        {!showPaymentMethods ? (
          <form onSubmit={handleBookingSubmit}>
            <input
              type="date"
              name="checkin_date"
              value={bookingData.checkin_date}
              onChange={handleInputChange}
              required
              placeholder="Check-in Date"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="date"
              name="checkout_date"
              value={bookingData.checkout_date}
              onChange={handleInputChange}
              required
              placeholder="Check-out Date"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="tel"
              name="phone"
              value={bookingData.phone}
              onChange={handleInputChange}
              required
              placeholder="Phone Number"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleInputChange}
              required
              placeholder="Email Address"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {loading ? "Processing..." : "Book Now"}
            </button>
          </form>
        ) : (
          <div className="payment-options">
            <h4>Select Payment Method</h4>
            {message && <div className={`message ${messageType}`}>{message}</div>}
            {pesapalButtonHtml ? (
              <div className="pesapal-button-wrapper" dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
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
