import React, { useState } from 'react';
import './Contact.css';
import { BASE_URL } from '../config/config';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const contactData = { name, email, message };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/contact-us/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage('Message sent successfully! We will get back to you ASAP.');
        setIsFormSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setResponseMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('An error occurred. Please check your connection and try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="contact-container" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #74ebd5, #acb6e5)' }}>
      <h5 className="contact-title">Contact Us</h5>

      {isFormSubmitted ? (
        <p className="success-message">{responseMessage}</p>
      ) : (
        <>
          <p className="contact-description">
            If you have any questions, feel free to reach out to us. We’d love to hear from you!
          </p>
          <div className="contact-info">
            <p>Email: enceptics.vacay@gmail.com</p>
            <p>Phone: +254712154794</p>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={name}
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  value={message}
                  rows="5"
                  placeholder="Your Message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-btn" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}