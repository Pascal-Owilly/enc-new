import React, { useState, useEffect } from "react";
import "./Navbar.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/enc_logo.png';
import messageIcon from '../../assets/images/message_icon.png';
import defaultProfile from '../../assets/images/default.svg';
import { FaSearch, FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { FaUser, FaHome, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';  // Import icons

import BottomNav from './BottomNav';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    // Handle logout and clear auth token
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log("Logged out successfully.");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Change scroll threshold to 50px for sticky behavior
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
    { href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "I found something interesting to share with you.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully!");
      } catch (err) {
        console.error("Error sharing content:", err);
      }
    } else {
      alert("Sharing not supported in this browser. Use the links below!");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="top-bar">
        <div className="logo-location">
          <div className="logo">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
              />
            </a>
          </div>
          <div className="tuor-options">
            <span style={{color:'#FFF'}}>How do you want your vacation?</span>
            <select>
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="exclusive">Exclusive</option>
              <option value="inclusive">Inclusive</option>
            </select>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search everything at enceptics ..."
          />
          <button className="search-icon">
            <FaSearch size={15} style={{color:'#333'}}/>
          </button>
        </div>

        <div className="actions">
          <a href="/talks">
            <div className="messages">
              <img
                src={messageIcon}
                alt="Message Icon"
              />
              <div className="notification">5</div>
            </div>
          </a>
        </div>
        &nbsp;

        <div className="actions" style={{ zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
  {isAuthenticated ? (
    <>
      <div className="dropdown">
        <img
          className="profile-image dropdown-toggle"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          src={defaultProfile}
          alt="Profile Icon"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{
          width: "200px",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Roboto', sans-serif",
        }}>
          <li>
            <a className="dropdown-item" href="/auth/profile" style={{ display: "flex", alignItems: "center", color:'#000042' }}>
              <FaUser style={{ marginRight: "10px" }} />
              View Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/management/property-management" style={{ display: "flex", alignItems: "center", color:'#000042' }}>
              <FaHome style={{ marginRight: "10px" }} />
              My Properties
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
          <a className="dropdown-item text-danger" onClick={handleLogout} style={{ display: "flex", alignItems: "center", color:'#000042', cursor: 'pointer' }}>
                      <FaSignOutAlt style={{ marginRight: "10px" }} />
                      Logout
                    </a>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <a className="auth-button-login btn btn-outline-primar" href="/auth/login">
        <FaSignInAlt style={{ marginRight: "8px" }} />
        Login
      </a>
      <a href="/auth/signup" className="auth-button-signup btn " style={{ color: '#333' }}>
        <FaUserPlus style={{ marginRight: "8px" }} />
        Sign Up
      </a>
    
    </>
  )}
</div>



        <div className="">
          <a href="/chats">
            <div className="mobile-message">
              <a href="/talks">
                <div className="messages">
                  <img
                    src={messageIcon}
                    alt="Message Icon"
                    style={{ width: "25px", height: "20px" }}
                  />
                  <div className="notification">5</div>
                </div>
              </a>
            </div>
          </a>
        </div>

        <button className="burger-icon" style={{background:'transparent'}} onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background:'#ddd', color:'#333'}}>
  <div>
    <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div className="tuor-options " style={{background:'#000042', color:'#ddd', marginTop:'-1px', borderRadius:'30px', padding:'3px 15px 3px 15px', width:'100%  '}}>
        <span style={{ fontWeight: '', marginBottom: '', fontSize:'10px' }}>How do you want your vacation?</span> <br />
        <select style={{ padding: '5px', width: '100%', marginTop:'10px' }}>
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="exclusive">Exclusive</option>
          <option value="inclusive">Inclusive</option>
        </select>
      </div> &nbsp;
      <div className="close-btn" onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '20px' }}>
        <FaTimes />
      </div>
    </div>

    <hr style={{ margin: '10px 0' }} />
    <div className="actions" style={{ zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
  {isAuthenticated ? (
    <>
      <div className="dropdown">
        <img
          className="profile-image dropdown-toggle"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          src={defaultProfile}
          alt="Profile Icon"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{
          width: "200px",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Roboto', sans-serif",
        }}>
          <li>
            <a className="dropdown-item" href="/auth/profile" style={{ display: "flex", alignItems: "center", color:'#000042' }}>
              <FaUser style={{ marginRight: "10px" }} />
              View Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/management/property-management" style={{ display: "flex", alignItems: "center", color:'#000042' }}>
              <FaHome style={{ marginRight: "10px" }} />
              My Properties
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
          <a className="dropdown-item text-danger" onClick={handleLogout} style={{ display: "flex", alignItems: "center", color:'#000042', cursor: 'pointer' }}>
                      <FaSignOutAlt style={{ marginRight: "10px" }} />
                      Logout
                    </a>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
     <a className="auth-button-login btn btn-outline-primar" href="/auth/login">
        <FaSignInAlt style={{ marginRight: "8px" }} />
        Login
      </a>
      <a href="/auth/signup" className="auth-button-signup btn " style={{ color: '#333' }}>
        <FaUserPlus style={{ marginRight: "8px" }} />
        Sign Up
      </a>
    </>
  )}
</div>
    <hr style={{ margin: '10px 0' }} />
  </div>

  {/* Footer Section */}
  <div style={{ padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'center' }}>

  <div className="input-group" style={{width:'100%'}}>
      {/* Form Outline */}
      <div className="form-outline" data-mdb-input-init>
        <input type="search" id="form1"
        placeholder="Search everything at enceptics ..."
        className="form-control" />
      </div>
      {/* Search Button */}
      <button type="button" className="btn btn-s" data-mdb-ripple-init style={{background:'#000042', color:'#ddd', marginTop:'-1px'}}>
        <FaSearch size={10}/>  
      </button>
    </div>
    <hr style={{ margin: '10px 0' }} />
    <div style={{ marginBottom: '10px', textAlign:'left' }}>
        
      <a href="/about" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>About Enceptics</a>
      <hr style={{ margin: '10px 0' }} />
      <a href="/contact" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>Contact Us</a>
      <hr style={{ margin: '10px 0' }} />

      <a href="/blogs" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>Blogs</a>
      <hr style={{ margin: '10px 0' }} />

      <a href="/partners" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>Partners</a>
      <hr style={{ margin: '10px 0' }} />

      <a href="/faqs" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>FAQs </a>
      <hr style={{ margin: '10px 0' }} />

    </div>

  </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* Social Links */}
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              {social.icon}
            </a>
          ))}
  
          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            <FaShareAlt />
          </button>
        </div>
</div>
    </div>
  );
};
  
export default Navbar;
