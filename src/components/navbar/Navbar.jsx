import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../../assets/hero/bg_1.jpg'; // Correct import for the background image
import logo from '../../assets/logo/enc_logo.png';
import messageIcon from '../../assets/images/message_icon.png';

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
    faCommentDots
} from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

// Colors
// const secondaryColor = '#1c85e8';
const primaryColor = 'blue';

export default function NavbarComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        
        <Container fluid style={{ maxWidth: '100%', overflow: 'hidden' }}>
   <Navbar
        
      expand="lg"
      variant="dark"
      style={{
        // background: "linear-gradient(90deg, blue 0%, #FFD700 100%)", 
        backgroundImage: `linear-gradient(to top, #87CEEB, #f0f0f0)`,

        color: "    ", // Navbar text color
      }}
      fixed="top"
    >                
                {/* Brand Logo */}
                <Navbar.Brand href="/" style={{ height: '60px' }}>
    <img 
        src={logo} 
        alt="Enceptics Logo" 
        style={{ 
            height: '100%', 
            width: 'auto', 
            objectFit: 'contain',
            marginLeft:'20px'
        }} 
    />
</Navbar.Brand>

                {/* Stories Icon */}
                <Nav className="me-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Nav.Link 
                        href="/talks" 
                        className="text-white" 
                       
                        onMouseOver={(e) => {
                            e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                    <img 
                        src={messageIcon} 
                        alt="Talks" 
                        style={{ 
                            height: '30px', 
                            width: 'auto', 
                            objectFit: 'contain',
                            marginLeft: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Professional box shadow
                            borderRadius: '5px' // Optional: adds a slight rounding to the corners
                        }} 
                    />               
                    </Nav.Link>
                </Nav>

                {/* Sidebar Toggle Button */}
                <button 
            onClick={toggleSidebar} 
            style={{ 
                background: 'none', 
                border: 'none', 
                color: '#333', // Set a nice color
                cursor: 'pointer', // Change cursor to pointer
                padding: '10px', // Add padding for better click area
                borderRadius: '5px', // Slight rounding for a softer look
                transition: 'background 0.3s, transform 0.3s', // Smooth transition
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'} // Hover effect
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'} // Reset on leave
            onFocus={(e) => e.currentTarget.style.outline = 'none'} // Remove outline on focus
            onBlur={(e) => e.currentTarget.style.outline = 'none'} // Reset outline
        >
            <FontAwesomeIcon icon={faEllipsisV} size="lg" />
        </button>

                {/* Navbar Links for Larger Screens */}
                <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
                    <Nav className="me-auto m-auto">
                        <Nav.Link href="/destinations/micro-adventure" className="text-white">Micro-Adventure</Nav.Link>
                        <Nav.Link href="/all-places" className="text-white">Explore</Nav.Link>
                        <Nav.Link href="/destination/group-bookings" className="text-white">Group Booking</Nav.Link>
                        <Nav.Link href="/management/property-management" className="text-white">Manage Propertied</Nav.Link>

                        <Nav.Link href="/about" className="text-white">About</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="User" id="basic-nav-dropdown" className="text-white">
                            <NavDropdown.Item href="/auth/profile"><FontAwesomeIcon icon={faUser} /> Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/auth/logout"><FontAwesomeIcon icon={faSignInAlt} /> Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/auth/login" className="text-white mx-1"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
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
  <Nav.Link href="/destinations/micro-adventure" className="text-white">Micro-Adventure</Nav.Link>
  <Nav.Link href="/all-places" className="text-white">Explore</Nav.Link>
  <Nav.Link href="/destination/group-bookings" className="text-white">Group Booking</Nav.Link>
  <Nav.Link href="/destination/group-bookings" className="text-white">About Enceptics</Nav.Link>

  <NavDropdown.Divider />

  {/* Local Experience Dropdown */}
  <NavDropdown title="Local Experience" className="text-white">
    {[

      { href: "/destinations/culinary-tours", title: "Culinary Tours" },
      { href: "/destinations/farmers-markets", title: "Farmers' Markets" },
      { href: "/management/property-management", title: "Manage Property" },
      { href: "/destinations/nature-hikes", title: "Nature Hikes" },
      { href: "/destinations/art-workshops", title: "Art Workshops" },
      { href: "/destinations/cultural-festivals", title: "Cultural Festivals" },
      { href: "/destinations/historical-tours", title: "Historical Tours" },
      { href: "/destinations/community-service", title: "Community Service" },
      { href: "/destinations/outdoor-adventures", title: "Outdoor Adventures" },
      { href: "/destinations/wellness-retreats", title: "Wellness Retreats" },
      { href: "/destinations/local-sports", title: "Local Sports Events" },
      { href: "/destinations/music-dance", title: "Music and Dance Classes" },
      { href: "/destinations/artisan-tours", title: "Local Artisan Tours" },
      { href: "/destinations/photo-walks", title: "Themed Photo Walks" },
      { href: "/destinations/wildlife-spotting", title: "Wildlife Spotting" },
      { href: "/destinations/cultural-exchange", title: "Cultural Exchange" },
      { href: "/destinations/storytelling", title: "Storytelling Nights" },
      { href: "/destinations/vr-2", title: "Virtual Reality" },

    ].map((item, index) => (
      <NavDropdown.Item href={item.href} key={index}>
        {item.title}
      </NavDropdown.Item>
    ))}
  </NavDropdown>

  {/* Craft Your Tour Dropdown */}
  <NavDropdown title="Craft Your Tour" className="text-white">
    {[
      { href: "/itineraries/relaxation", title: "Relax & Rejuvenate" },
      { href: "/itineraries/family", title: "Family Fun" },
      { href: "/itineraries/exploration", title: "Explore the Unknown" },
      { href: "/itineraries/sustainable", title: "Sustainable Travels" },
      { href: "/itineraries/custom", title: "Custom Itineraries" },
      { href: "/itineraries/custom", title: "Tour & Learn" },
      { href: "/management/property-management", title: "Manage Property" },

    ].map((item, index) => (
      <NavDropdown.Item href={item.href} key={index}>
        {item.title}
      </NavDropdown.Item>
    ))}
  </NavDropdown>
</Nav>
                    </Nav>
                </div>
            )}
        </Container>
    );
}
