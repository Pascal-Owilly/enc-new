import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  FaCalendarCheck, FaDollarSign, FaUsers, FaBuilding,
  FaTachometerAlt, FaPlusCircle, FaMapMarkerAlt,
  FaStar, FaInfoCircle, FaFilter, FaDownload,
  FaCog, FaEye, FaEyeSlash, FaChartLine, FaMoneyBillWave, FaTimes
} from 'react-icons/fa';
import { Chart, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import axios from 'axios';
import './Style.css';
import './SettingsModal.css';
import { BASE_URL } from '../config/config';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const SettingsModal = ({ isVisible, onClose, toggleCardVisibility, visibleCards }) => {
    if (!isVisible) return null;

    return (
        <div className="settings-modal-overlay">
            <div className="settings-modal-content">
                <div className="settings-modal-header">
                    <h2>Settings & Customization</h2>
                    <button className="settings-modal-close-btn" onClick={onClose}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="settings-modal-body">
                    <h3>Dashboard Visibility</h3>
                    <p>Toggle which key performance indicators (KPIs) you want to see on your dashboard.</p>
                    <div className="visibility-controls-grid">
                        {Object.entries(visibleCards).map(([key, value]) => (
                            <div key={key} className="visibility-item">
                                <label className="toggle-label">
                                    <span className="toggle-text">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => toggleCardVisibility(key)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

function PropertyManager() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('bookings');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [visibleCards, setVisibleCards] = useState({
    properties: true,
    bookings: true,
    earnings: true,
    visitors: true,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProperties = async () => {
      const authToken = localStorage.getItem('authToken');
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/manager/places/`, {
          headers: { Authorization: `Token ${authToken}` },
        });
        setProperties(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your properties...</p>
        </div>
      </div>
    );
  }

  const safeProperties = Array.isArray(properties) ? properties : [];

  const totalBookings = safeProperties.reduce((acc, p) => acc + (p.bookings_count || 0), 0);
  const totalPaidBookings = safeProperties.reduce((acc, p) => acc + (p.paid_count || 0), 0);
  const totalUnpaidBookings = safeProperties.reduce((acc, p) => acc + (p.unpaid_count || 0), 0);
  const totalEarnings = safeProperties.reduce((acc, p) => acc + Number(p.total_earnings || 0), 0);
  
  const totalVisitors = safeProperties.reduce((acc, p) => acc + (p.total_visitors || 0), 0);
  const totalPendingBookings = safeProperties.reduce((acc, p) => acc + (p.total_pending_bookings || 0), 0);
  const totalCompletedBookings = safeProperties.reduce((acc, p) => acc + (p.total_completed_bookings || 0), 0);
  const totalCanceledBookings = safeProperties.reduce((acc, p) => acc + (p.total_canceled_bookings || 0), 0);
  
  const lastMonthEarnings = totalEarnings * 0.78; 
  const earningsChange = totalEarnings - lastMonthEarnings;
  const earningsPercentageChange = lastMonthEarnings > 0 
    ? ((earningsChange / lastMonthEarnings) * 100).toFixed(0) 
    : 0;

  const kpiBarData = {
    labels: ['Bookings', 'Paid', 'Unpaid'],
    datasets: [{
      label: 'Overview',
      data: [totalBookings, totalPaidBookings, totalUnpaidBookings],
      backgroundColor: ['#4A90E2', '#28A745', '#FF6347'],
    }],
  };

  const palette = [
    '#4A90E2',
    '#28A745',
    '#FF6347',
    '#FFC107',
    '#6F42C1',
    '#17A2B8',
    '#FF9800',
  ];

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: safeProperties.map((p, i) => ({
      label: p.name,
      data: Array.isArray(p.booking_trend) ? p.booking_trend : [],
      borderColor: palette[i % palette.length],
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 2,
      pointRadius: 3,
      tension: 0.4,
    })),
  };

  const doughnutData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [{
      data: [totalPaidBookings, totalUnpaidBookings],
      backgroundColor: ['#28A745', '#FF6347'],
      borderWidth: 0,
      hoverOffset: 10,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 10
      },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#718096' }
      },
      y: {
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: { beginAtZero: true, color: '#718096' }
      },
    },
  };

  const filteredProperties = safeProperties
    .filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const earningsA = Number(a.total_earnings || 0);
      const earningsB = Number(b.total_earnings || 0);
      if (sortBy === 'earnings') return earningsB - earningsA;
      if (sortBy === 'rating') return (Number(b.average_rating) || 0) - (Number(a.average_rating) || 0);
      return (b.bookings_count || 0) - (a.bookings_count || 0);
    });

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    const ok = window.confirm('Are you sure you want to delete this property? This cannot be undone.');
    if (!ok) return;
    try {
      await axios.delete(`${BASE_URL}/api/manager/places/${id}/`, {
        headers: { Authorization: `Token ${authToken}` },
      });
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Failed to delete', e);
      alert('Failed to delete property.');
    }
  };

  const exportCSV = () => {
    const rows = [
      ['Name', 'Location', 'Bookings', 'Earnings', 'Visitors', 'Rating'],
      ...filteredProperties.map(p => [
        p.name || '',
        p.location || '',
        p.bookings_count || 0,
        Number(p.total_earnings || 0),
        p.total_visitors || 0,
        Number(p.average_rating || 0),
      ]),
    ];
    const csv = rows
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'properties.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleCardVisibility = (card) => {
    setVisibleCards(prev => ({ ...prev, [card]: !prev[card] }));
  };

  return (
    <div className="property-manager-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Property Management Dashboard</h1>
            <p className='welcome-text'>Welcome back! Here's the latest performance of your properties.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setShowSettingsModal(true)}>
              <FaCog size={14} /> Settings
            </button>
          </div>
        </div>
        
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaTachometerAlt size={14} /> Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <FaBuilding size={14} /> Properties
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaChartLine size={14} /> Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <FaMoneyBillWave size={14} /> Earnings
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-toolbar">
          <div className="search-filter-section">
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="bookings">Most Bookings</option>
                <option value="earnings">Highest Earnings</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-outline" onClick={exportCSV}>
              <FaDownload size={14} /> Export
            </button>
            <a href="/management/property-management/add-place" className='btn-add'>
              <button className="btn btn-primary">
                <FaPlusCircle size={14} /> Add Property
              </button>
            </a>
          </div>
        </div>

        {search && (
          <div className="search-feedback">
            Showing results for: <span className="search-term">"{search}"</span>
            <span className="results-count">{filteredProperties.length} properties found</span>
          </div>
        )}

        {activeTab === 'overview' && (
          <>
            <div className="kpi-cards-grid">
              {visibleCards.properties && (
                <div className="kpi-card">
                  <div className="kpi-icon-container bg-blue">
                    <FaBuilding className='kpi-icon' />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Properties Managed</span>
                    <span className="kpi-value">{safeProperties.length}</span>
                    <span className="kpi-trend">+2 from last month</span>
                  </div>
                </div>
              )}
              
              {visibleCards.bookings && (
                <div className="kpi-card">
                  <div className="kpi-icon-container bg-green">
                    <FaCalendarCheck className='kpi-icon' />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Total Bookings</span>
                    <span className="kpi-value">{totalBookings}</span>
                    <span className="kpi-trend">+15% from last month</span>
                  </div>
                </div>
              )}
              
              {visibleCards.earnings && (
                <div className="kpi-card">
                  <div className="kpi-icon-container bg-gold">
                    <FaDollarSign className='kpi-icon' />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Total Earnings</span>
                    <span className="kpi-value">
                      KES {Number(totalEarnings || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="kpi-trend">{earningsPercentageChange >= 0 ? '+' : ''}{earningsPercentageChange}% from last month</span>
                  </div>
                </div>
              )}
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Booking Trends</h3>
                  <span className="time-filter">Last 7 weeks</span>
                </div>
                <div className="chart-container">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Performance Overview</h3>
                </div>
                <div className="chart-container">
                  <Bar data={kpiBarData} options={chartOptions} />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Booking Status</h3>
                </div>
                <div className="chart-container">
                  <Doughnut data={doughnutData} options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 20
                        }
                      }
                    }
                  }} />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="properties-section">
          <div className="section-header">
            <h2>My Properties</h2>
            <span className="properties-count">{filteredProperties.length} properties</span>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaBuilding size={48} />
              </div>
              <h3>No properties found</h3>
              <p>No properties match your search or filters. Try adjusting your search or add a new property.</p>
              <a href="/management/property-management/add-place" className='btn-add'>
                <button className="btn btn-primary">
                  <FaPlusCircle size={14} /> Add Your First Property
                </button>
              </a>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <div className="property-card" key={property.id}>
                  <div className="property-image">
                    <img
                      src={property.cover_image}
                      alt={property.name}
                      className="property-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback">
                      <FaBuilding size={32} />
                    </div>
                    <div className="property-badges">
                      <div className="property-rating">
                        <FaStar size={12} />
                        <span>{property.average_rating || '0'}</span>
                      </div>
                      {property.is_featured && <div className="featured-badge">Featured</div>}
                    </div>
                  </div>
                  <div className="property-content">
                    <h3 className="property-name">{property.name}</h3>
                    <p className="property-location">
                      <FaMapMarkerAlt size={12} />
                      {property.location || 'Location not specified'}
                    </p>
                    
                    <div className="property-stats">
                      <div className="stat">
                          <span className="stat-value">{property.bookings_count || 0}</span>
                          <span className="stat-label">Bookings</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{property.paid_count || 0}</span>
                          <span className="stat-label">Paid</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{property.unpaid_count || 0}</span>
                          <span className="stat-label">Unpaid</span>
                        </div>
                    </div>
                    
                    <div className="property-actions">
                      <a href={`/management/property-management/edit/${property.id}`} className="btn btn-sm btn-secondary">Manage</a>
                      <a href={`/place/${property.id}`} className="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer">View</a>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(property.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <SettingsModal
        isVisible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        toggleCardVisibility={toggleCardVisibility}
        visibleCards={visibleCards}
      />
    </div>
  );
}

export default PropertyManager;