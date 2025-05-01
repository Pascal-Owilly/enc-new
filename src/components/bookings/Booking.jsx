import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Form, Modal } from 'react-bootstrap';
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
  const paymentMethodsRef = useRef(null);

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
  const [bookingId, setBookingId] = useState(null);
  const [showPaypalRedirect, setShowPaypalRedirect] = useState(false);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll to payment methods when they appear
  useEffect(() => {
    if (showPaymentMethods && paymentMethodsRef.current) {
      setTimeout(() => {
        paymentMethodsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [showPaymentMethods]);

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
      .then((response) => {
        setBookingId(response.data.id);
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

  const handlePaypalPayment = async () => {
    if (!bookingId) {
      setMessage("Booking ID not found. Please try again.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/api/auth/paypal/create/`,
        {
          booking_id: bookingId,
          amount: bookingData.price,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.data.approval_url) {
        setShowPaypalRedirect(true);
        setTimeout(() => {
          window.location.assign(response.data.approval_url);
        }, 2000);
      } else {
        const errorMsg = response.data.msg || "No approval URL received";
        setMessage(errorMsg);
        setMessageType("error");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                     error.response?.data?.msg || 
                     "Payment processing failed";
      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-10 m-4">
        <Card.Header className="bg-light p-3 text-center">
          <Card.Title className="text-md font-weight-bold">
            <span className="text-info font-italic">{bookingData.name}</span>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-success font-italic font-weight-bold">
            ${bookingData.price}
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
                    min={new Date().toISOString().split('T')[0]}
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
                    min={bookingData.checkin_date || new Date().toISOString().split('T')[0]}
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
                  pattern="[0-9]{10,15}"
                  title="Please enter a valid phone number (10-15 digits)"
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
            <div className="payment-options" ref={paymentMethodsRef}>
              <h4>Continue booking</h4>
              <p className="text-muted">Select your preferred payment method:</p>
              <br />
              
              {/* PayPal Button */}
              <div className="mb-4">
                <button 
                  onClick={handlePaypalPayment}
                  disabled={loading}
                  className="btn btn-warning w-100 py-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: '#FFC439',
                    borderColor: '#FFC439',
                    color: '#1A1A1A',
                    fontWeight: 'bold',
                    borderRadius: '4px'
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <img 
                        src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" 
                        alt="PayPal" 
                        style={{ height: '26px', marginRight: '10px' }}
                      />
                      Pay with PayPal
                    </>
                  )}
                </button>
              </div>
              
              {/* Pesapal Button */}
              <div className="mb-4">
                <h5>Pay with Pesapal</h5>
                {pesapalButtonHtml ? (
                  <div className="pesapal-button-wrapper mt-2" dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
                ) : (
                  <div className="text-center">
                    <div style={{ fontSize: '12px', marginBottom: '10px' }}>Loading payment options...</div>
                    <div className="dot-loader" >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="secondary" 
                onClick={() => setShowPaymentMethods(false)}
                className="mt-3"
              >
                Back to booking details
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* PayPal Redirect Modal */}
      <Modal show={showPaypalRedirect} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center p-4">
          <div className="mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h4 className="mb-3">Redirecting to PayPal</h4>
          <p className="text-muted">Please wait while we securely connect you to PayPal's payment system.</p>
          <p className="text-muted small">If you are not redirected automatically, please check your pop-up blocker.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingPage;