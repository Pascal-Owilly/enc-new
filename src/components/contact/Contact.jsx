import React, { useState } from 'react';
import './Contact.css';
import { BASE_URL } from '../config/config';

export default function Contact() {
  // State variables to hold form input data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Toggle form visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create the data object to send in the POST request
    const contactData = {
      name,
      email,
      message,
    };

    try {
      // Use BASE_URL for API request
      const response = await fetch(`${BASE_URL}/api/auth/contact-us/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      // Check if the request was successful
      const result = await response.json();

      if (response.ok) {
        setResponseMessage('Message sent successfully! We will get back to you ASAP.');
        setIsFormSubmitted(true); // Hide form
      } else {
        // Display error message from API response
        setResponseMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('An error occurred. Please check your connection and try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="contact-container" style={{minHeight:'80vh'}}>
      <h1 className="contact-title">Contact Us</h1>

      {isFormSubmitted ? (
        // Show success message after form submission
        <p className="success-message">{responseMessage}</p>
      ) : (
        <>
          <p className="contact-description">
            If you have any questions, feel free to reach out to us. We’d love to hear from you!
          </p>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
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

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}
