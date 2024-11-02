import React from 'react';
import { Navbar, Nav, Button, Container, Form, FormControl, InputGroup, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';

import {
    faSearch,
    faUser,
    faSignInAlt,
    faSignOutAlt,
    faLeaf,
    faUsers,
    faSuitcase,
    faHandsHelping,
    faCalendarAlt,
    faMapMarkerAlt,
    faInfoCircle,
    faComments,
    faQuestionCircle,
    faUtensils,         // Culinary Tours
    faShoppingBasket,   // Farmers' Markets
    faTree,            // Nature Hikes
    faPaintBrush,      // Art Workshops
    faMusic,           // Cultural Festivals
    faLandmark,        // Historical Tours
    faMountain,        // Outdoor Adventures
    faSpa,             // Wellness Retreats
    faFutbol,          // Local Sports Events
    faTheaterMasks,    // Music and Dance Classes
    faHammer,          // Local Artisan Tours
    faCameraRetro,     // Themed Photo Walks
    faPaw,             // Wildlife Spotting
    faExchangeAlt,     // Cultural Exchange
    faBook,
    faMagic,
    faHeart,
    faHiking,
    faMap
} from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/logo/enceptics.jpg';

// Colors
const secondaryColor = '#1c85e8';
const primaryColor = '#1c85e8';
const dropdownBackgroundColor = '#1c85e8';

export default function NavbarComponent() {
    return (
        <Navbar expand="lg" variant="dark" style={{ backgroundColor: primaryColor }} fixed="top">
            <Container fluid>
            <Navbar.Brand 
    href="/" 
    style={{ 
        fontWeight: 'bold', 
        fontSize: '20px', 
        fontFamily: 'Caladea, sans-serif' 
    }}
>
    <span 
        style={{ 
            fontSize: '24px', 
            color: '#007BFF' 
        }} 
        className="rotating-disk-icon"  // Apply the disk rotation class here
    >
        🌍
    </span> 
    Enceptics
</Navbar.Brand>



                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto m-auto">
                      

                        {/* Dropdowns for experiences */}
                        <NavDropdown
                            title="Local Experiences"
                            id="nav-dropdown-destinations"
                            className="text-white"
                            style={{ color: 'white', marginLeft: '', fontSize:'12px' }}
                            menuVariant="light"
                        >
                            <div style={{ padding: '', maxWidth: '300px' }}>
                                {[
                                    { icon: faUtensils, text: "Culinary Tours", link: "/destinations/culinary-tours" },
                                    { icon: faShoppingBasket, text: "Farmers' Markets", link: "/destinations/farmers-markets" },
                                    { icon: faTree, text: "Nature Hikes", link: "/destinations/nature-hikes" },
                                    { icon: faPaintBrush, text: "Art Workshops", link: "/destinations/art-workshops" },
                                    { icon: faMusic, text: "Cultural Festivals", link: "/destinations/cultural-festivals" },
                                    { icon: faLandmark, text: "Historical Tours", link: "/destinations/historical-tours" },
                                    { icon: faHandsHelping, text: "Community Service", link: "/destinations/community-service" },
                                    { icon: faMountain, text: "Outdoor Adventures", link: "/destinations/outdoor-adventures" },
                                    { icon: faSpa, text: "Wellness Retreats", link: "/destinations/wellness-retreats" },
                                    { icon: faFutbol, text: "Local Sports Events", link: "/destinations/local-sports" },
                                    { icon: faTheaterMasks, text: "Music and Dance Classes", link: "/destinations/music-dance" },
                                    { icon: faHammer, text: "Local Artisan Tours", link: "/destinations/artisan-tours" },
                                    { icon: faCameraRetro, text: "Themed Photo Walks", link: "/destinations/photo-walks" },
                                    { icon: faPaw, text: "Wildlife Spotting", link: "/destinations/wildlife-spotting" },
                                    { icon: faExchangeAlt, text: "Cultural Exchange", link: "/destinations/cultural-exchange" },
                                    { icon: faBook, text: "Storytelling Nights", link: "/destinations/storytelling" }
                                ].map((item, index) => (
                                    <NavDropdown.Item href={item.link} key={index}>
                                        <FontAwesomeIcon icon={item.icon} /> {item.text}
                                    </NavDropdown.Item>
                                ))}
                            </div>
                        </NavDropdown>

                        <NavDropdown
                            title="Craft Your Tour"
                            id="nav-dropdown-personalized-itineraries"
                            className="text-white"
                            style={{ color: 'white', marginLeft: '1rem' }}
                            menuVariant="light"
                        >
                            <div className="d-flex flex-column">
                                <div className="px-3">
                                    <NavDropdown.Item href="/itineraries/relaxation">
                                        <FontAwesomeIcon icon={faSpa} /> Relax & Rejuvenate
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/itineraries/family">
                                        <FontAwesomeIcon icon={faUsers} /> Family Fun
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/itineraries/exploration">
                                        <FontAwesomeIcon icon={faMap} /> Explore the Unknown
                                    </NavDropdown.Item>
                                </div>
                                <div className="px-3">
                                    <NavDropdown.Item href="/itineraries/sustainable">
                                        <FontAwesomeIcon icon={faLeaf} /> Sustainable Travels
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/itineraries/custom">
                                        <FontAwesomeIcon icon={faMagic} /> Custom Itineraries
                                    </NavDropdown.Item>
                                </div>
                            </div>
                        </NavDropdown>

                        {/* Additional Links */}
                        <Nav.Link href="/destinations/micro-adventure" className="text-white" >
                            <FontAwesomeIcon icon={faLeaf} style={{ color: '#FFC107' }} /> Micro-Adventure
                        </Nav.Link>
                        <Nav.Link href="/all-places" className="text-white">
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#FFC107' }} /> Explore Places
                        </Nav.Link>
                        <Nav.Link href="/destination/group-bookings" className="text-white">
                            <FontAwesomeIcon icon={faUsers} style={{ color: '#FFC107' }} /> Group Bookings
                        </Nav.Link>
                        <Nav.Link href="/about" className="text-white">
                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#FFC107' }} /> About Us
                        </Nav.Link>
                        <Nav.Link href="/talks" className="text-white">
                            <FontAwesomeIcon icon={faComments} style={{ color: '#FFC107' }} /> Chat
                        </Nav.Link>
                        
                    </Nav>

                    <Nav>
                        <NavDropdown title="User" id="basic-nav-dropdown" className="text-white">
                            <NavDropdown.Item href="/auth/profile">
                                <FontAwesomeIcon icon={faUser} /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/auth/logout">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/auth/login" className="text-white">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Nav.Link>

                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
