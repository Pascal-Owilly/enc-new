import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
const secondaryColor = '#1c85e8';
const primaryColor = '#000042';

export default function NavbarComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        
        <Container fluid style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <Navbar expand="lg" variant="dark" style={{ backgroundColor: primaryColor }} fixed="top">
                {/* Brand Logo */}
                <Navbar.Brand href="/" style={{
                    fontFamily: 'Caladea, serif',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #d3d3d3, #fff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 5px rgba(253, 235, 61, 0.4)',
                    padding: '0.3em 0',
                    marginLeft: '10px'
                }}>
                    🌍 Enceptics
                </Navbar.Brand>

                {/* Stories Icon */}
                <Nav className="me-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Nav.Link 
                        href="/talks" 
                        className="text-white" 
                        style={{
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            position: 'relative', 
                            padding: '0.5rem 1rem',
                            borderRadius: '50%', 
                            transition: 'all 0.3s ease-in-out', 
                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', // Softer, more professional shadow
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <FontAwesomeIcon icon={faCommentDots} size='lg'/>
                    </Nav.Link>
                </Nav>

                {/* Sidebar Toggle Button */}
                <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'white', marginRight: '5px' }}>
                    <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} size="lg" />
                </button>

                {/* Navbar Links for Larger Screens */}
                <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
                    <Nav className="me-auto m-auto">
                        <Nav.Link href="/destinations/micro-adventure" className="text-white">Micro-Adventure</Nav.Link>
                        <Nav.Link href="/all-places" className="text-white">Explore</Nav.Link>
                        <Nav.Link href="/destination/group-bookings" className="text-white">Group Booking</Nav.Link>
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
                        backgroundColor: 'rgba(0, 0, 66, 0.6)',
                        width: '250px',
                        height: '100vh',
                        overflowY: 'auto',
                        padding: '1em',
                        zIndex: '1050',
                    }}
                >
                    <Nav className="flex-column">
                        <Nav.Link href="/destinations/micro-adventure" className="text-white">Micro-Adventure</Nav.Link>
                        <Nav.Link href="/all-places" className="text-white">Explore</Nav.Link>
                        <Nav.Link href="/destination/group-bookings" className="text-white">Group Booking</Nav.Link>
                        <Nav.Link href="/about" className="text-white">About</Nav.Link>
                        <NavDropdown.Divider />

                        <NavDropdown title="Local Experience" className="text-white" >
                        <NavDropdown.Item href="/destinations/culinary-tours">Culinary Tours</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/farmers-markets">Farmers' Markets</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/nature-hikes">Nature Hikes</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/art-workshops">Art Workshops</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/cultural-festivals">Cultural Festivals</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/historical-tours">Historical Tours</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/community-service">Community Service</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/outdoor-adventures">Outdoor Adventures</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/wellness-retreats">Wellness Retreats</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/local-sports">Local Sports Events</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/music-dance">Music and Dance Classes</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/artisan-tours">Local Artisan Tours</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/photo-walks">Themed Photo Walks</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/wildlife-spotting">Wildlife Spotting</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/cultural-exchange">Cultural Exchange</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/storytelling">Storytelling Nights</NavDropdown.Item>
                        <NavDropdown.Item href="/destinations/vr-2">Virtual Realty</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Craft Your Tour" className="text-white">
                            <NavDropdown.Item href="/itineraries/relaxation">Relax & Rejuvenate</NavDropdown.Item>
                            <NavDropdown.Item href="/itineraries/family">Family Fun</NavDropdown.Item>
                            <NavDropdown.Item href="/itineraries/exploration">Explore the Unknown</NavDropdown.Item>
                            <NavDropdown.Item href="/itineraries/sustainable">Sustainable Travels</NavDropdown.Item>
                            <NavDropdown.Item href="/itineraries/custom">Custom Itineraries</NavDropdown.Item>
                            <NavDropdown.Item href="/itineraries/custom">Tour & Learn</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </div>
            )}
        </Container>
    );
}
