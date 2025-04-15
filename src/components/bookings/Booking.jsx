import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { BASE_URL } from '../config/config';
import { Calendar } from "lucide-react";

const BookingPage = () => {
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

  useEffect(() => {
    if (!authToken) {
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
      setMessage("Failed to fetch payment options.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10 m-4">
      <Card.Header className="bg-light p-3 text-center">
        <Card.Title className="text-md font-weight-bold">
          <span className="text-info font-italic">{bookingData.name}</span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-success font-italic font-weight-bold">
          Kes {bookingData.price}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {!showPaymentMethods ? (
          <Form onSubmit={handleBookingSubmit}>
            <Form.Group controlId="checkin_date">
              <Form.Label>Check-in Date</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                <Form.Control
                  type="date"
                  name="checkin_date"
                  value={bookingData.checkin_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group controlId="checkout_date">
              <Form.Label>Check-out Date</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                <Form.Control
                  type="date"
                  name="checkout_date"
                  value={bookingData.checkout_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <br />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Book Now"}
            </Button>
            {message && (
              <div className={`mt-3 alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
                {message}
              </div>
            )}
          </Form>
        ) : (
          <div className="payment-options">
            <h4>Continue booking</h4>
            <br />
            {pesapalButtonHtml ? (
              <div className="pesapal-button-wrapper" dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
            ) : (
              <div className="text-center">
                <div style={{ fontSize: '12px', marginBottom: '10px' }}>Loading payment options...</div>
                <div className="dot-loader" style={{height:'auto !important'}}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingPage;