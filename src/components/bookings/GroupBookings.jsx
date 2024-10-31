import React from 'react';
import './GroupBookings.css'; // Adjust the path as necessary

const GroupBookings = () => {
    return (
        <div className="group-bookings-page">
            <h1>Group Bookings</h1>
            <p>Plan unforgettable trips with your friends, family, or colleagues. Enjoy exclusive group rates and personalized itineraries!</p>
            <div className="booking-list">
                <div className="booking-item">
                    <h2>Corporate Retreat</h2>
                    <p>Enhance team bonding with a corporate retreat designed for relaxation and productivity.</p>
                    <p>Group Size: 10-50 | Rating: ★★★★★</p>
                </div>
                <div className="booking-item">
                    <h2>Family Reunion</h2>
                    <p>Make memories with your loved ones during a family reunion filled with fun activities and adventures.</p>
                    <p>Group Size: 5-30 | Rating: ★★★★☆</p>
                </div>
                <div className="booking-item">
                    <h2>Friends Getaway</h2>
                    <p>Gather your friends for a weekend getaway packed with thrilling experiences and relaxation.</p>
                    <p>Group Size: 4-20 | Rating: ★★★★★</p>
                </div>
            </div>
        </div>
    );
};

export default GroupBookings;
