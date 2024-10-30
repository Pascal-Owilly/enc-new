import React, { useState } from 'react';
import './Booking.css'; // Import styling

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    people: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking details:', formData);
    alert('Booking Successful!');
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Your Stay</h1>
      <p className="booking-intro">Plan your stay with us. Fill out the form below to secure your reservation.</p>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Number of People</label>
          <input
            type="number"
            name="people"
            value={formData.people}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
