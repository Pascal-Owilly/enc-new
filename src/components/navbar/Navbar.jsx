import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/enc_logo.png';
import defaultProfile from '../../assets/images/default.svg';

import { 
  FaSearch, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaHome, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaWhatsapp,
  FaShareAlt,
} from 'react-icons/fa';

import { FiPhone } from "react-icons/fi";
import { MessageCircleMore } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentCategory, setCurrentCategory] = useState("Journey with Purpose");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const categories = ["Journey with Purpose", "Explore Your Passions", "Savor Your Desires", "Share your story"];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.reload();
  };

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 3000); 

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [categories]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook /> },
    // { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
    // { href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "I found something interesting to share with you.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing content:", err);
      }
    } else {
      alert("Sharing not supported in this browser. Use the links below!");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearchInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      window.location.reload();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className={`navbar ${isSticky ? "sticky" : ""}`}>
      {/* Top Bar */}
      <div className="top-bar">
        {/* Logo and Branding */}
        <div className="brand-section">
          <a href="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </a>
{/*          <div className="brand-tagline">
               <div className='bottom-nav-link'
              style={{
                fontSize: "0.9rem",  // Smaller font size
                fontWeight: "600",   // Slightly bolder text
                color: '#0071ce',
                opacity: 0.5,
                transform: "translateY(20px)",
                animation: "fadeInUp 1.5s ease-out forwards, parallaxEffect 5s infinite alternate",
                transition: "transform 0.3s ease-out",
              }}
            >
              {currentCategory}
            </div>
          </div>*/}

          {/* Social links for large screens */}
  <div className="social-links d-none d-md-flex mx-5">
  <a
    href="tel:+254712154175"
    style={{
      display: "flex",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "18px",
      color: "#4B0082",
      gap: "8px",
      textDecoration: "none",
      transition: "color 0.3s ease",
    }}

    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    <FiPhone size={20} />
    <span style={{ letterSpacing: "0.5px" }}>+254-712-154-175</span>
  </a>
<div
  className="social-links d-none d-md-flex"
  style={{ marginLeft: '2rem' }}
>
  <button

    onClick={() => {
      const phoneNumber = "+254712154175";
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    }}

    aria-label="Contact us on WhatsApp"
    style={{
      padding: '6px 6px 6px 6px',
      borderRadius: '50%',
      backgroundColor: '#25D366',
      border: 'none',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
  >
    
    <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>
      <FaWhatsapp style={{ color: 'white' }} />
    </span>
  </button>
</div>
          </div>
        </div>
      
        {/* Search Bar */}
        <div className={`search-container ${isSearchFocused ? "focused" : ""}`}>
         <input
            type="text"
            placeholder="🔍 What's your next hobby adventure?"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />

          <button className="search-button" onClick={handleSearch}>
            <FaSearch className="search-icon" />
          </button>
        </div>

          {/* Stories Button */}

<div
  className="stories-button ms-5 ms-md-2"
  onClick={() => navigate("/talks")}
  style={{ marginRight: '10px' }}
>
  <div className="stories-icon-container ms-5">
    <MessageCircleMore className="stories-icon" />
  </div>
  <span className="stories-tooltip">Traveler Stories</span>
</div>

<div
  className="action-buttons ms-0 ms-md-4"
  style={{ marginRight: '10px' }}
>
  <button className="mobile-menu-button" onClick={toggleSidebar}>
    <FaBars />
  </button>

  {/* Auth Buttons - hidden on mobile */}
  <div className="auth-section d-none d-md-flex">
    {isAuthenticated ? (
      <div className="profile-dropdown" onClick={() => setDropdownVisible(!dropdownVisible)}>
        <img
          src={defaultProfile}
          alt="Profile"
          className="profile-image mx-3"
        />
        {dropdownVisible && (
          <div className="dropdown-menu show">
            {user?.role === 'property_manager' && (
              <>
                <a href="/management/property-management" className="dropdown-item">
                  <FaHome className="dropdown-icon" />
                  My Properties
                </a>
                <a href="/contract-signing" className="dropdown-item">
                  <FaHome className="dropdown-icon" />
                  My Contract
                </a>
              </>
            )}
            <button onClick={handleLogout} className="dropdown-item logout">
              <FaSignOutAlt className="dropdown-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <>
        <a href="/auth/login" className="auth-button login">
          <FaSignInAlt className="auth-icon" />
          Login
        </a>
        <a href="/auth/signup" className="auth-button signup">
          <FaUserPlus className="auth-icon" />
          Sign Up
        </a>
      </>
    )}
  </div>
</div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-tagline">
            <span>Join us for a lifetime experience</span>
          </div>
          <button className="sidebar-close-button" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          {/* Mobile Search */}
          <div className="mobile-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* Mobile Auth */}
          <div className="mobile-auth">
            {isAuthenticated ? (
              <div className="mobile-profile">
                <img src={defaultProfile} alt="Profile" />
                <div className="mobile-profile-actions">
                  {user?.role === 'property_manager' && (
                    <>
                      <a href="/management/property-management">
                        <FaHome /> My Properties
                      </a>
                      <a href="/contract-signing">
                        <FaHome /> My Contract
                      </a>
                    </>
                  )}
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <a href="/auth/login">
                  <FaSignInAlt /> Login
                </a>
                <a href="/auth/signup">
                  <FaUserPlus /> Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <a href="/trip-mate" className="nav-link">TripMate</a>
            <a href="/about">About Us</a>
            <a href="/blogs">Blogs</a>
            <a href="/partners">Partners</a>
            <a href="/faqs">FAQs</a>
            <a href="/contact">Contact Us</a>

          </nav>

          {/* Social Links */}
          <div className="mobile-social">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.icon}
              </a>
            ))}
           <button 
  onClick={() => {
    const phoneNumber = "+254712154175";
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  }}
  className="btn btn-success p-1 rounded-circle"
  aria-label="Contact us on WhatsApp"
  style={{

    borderColor: '#25D366',
    transition: 'all 0.3s ease'
  }}
>
  <FaWhatsapp 
    className="fs-4" // Bootstrap font-size utility
    style={{ color: 'white' }}
  />
</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;