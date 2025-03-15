import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FaCalendarCheck, FaDollarSign, FaUsers, FaBuilding, FaTachometerAlt, FaPlusCircle } from 'react-icons/fa';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import './Style.css';
import { BASE_URL } from '../config/config';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

function PropertyManager() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const authToken = localStorage.getItem('authToken'); // Get token
  
      try {
        const response = await axios.get(`${BASE_URL}/api/manager/places/`, {
          headers: {
            Authorization: `Token ${authToken}`, // Send token in headers
          },
        });
  
        console.log('Fetched Properties:', response.data);
  
        // Ensure data is an array
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error('Invalid data format:', response.data);
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]); // Default empty array to avoid errors
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);
  

  if (loading) {
    return (
      <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  // Ensure properties is always an array before using reduce
  const safeProperties = Array.isArray(properties) ? properties : [];

  // Calculate total statistics safely
  const totalBookings = safeProperties.reduce((acc, prop) => acc + (prop.total_bookings || 0), 0);
  const totalEarnings = safeProperties.reduce((acc, prop) => acc + (prop.total_earnings || 0), 0);
  const totalVisitors = safeProperties.reduce((acc, prop) => acc + (prop.total_visitors || 0), 0);
  const totalPendingBookings = safeProperties.reduce((acc, prop) => acc + (prop.total_pending_bookings || 0), 0);
  const totalCompletedBookings = safeProperties.reduce((acc, prop) => acc + (prop.total_completed_bookings || 0), 0);
  const totalCanceledBookings = safeProperties.reduce((acc, prop) => acc + (prop.total_canceled_bookings || 0), 0);

  // Data for charts
  const barData = {
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
    datasets: safeProperties.map((property) => ({
      label: property.name,
      data: property.booking_trend || [],
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
        data: safeProperties.map(prop => prop.revenue_forecast || [0]),
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
    <div className="manage-container mt-3">
      <div className="dashboard">
        <div className="main-content">
          <div className="property-navbar d-flex property-header  ">
            <h6 className='text-primary text-muted'>
              <FaTachometerAlt size={20} style={{ marginRight: '1px' }} />&nbsp;
              Manage properties
            </h6>
            <a href="/management/property-management/add-place">
              <button className=" text-dark" style={{fontSize:'12px', backgroundColor:'#FFD700'}}>
                <FaPlusCircle size={16} /> &nbsp; Add Property
              </button>
            </a>
          </div>    

          <div className="statistics-row">
            <div className="stat-card">
              <FaBuilding className='mb-2' size={25} style={{color:'#FFD700'}}/>
              <h6 className='text-primary'>Properties Managed</h6>
              <p>{safeProperties.length}</p>
              <span className="badge badge-primary">Properties</span>
            </div>
            <div className="stat-card">
              <FaCalendarCheck size={25} className='mb-2' size={25} style={{color:'#FFD700'}} />
              <h6 className='text-primary'>Total Bookings</h6>
              <p>{totalBookings}</p>
              <span className="badge">Bookings</span> 
            </div>
            <div className="stat-card">
              <FaDollarSign size={25} className='mb-2' size={25} style={{color:'#FFD700'}}/>
              <h6 className='text-primary'>Total Earnings</h6>
              <p>KES {totalEarnings.toLocaleString()}</p>
              <span className="badge"> Earnings</span>
            </div>
            <div className="stat-card">
              <FaUsers size={25} className='mb-2' size={25} style={{color:'#FFD700'}}/>
              <h6 className='text-primary'>Total Visitors</h6>
              <p>{totalVisitors}</p>
              <span className="badge">Visitors</span>
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

          <h6 className="mt-5">My Properties</h6>
          <div className="property-grid">
            {safeProperties.map((property) => (
              <div className="property-card" key={property.id}>
                <div className="property-image">
                  {/* Ensure the image is always rendered */}
                  <img
                    src={`${BASE_URL}${property.image}`}  // Make sure the field name matches the data
                    alt={property.name}
                    className="property-img"
                    onError={(e) => e.target.style.display = 'none'} // Hide image if it fails to load
                  />
                  <h4 className="property-name all-headings text-white">{property.name}</h4>
                </div>
                <div className="property-details">
                  <span className="badge">📍 {property.location}</span>
                  <span className="badge">📅 {property.bookings} Bookings</span>
                  <span className="badge">💵 ${property.earnings} Earnings</span>
                  <span className="badge">👥 {property.visitors} Visitors</span>
                  <span className="badge">⭐ {property.average_rating} Rating</span>
                  <span className="badge">💬 {property.total_reviews} Reviews</span>
                  <span className="badge">⏳ {property.pendingBookings} Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyManager;
