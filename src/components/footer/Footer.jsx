import './Footer.css';
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
    <div
      className="container-fluid py-5 text-white"
      style={{
        background: 'linear-gradient(135deg, #001f3f, #004d66, #00a896)',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
      }}
    >
      <footer className="text-center text-md-start">
        <div className="row justify-content-around align-items-start px-3 px-md-5">

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4">
            <h3 className="fw-bold text-uppercase mb-3 text-white" style={{fontSize:'20px'}}>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-decoration-none text-light">About Us</a></li>
              <li><a href="/faqs" className="text-decoration-none text-light">FAQs</a></li>
              <li><a href="/blogs" className="text-decoration-none text-light">Blog</a></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="col-12 col-md-4 mb-4">
            <h3 className="fw-bold text-uppercase mb-3 text-white" style={{fontSize:'20px'}}>Stay Updated</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row">
              <input
                type="email"
                className="form-control me-sm-2 mb-2 mb-sm-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: '#f4f4f4',
                  color: '#000',
                  padding: '10px 15px',
                }}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#FFD700',
                  color: '#003B46',
                  fontWeight: '600',
                  borderRadius: '30px',
                  padding: '10px 20px',
                }}
              >
                Subscribe
              </button>
            </form>
            {message && <p className="mt-2 text-white small">{message}</p>}
          </div>

          {/* Contact Us */}
          <div className="col-12 col-md-3 mb-4">
            <h3 className="fw-bold text-uppercase mb-3 text-white" style={{fontSize:'20px'}}>Contact Us</h3>
            <a
              href="/contact"
              className="btn btn-sm"
              style={{
                backgroundColor: '#FFD700',
                color: '#003B46',
                fontWeight: '600',
                borderRadius: '25px',
                padding: '10px 20px',
              }}
            >
              Go to Contact
            </a>

            {/*<div className="mt-3">
              <a href="#" className="text-light text-decoration-none me-3">Privacy</a>
              <a href="#" className="text-light text-decoration-none">Policy</a>
            </div>*/}
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top border-light text-light small">
          &copy; Enceptics 2023 - {currentYear}. All rights reserved.
          
        </div>
      </footer>
    </div>
  );
}
