import React, { useState } from 'react';
import './GroupBookings.css';

const GroupBookings = () => {
    // Define the booking data
    const bookingData = [
        {
            id: 1,
            title: 'Corporate Retreat',
            image: 'https://via.placeholder.com/300x200',
            description: 'Enhance team bonding with a corporate retreat designed for relaxation and productivity.',
            size: '10-50',
            rating: '★★★★★'
        },
        {
            id: 2,
            title: 'Family Reunion',
            image: 'https://via.placeholder.com/300x200',
            description: 'Make memories with your loved ones during a family reunion filled with fun activities and adventures.',
            size: '5-30',
            rating: '★★★★☆'
        },
        {
            id: 3,
            title: 'Friends Getaway',
            image: 'https://via.placeholder.com/300x200',
            description: 'Gather your friends for a weekend getaway packed with thrilling experiences and relaxation.',
            size: '4-20',
            rating: '★★★★★'
        },
        {
            id: 4,
            title: 'Adventure Trip',
            image: 'https://via.placeholder.com/300x200',
            description: 'Experience thrilling adventures together in breathtaking locations.',
            size: '5-25',
            rating: '★★★★☆'
        },
        {
            id: 5,
            title: 'Cultural Expedition',
            image: 'https://via.placeholder.com/300x200',
            description: 'Explore new cultures with your group and create lasting memories.',
            size: '6-30',
            rating: '★★★★☆'
        },
        {
            id: 6,
            title: 'Wellness Retreat',
            image: 'https://via.placeholder.com/300x200',
            description: 'Relax and rejuvenate with wellness activities tailored for your group.',
            size: '8-40',
            rating: '★★★★★'
        },
        {
            id: 7,
            title: 'Sports Event',
            image: 'https://via.placeholder.com/300x200',
            description: 'Join your friends for a thrilling sports event experience.',
            size: '10-50',
            rating: '★★★★☆'
        },
        {
            id: 8,
            title: 'Camping Trip',
            image: 'https://via.placeholder.com/300x200',
            description: 'Enjoy the great outdoors with a fun camping adventure.',
            size: '5-20',
            rating: '★★★★☆'
        },
        {
            id: 9,
            title: 'Food Tasting Tour',
            image: 'https://via.placeholder.com/300x200',
            description: 'Discover local cuisines on a fun food tasting tour.',
            size: '4-15',
            rating: '★★★★★'
        },
        {
            id: 10,
            title: 'Mystery Trip',
            image: 'https://via.placeholder.com/300x200',
            description: 'Let us surprise you with a mystery trip tailored for your group.',
            size: '5-20',
            rating: '★★★★★'
        }
    ];

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(bookingData.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = bookingData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="group-bookings-page container text-center">
            <h1 
  className="text-dark  mb-4 mt-5"
  style={{
    fontFamily: 'Caladea, serif',
    fontSize: '2.5rem',       // Adjust font size as needed
    fontWeight: 'bold',
    color: '#2c3e50',         // Darker color for contrast
    letterSpacing: '0.1em',   // Adds subtle letter spacing
    marginBottom: '1rem',
    textTransform: 'uppercase', // Optional: makes text uppercase
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  }}
>Group Bookings</h1>
            <p className="lead mb-5">
                Plan unforgettable trips with your friends, family, or colleagues. Enjoy exclusive group rates and personalized itineraries!
            </p>
            <div className="booking-list row">
                {currentItems.map((booking) => (
                    <div className="booking-item col-md-3 mb-4" key={booking.id}>
                        <img src={booking.image} alt={booking.title} className="img-fluid rounded mb-3" />
                        <h2>{booking.title}</h2>
                        <p>{booking.description}</p>
                        <p>Group Size: {booking.size} | Rating: {booking.rating}</p>
                        <button className="btn btn-sm mt-2" style={{backgroundColor:'#000042'}}>Book Now</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="btn btn-sm btn-info" onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                <button className="btn btn-sm btn-info" onClick={handleNext} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default GroupBookings;
