import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Vr.css';
import { BASE_URL } from '../config/config';
import BookingButton from '../bookings/BookingButton';

function VRPageTwo() {
  const [vr, setVr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = "virtual_reality";

  useEffect(() => {
    const fetchVrData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
        const data = await response.json();
        setVr(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    fetchVrData();
  }, []);

  return (
    <div className="page-two modern-look">
      <div className="text-center my-4">
        <h5 className="vr-heading">Step into the Future: The Joy of Virtual Reality</h5>
        <p className="vr-intro m-auto" style={{ maxWidth: '800px' }}>
          Experience a world beyond imagination, where adventure, creativity, and limitless possibilities come to life.
        </p>
      </div>

      {loading ? (
        <div className="dot-loader"><span></span><span></span><span></span></div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : vr.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No VRs Available</h4>
          <p>Currently, there are no Virtual Reality events to display. Please check back later.</p>
        </div>
      ) : (
        <>
          <div className="vr-carousel">
            <Carousel indicators controls interval={3000} fade>
              {vr.slice(0, 3).map((item, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={`${BASE_URL}${item.pictures}`} style={{ height: '300px', objectFit: 'cover' }} alt={item.name} />
                  <Carousel.Caption>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <BookingButton place={item} />
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="vr-grid container my-5">
            {vr.map((item, index) => (
              <div key={index} className="vr-card">
                <img className="symbol" src={`${BASE_URL}${item.cover_image}`} alt={item.name} />
                <h6>{item.name}</h6>
                <p className="description">{item.price}</p>
                <BookingButton place={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VRPageTwo;
