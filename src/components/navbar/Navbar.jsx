import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../../assets/hero/bg_1.jpg'; // Correct import for the background image
import logo from '../../assets/logo/enc_logo.png';
import messageIcon from '../../assets/images/message_icon.png';
import defaultProfile from '../../assets/images/default.svg';

import {
  faBars,
  faTimes,
  faSignInAlt,
  faUser,
  faUtensils,
  faShoppingBasket,
  faTree,
  faLeaf,
  faMagic,
  faBook,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

// Colors
// const secondaryColor = '#1c85e8';
const primaryColor = 'blue';

// Assuming you have user data (replace with actual user data)
const user = {
  image: null, // Replace with user image URL or keep null for default
};

const userImage = user.image || defaultProfile; // Fallback to default image

export default function NavbarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container fluid style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Navbar
        expand="sm"
        variant="dark"
        style={{
          // background: "linear-gradient(90deg, blue 0%, #FFD700 100%)",
          backgroundImage: `linear-gradient(to right, gold, blue)`,

          color: '    ', // Navbar text color
        }}
        fixed="top"
      >
        {/* Brand Logo */}
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Enceptics Logo"
            
          />
        </Navbar.Brand>

        {/* Stories Icon */}
        <Nav
          className="me-auto"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
        >
          <Nav.Link
            href="/talks"
            className="text-white"
           
          >
            
            <img
              className="message-icon"
              src={messageIcon}
              alt="Talks"
              
            />
        
          </Nav.Link>
        </Nav>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: '#333',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '5px',
            transition: 'background 0.3s, transform 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          onFocus={(e) => (e.currentTarget.style.outline = 'none')}
          onBlur={(e) => (e.currentTarget.style.outline = 'none')}
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} size="" />
        </button>

        {/* Navbar Links for Larger Screens */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="me-auto m-auto">
            <Nav.Link href="/destinations/micro-adventure" className="text-white">
              Micro-Adventure
            </Nav.Link>
            <Nav.Link href="/all-places" className="text-white">
              Explore
            </Nav.Link>
            <Nav.Link href="/destination/group-bookings" className="text-white">
              Group Booking
            </Nav.Link>
            <Nav.Link href="/management/property-management" className="text-white">
              Manage Propertied
            </Nav.Link>

            <Nav.Link href="/about" className="text-white">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="User" id="basic-nav-dropdown" className="text-white">
              {' '}
              <NavDropdown.Item href="/auth/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
              </NavDropdown.Item>{' '}
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item> <NavDropdown.Divider />{' '}
              <NavDropdown.Item href="/auth/logout">
                <FontAwesomeIcon icon={faSignInAlt} /> Logout
              </NavDropdown.Item>{' '}
            </NavDropdown>
            <Nav.Link href="/auth/login" className="text-white mx-1">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Dimmed Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: '1000',
          }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for Smaller Screens */}
      {sidebarOpen && (
        <div
          className="sidebar heading4 open"
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            color: 'white',
            backgroundImage: `linear-gradient(to bottom, #87CEEB, #ffffff)`,
            width: '250px',
            height: '100vh',
            overflowY: 'auto',
            padding: '1em',
            zIndex: '1050',
          }}
        >
          <Nav className="flex-column">
            <Nav className="ml-auto">
              <Nav.Link href="/destinations/micro-adventure" className="text-white">
                Micro-Adventure
              </Nav.Link>
              <Nav.Link href="/all-places" className="text-white">
                Explore
              </Nav.Link>
              <Nav.Link href="/destination/group-bookings" className="text-white">
                Group Booking
              </Nav.Link>
              <Nav.Link href="/destination/group-bookings" className="text-white">
                About Enceptics
              </Nav.Link>

              <NavDropdown.Divider />

              {/* Craft Your Tour Dropdown */}
              <NavDropdown title="Craft Your Tour" className="text-white">
                {[
                  { href: '/itineraries/relaxation', title: 'Relax & Rejuvenate' },
                  { href: '/itineraries/family', title: 'Family Fun' },
                  { href: '/itineraries/exploration', title: 'Explore the Unknown' },
                  { href: '/itineraries/sustainable', title: 'Sustainable Travels' },
                  { href: '/itineraries/custom', title: 'Custom Itineraries' },
                  //   { href: "/itineraries/custom", title: "Tour & Learn" },
                  { href: '/management/property-management', title: 'Manage Property' },
                ].map((item, index) => (
                  <NavDropdown.Item href={item.href} key={index}>
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* Local Experience Dropdown */}
              <NavDropdown
                title="Local Experience"
                style={{
                  height: '300px', // Set a maximum height
                  overflowY: 'auto', // Enable vertical scrolling
                  overflowX: 'hidden', // Prevent horizontal scrolling
                }}
              >
                {[
                  { href: '/destinations/culinary-tours', title: 'Culinary Tours' },
                  { href: '/destinations/farmers-markets', title: "Farmers' Markets" },
                  { href: '/management/property-management', title: 'Manage Property' },
                  { href: '/destinations/nature-hikes', title: 'Nature Hikes' },
                  { href: '/destinations/art-workshops', title: 'Art Workshops' },
                  { href: '/destinations/cultural-festivals', title: 'Cultural Festivals' },
                  { href: '/destinations/historical-tours', title: 'Historical Tours' },
                  { href: '/destinations/community-service', title: 'Community Service' },
                  { href: '/destinations/outdoor-adventures', title: 'Outdoor Adventures' },
                  { href: '/destinations/wellness-retreats', title: 'Wellness Retreats' },
                  { href: '/destinations/local-sports', title: 'Local Sports Events' },
                  { href: '/destinations/music-dance', title: 'Music and Dance Classes' },
                  { href: '/destinations/artisan-tours', title: 'Local Artisan Tours' },
                  { href: '/destinations/photo-walks', title: 'Themed Photo Walks' },
                  { href: '/destinations/wildlife-spotting', title: 'Wildlife Spotting' },
                  { href: '/destinations/cultural-exchange', title: 'Cultural Exchange' },
                  { href: '/destinations/storytelling', title: 'Storytelling Nights' },
                  { href: '/destinations/vr-2', title: 'Virtual Reality' },
                ].map((item, index) => (
                  <div key={index}>
                    <NavDropdown.Item
                      href={item.href}
                      style={{
                        padding: '10px 15px', // Adjust padding for better spacing
                        color: '#333', // Text color
                        textDecoration: 'none', // Remove underline
                        transition: 'background-color 0.2s', // Transition effect
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 66, 0.1)')} // Hover effect
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Reset background
                    >
                      {item.title}
                    </NavDropdown.Item>
                    {index < 16 && ( // Add divider after each item except the last one
                      <div
                        style={{
                          height: '1px',
                          backgroundColor: '#ccc', // Divider color
                          margin: '5px 0', // Divider spacing
                        }}
                      />
                    )}
                  </div>
                ))}
              </NavDropdown>
            </Nav>
          </Nav>
        </div>
      )}
    </Container>
  );
}
