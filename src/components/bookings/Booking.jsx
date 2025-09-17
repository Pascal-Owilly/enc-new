import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { BASE_URL } from '../config/config';
import { Calendar } from "lucide-react";
import './Booking.css';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const placeId = searchParams.get("placeId");
    const placeName = searchParams.get("placeName");
    const placePrice = searchParams.get("price");
    const authToken = localStorage.getItem("authToken");
    const paymentMethodsRef = useRef(null);
    const [cardsRemaining, setCardsRemaining] = useState(0); 

    const [bookingData, setBookingData] = useState({
        name: placeName || "",
        price: placePrice || "",
        checkin_date: "",
        checkout_date: "",
        phone: "",
        email: "",
        place: placeId,
        participants: 1, // Default to 1 participant
        size: 1, // Default size

    });

    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pesapalButtonHtml, setPesapalButtonHtml] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [bookingId, setBookingId] = useState(null);
    const [showPaypalRedirect, setShowPaypalRedirect] = useState(false);
    const [remainingSlots, setRemainingSlots] = useState(0); 
    const [showPostBookingOptions, setShowPostBookingOptions] = useState(false); // New state to control post-booking view
    const totalAmount = (bookingData.participants || 1) * bookingData.price;
    // const imageUrl = bookingData?.cover_image ? `${BASE_URL}${bookingData.cover_image}` : null;
    const imageUrl = bookingData?.cover_image || null;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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
                    console.log("API response data:", response.data); // Log the data here

                    setBookingData((prev) => ({
                        ...prev,
                        place: response.data.id,
                        name: response.data.name,
                        price: response.data.price,
                        size: response.data.size,
                        cover_image: response.data.cover_image, 

                    }));
                })
                .catch(() => {
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

        axios.post(`${BASE_URL}/api/book-place/`, {
            ...bookingData,
            participants: bookingData.participants,
        }, {
            headers: { Authorization: `Token ${authToken}` },
        })
            .then((response) => {
                setBookingId(response.data.id);
                setMessage("Booking successful! Proceed with payment.");
                setMessageType("success");

                const slots = bookingData.size - bookingData.participants;
                setRemainingSlots(slots);
                
                // Show the post-booking options instead of going straight to payment
                setShowPostBookingOptions(true);
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.detail || "An error occurred while booking.";
                setMessage(errorMsg);
                setMessageType("error");
            })
            .finally(() => setLoading(false));
    };

    const handleInviteClick = () => {
        navigate('/trip-mate', { state: { bookingId, remainingSlots } });
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
                    amount: totalAmount,
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
        <div className="booking-page-container">
            <Card className="booking-card">
                <Card.Header className="image-header">
                    {imageUrl && (
                        <img src={imageUrl} className="cover-image" />
                    )}
                    <div className="overlay-text">
                        <h2 className="place-title">{bookingData.name}</h2>
                        <p className="place-price">KES {bookingData.price}</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    {/* Conditional rendering for the post-booking view or the initial form */}
                    {showPostBookingOptions && !showPaymentMethods ? (
                        <div>
                    <div className="info-message">
                      <strong>Success!</strong> Your booking has been confirmed. 
                      {remainingSlots > 0 && ` ${remainingSlots} slot(s) are still available for other trip mates.`}
                    </div>

                            {remainingSlots > 0 && (
                                <Button onClick={handleInviteClick} className="booking-page-button invite-button mt-3 mx-2">
                                    Invite a Tripmate
                                </Button>
                            )}
                            <Button onClick={() => {
                                setShowPaymentMethods(true);
                                fetchPesapalButton();
                            }} className="booking-page-button proceed-payment mt-3 mx-1">
                                Proceed to Payment
                            </Button>
                        </div>
                    ) : showPaymentMethods ? (
                        <div className="payment-options" ref={paymentMethodsRef}>
                            <h4>Continue booking</h4>
                            <p className="text-muted">Select your preferred payment method:</p>
                            <br />

                            {/* PayPal Button */}
                            <div className="mb-4">
                                <button
                                    onClick={handlePaypalPayment}
                                    disabled={loading}
                                    className="payment-button paypal-btn"
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
                                                className="paypal-logo"
                                            />
                                            Pay with PayPal
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Pesapal Button */}
                            <div className="pesapal-wrapper">
                                <h5>Pay with Pesapal</h5>
                                {pesapalButtonHtml ? (
                                    <div className="pesapal-button-wrapper mt-2" dangerouslySetInnerHTML={{ __html: pesapalButtonHtml }} />
                                ) : (
                                    <div className="text-center">
                                        <div style={{ fontSize: '12px', marginBottom: '10px' }}>Loading payment options...</div>
                                        <div className="dot-loader">
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
                                className="booking-page-button back-button mt-3"
                            >
                                Back to booking details
                            </Button>
                        </div>
                    ) : (
                        <Form onSubmit={handleBookingSubmit} className="booking-form">
                            <Form.Group controlId="participants">
                                <Form.Label>Number of Participants</Form.Label>
                                <Form.Control
    type="number"
    name="participants"
    min="1"
    max={bookingData.size || 10}
    value={bookingData.participants}
    onChange={handleInputChange}
    onFocus={(e) => e.target.select()}
    required
/>
                                {bookingData.size && (
                                    <Form.Text className="text-muted">
                                        Maximum allowed for this adventure: {bookingData.size} people
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group controlId="checkin_date">
                                <Form.Label>Check-in Date</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Calendar aria-hidden="true" />
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
                                        <Calendar aria-hidden="true" />
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
                            <div className="info-message">
                                <strong>Total:</strong> KES {totalAmount}
                            </div>
                            <br />
                            <Button type="submit" className="booking-page-button book-now" disabled={loading}>
                                {loading ? "Processing..." : "Book Now"}
                            </Button>
                            {message && (
                                <div className={`${messageType === "success" ? "success-message" : "error-message"}`}>
                                    {message}
                                </div>
                            )}
                        </Form>
                    )}
                </Card.Body>
            </Card>

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
        </div>
    );
};

export default BookingPage;