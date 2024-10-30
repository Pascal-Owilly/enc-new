import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  // State variables to hold form input data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create the data object to send in the POST request
    const contactData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      // Send POST request using the Fetch API
      const response = await fetch('https://testmanagement.pythonanywhere.com/api/blog/contact-us/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        setResponseMessage('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setResponseMessage('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
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
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}
