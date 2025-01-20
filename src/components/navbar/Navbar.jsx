import React, { useState } from "react";
import "./Navbar.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/enc_logo.png';
import messageIcon from '../../assets/images/message_icon.png';
import defaultProfile from '../../assets/images/default.svg';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // for the search icon
import BottomNav from './BottomNav';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change to true for authenticated state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to scroll the menu horizontally
  const scrollMenu = (direction) => {
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".menu a");
    const menuWidth = menu.offsetWidth;
    const linkWidth = links[0].offsetWidth + 20; // Approximate width including margin
    const maxScroll = links.length * linkWidth - menuWidth;

    if (direction === "right" && scrollPosition < maxScroll) {
      setScrollPosition((prev) => prev + linkWidth);
    } else if (direction === "left" && scrollPosition > 0) {
      setScrollPosition((prev) => prev - linkWidth);
    }

    menu.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  // Toggle sidebar function for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar fixed-to">
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
            <span>How do you want your vacation?</span>
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
            <FaSearch />
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

        <div className="actions">
          {isAuthenticated ? (
            <>
              <div className="profile-dropdown">
                <img
                  className="profile-image"
                  src={defaultProfile}
                  alt="Profile Icon"
                />
                <div className="dropdown-content">
                  <a href="/auth/profile">View Profile</a>
                  <a href="/auth/signup">Logout</a>
                </div>
              </div>
            </>
          ) : (
            <>
              <a className="auth-button" href="/auth/login">Login</a> &nbsp;
              <a href="/auth/signup" className="auth-button" style={{background:'#facc15', color:'#333'}}>Sign Up</a>
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
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background:'#ddd', color:'#333' }}>
  <div>
    <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div className="tuor-options">
        <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>How do you want your vacation?</span>
        <select style={{ padding: '5px', width: '100%' }}>
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="exclusive">Exclusive</option>
          <option value="inclusive">Inclusive</option>
        </select>
      </div>
      <div className="close-btn" onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '20px' }}>
        <FaTimes />
      </div>
    </div>

    <hr style={{ margin: '10px 0' }} />

    <div className="search-bar" style={{ display: 'flex', padding: '10px' }}>
      <input
        type="text"
        placeholder="Search everything at enceptics ..."
        style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '5px' }}
      />
      <button className="search-icon" style={{ padding: '8px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        <FaSearch />
      </button>
    </div>

    <hr style={{ margin: '10px 0' }} />

    <div className="actions" style={{ padding: '10px' }}>
      {isAuthenticated ? (
        <div className="profile-dropdown" style={{ textAlign: 'center' }}>
          <img
            className="profile-image"
            src={defaultProfile}
            alt="Profile Icon"
            style={{ width: '50px', borderRadius: '50%', marginBottom: '10px' }}
          />
          <div>
            <a href="/auth/profile" style={{ display: 'block', marginBottom: '5px', textDecoration: 'none', color: '#333' }}>View Profile</a>
            <a href="/auth/signup" style={{ display: 'block', textDecoration: 'none', color: '#333' }}>Logout</a>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <a className="auth-button" href="/auth/login" style={{ display: 'block', marginBottom: '5px', textDecoration: 'none', color: '#333' }}>Login</a>
          <a href="/auth/signup" className="auth-button" style={{ display: 'block', textDecoration: 'none', color: '#333' }}>Sign Up</a>
        </div>
      )}
    </div>
  </div>

  {/* Footer Section */}
  <div style={{ padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'center' }}>
    <hr style={{ margin: '10px 0' }} />
    <div style={{ marginBottom: '10px' }}>
      <a href="/about" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>About Us</a>
      <a href="/contact" style={{ display: 'block', textDecoration: 'none', color: '#333', marginBottom: '5px' }}>Contact Us</a>
    </div>
    <div>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px', textDecoration: 'none' }}>
        <i className="fab fa-facebook" style={{ fontSize: '20px', color: '#4267B2' }}></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px', textDecoration: 'none' }}>
        <i className="fab fa-twitter" style={{ fontSize: '20px', color: '#1DA1F2' }}></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px', textDecoration: 'none' }}>
        <i className="fab fa-instagram" style={{ fontSize: '20px', color: '#C13584' }}></i>
      </a>
    </div>
  </div>
</div>

    </div>
    
  );
};
  
export default Navbar;
