import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FaCalendarCheck, FaDollarSign, FaUsers, FaBuilding, FaTachometerAlt, FaTools } from 'react-icons/fa';
import img1 from '../../../images/1.jpg';
import img2 from '../../../images/2.jpg';
import img3 from '../../../images/3.jpg';
import img4 from '../../../images/4.jpg';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Style.css';

// Registering the required components
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const dummyProperties = [
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 1,
    name: 'Beachfront Villa',
    image: 'https://via.placeholder.com/300x200?text=Beachfront+Villa',
    bookings: 20,
    earnings: 3000,
    visitors: 150,
    rating: 4.5,
    location: 'Malibu, CA',
    amenities: 'Pool, WiFi, Kitchen',
    bookingTrend: [5, 7, 8, 6, 10, 12, 15],
    guestProfiles: [{ name: 'John Doe', feedback: 'Amazing experience!' }],
    reviews: 15,
    pendingBookings: 2,
    completedBookings: 18,
    canceledBookings: 1,
  },
  {
    id: 2,
    name: 'Mountain Cabin',
    image: 'https://via.placeholder.com/300x200?text=Mountain+Cabin',
    bookings: 15,
    earnings: 2500,
    visitors: 100,
    rating: 4.8,
    location: 'Aspen, CO',
    amenities: 'Fireplace, Hiking Trails',
    bookingTrend: [3, 5, 2, 4, 6, 8, 10],
    guestProfiles: [{ name: 'Jane Smith', feedback: 'Loved the views!' }],
    reviews: 12,
    pendingBookings: 1,
    completedBookings: 14,
    canceledBookings: 0,
  },
  {
    id: 3,
    name: 'City Apartment',
    image: 'https://via.placeholder.com/300x200?text=City+Apartment',
    bookings: 30,
    earnings: 5000,
    visitors: 200,
    rating: 4.2,
    location: 'New York, NY',
    amenities: 'Gym, Parking, WiFi',
    bookingTrend: [10, 12, 15, 18, 20, 25, 30],
    guestProfiles: [{ name: 'Michael Brown', feedback: 'Convenient location!' }],
    reviews: 20,
    pendingBookings: 5,
    completedBookings: 25,
    canceledBookings: 3,
  },
];

function App() {
  const totalBookings = dummyProperties.reduce((acc, prop) => acc + prop.bookings, 0);
  const totalEarnings = dummyProperties.reduce((acc, prop) => acc + prop.earnings, 0);
  const totalVisitors = dummyProperties.reduce((acc, prop) => acc + prop.visitors, 0);
  const totalPendingBookings = dummyProperties.reduce((acc, prop) => acc + prop.pendingBookings, 0);
  const totalCompletedBookings = dummyProperties.reduce((acc, prop) => acc + prop.completedBookings, 0);
  const totalCanceledBookings = dummyProperties.reduce((acc, prop) => acc + prop.canceledBookings, 0);

  const data = {
    labels: ['Total Bookings', 'Total Earnings', 'Total Visitors', 'Pending Bookings'],
    datasets: [
      {
        label: 'Statistics',
        data: [totalBookings, totalEarnings, totalVisitors, totalPendingBookings],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28', '#FF7043'],
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: dummyProperties.map((property) => ({
      label: property.name,
      data: property.bookingTrend,
      borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderWidth: 2,
    })),
  };

  const revenueForecastData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue Forecast ($)',
        data: [2000, 2500, 3000, 3200, 3500, 3700, 4000],
        backgroundColor: '#FFCA28',
      },
    ],
  };

  const doughnutData = {
    labels: ['Pending', 'Completed', 'Canceled'],
    datasets: [
      {
        data: [totalPendingBookings, totalCompletedBookings, totalCanceledBookings],
        backgroundColor: ['#FF7043', '#66BB6A', '#42A5F5'],
      },
    ],
  };

  return (
    <div className="manage-container">
      <div className="dashboard">
        <div className="main-content">
        <div className="property-navbar d-flex property-header">
      <h2>
        <FaTachometerAlt style={{ marginRight: '10px' }} />
        Admin
      </h2>
      <button className="manage-btn">
        <FaTools style={{ marginRight: '8px' }} />
        Manage
      </button>
    </div>


<div className="statistics-row">
  <div className="stat-card">
    <FaCalendarCheck size={30} />
    <h4>Total Bookings</h4>
    <p>{totalBookings}</p>
    <span className="badge">Bookings</span>
  </div>
  <div className="stat-card">
    <FaDollarSign size={30} />
    <h4>Total Earnings</h4>
    <p>${totalEarnings.toLocaleString()}</p>
    <span className="badge">Earnings</span>
  </div>
  <div className="stat-card">
    <FaUsers size={30} />
    <h4>Total Visitors</h4>
    <p>{totalVisitors}</p>
    <span className="badge">Visitors</span>
  </div>
  <div className="stat-card">
    <FaBuilding size={30} />
    <h4>Properties Managed</h4>
    <p>{dummyProperties.length}</p>
    <span className="badge">Properties</span>
  </div>
</div>



          <div className="graph-grid mt-3">
         
            <div className="graph-item">
              <h6>Booking Trends</h6>
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="graph-item">
              <h6>Revenue Forecast</h6>
              <Bar data={revenueForecastData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="graph-item">
              <h6>Booking Summary</h6>
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <h6 className='mt-5'>My Properties</h6>
          <div className="property-grid">
            {dummyProperties.map((property) => (
              <div className="property-card" key={property.id}>
                <img src={property.image} alt={property.name} />
                <h4>{property.name}</h4>
                <div className="property-details">
                  <span className="badge badge-location">📍 {property.location}</span>
                  <span className="badge badge-amenities">🔑 {property.amenities}</span>
                  <span className="badge badge-bookings">📅 {property.bookings} Bookings</span>
                  <span className="badge badge-earnings">💵 ${property.earnings} Earnings</span>
                  <span className="badge badge-visitors">👥 {property.visitors} Visitors</span>
                  <span className="badge badge-rating">⭐ {property.rating}</span>
                  <span className="badge badge-reviews">💬 {property.reviews} Reviews</span>
                  <span className="badge badge-pending">⏳ {property.pendingBookings} Pending</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
