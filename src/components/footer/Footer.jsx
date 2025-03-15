import './Footer.css';
import Contact from '../contact/Contact.jsx';
import { useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../config/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/subscriptions/`, { email });
      if (response.status === 201) {
        setMessage('Subscription successful!');
        setEmail('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data?.email?.[0] === 'subscription with this email already exists.') {
          setMessage('This email is already subscribed.');
        } else {
          setMessage('Subscription failed. Please try again.');
        }
      } else {
        setMessage('Network error. Please try again later.');
      }
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="container-fluid p-5" style={{ backgroundColor: '#ddd', color: '#333' }}>
      <footer className="rounded-4 ">
        <div className="row align-items-center text-center ">
          {/* Quick Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="fw-bold text-uppercase mb-4" style={{ color: '#000' }}>Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-decoration-none" style={{ color: '#333' }}>
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/faqs" className="text-decoration-none" style={{ color: '#333' }}>
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="/blogs" className="text-decoration-none" style={{ color: '#333' }}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Email Subscription */}
          <div className="col-md-4 mb-4 mb-md-0">
            {message && <p style={{ marginTop: '10px', color: '#000' }}>{message}</p>}

            <h4 className="fw-bold text-uppercase mb-4" style={{ color: '#000' }}>Stay Updated</h4>
            <form className="input-group" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '30px 0 0 30px', border: 'none', padding: '12px' }}
              />
              <button
                type="submit"
                className="btn fw-bold"
                style={{ borderRadius: '0 30px 30px 0', backgroundColor: '#000', color: '#ddd' }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4">
            <h4 className="fw-bold text-uppercase mb-4" style={{ color: '#000' }}>Contact Us</h4>
            <a
              href="/contact"
              className="btn fw-bold"
              style={{ borderRadius: '30px', backgroundColor: '#000', color: '#ddd' }}
            >
              Go to Contact
            </a>

            <div className="mt-4">
              {['Privacy', 'Policy'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-decoration-none mx-2"
                  style={{ color: '#333' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center">&copy; Enceptics {`2023 - ${currentYear}`}</p>
      </footer>
    </div>
  );
}
