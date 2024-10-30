import React from 'react';
import { Navbar, Nav, Button, Container, Form, FormControl, InputGroup, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faUser, 
    faSignInAlt, 
    faSignOutAlt, 
    faLeaf, faUsers, 
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
const primaryColor = '#000042';
const dropdownBackgroundColor = '#1c85e8';


export default function NavbarComponent() {
    const spinningStyle = {
        display: 'inline-block',
        animation: 'spin 2s linear infinite',
        '@keyframes spin': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            },
        },
    };

    return (
        <Navbar expand="lg" variant="dark" style={{ backgroundColor: primaryColor }} fixed="top">
            <Container fluid>
            <Navbar.Brand 
                href="/" 
                style={{ 
                    fontWeight: 'bold', 
                    fontSize: '24px', 
                    fontFamily: 'Caladea, sans-serif' 
                }}
            >
                
                🌍 Enceptics
            </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto m-auto">
                        <InputGroup className="d-flex mx-5" style={{ width: '250px' }}>
                            <FormControl
                                className='text-muted'
                                type="text"
                                placeholder="Search places..."
                                style={{
                                    borderLeft: 'none',
                                    border: '1px solid lightgray',
                                    borderRadius: '10px 10px 0 0',
                                    background:'#d9d9d9',
                                }}
                            />
                            <InputGroup.Text style={{ backgroundColor: '#000042', borderRight: 'none', color: '#ccc' }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup> 
                        
                        <span style={{margnRight:'2rem'}}></span>

                        {/* Dropdowns for new features */}
                        <Nav className="me-auto m-auto">
                        <div className="d-flex flex-row">
                        <div className="px-3">          
                        <NavDropdown
                            title="Local Experiences"
                            id="nav-dropdown-destinations"
                            className="text-white"
                            style={{ color: 'white', marginLeft: '1rem' }}
                            menuVariant="light"
                        >
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '1rem' }}>
                                <div style={{ flex: '1 1 calc(33.333% - 1rem)', margin: '0.5rem' }}>
                                    <NavDropdown.Item href="/destinations/culinary-tours">
                                        <FontAwesomeIcon icon={faUtensils} /> Culinary Tours
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/farmers-markets">
                                        <FontAwesomeIcon icon={faShoppingBasket} /> Farmers' Markets
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/nature-hikes">
                                        <FontAwesomeIcon icon={faTree} /> Nature Hikes
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/art-workshops">
                                        <FontAwesomeIcon icon={faPaintBrush} /> Art Workshops
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/cultural-festivals">
                                        <FontAwesomeIcon icon={faMusic} /> Cultural Festivals
                                    </NavDropdown.Item>
                                </div>
                                <div style={{ flex: '1 1 calc(33.333% - 1rem)', margin: '0.5rem' }}>
                                    <NavDropdown.Item href="/destinations/historical-tours">
                                        <FontAwesomeIcon icon={faLandmark} /> Historical Tours
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/community-service">
                                        <FontAwesomeIcon icon={faHandsHelping} /> Community Service
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/outdoor-adventures">
                                        <FontAwesomeIcon icon={faMountain} /> Outdoor Adventures
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/wellness-retreats">
                                        <FontAwesomeIcon icon={faSpa} /> Wellness Retreats
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/local-sports">
                                        <FontAwesomeIcon icon={faFutbol} /> Local Sports Events
                                    </NavDropdown.Item>
                                </div>
                                <div style={{ flex: '1 1 calc(33.333% - 1rem)', margin: '0.5rem' }}>
                                    <NavDropdown.Item href="/destinations/music-dance">
                                        <FontAwesomeIcon icon={faTheaterMasks} /> Music and Dance Classes
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/artisan-tours">
                                        <FontAwesomeIcon icon={faHammer} /> Local Artisan Tours
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/photo-walks">
                                        <FontAwesomeIcon icon={faCameraRetro} /> Themed Photo Walks
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/wildlife-spotting">
                                        <FontAwesomeIcon icon={faPaw} /> Wildlife Spotting
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/cultural-exchange">
                                        <FontAwesomeIcon icon={faExchangeAlt} /> Cultural Exchange
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/destinations/storytelling">
                                        <FontAwesomeIcon icon={faBook} /> Storytelling Nights
                                    </NavDropdown.Item>
                                </div>
                            </div>
                        </NavDropdown>
                        </div>
                        </div>
                    </Nav>


                    <NavDropdown
    title="Personalized Itineraries"
    id="nav-dropdown-personalized-itineraries"
    className="text-white"
    style={{ color: 'white', marginLeft: '1rem' }}
    menuVariant="light"
>
    <div className="d-flex flex-row">
        <div className="px-3">
            <NavDropdown.Item href="/itineraries/adventure">
                <FontAwesomeIcon icon={faHiking} /> Adventure Awaits
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/cultural">
                <FontAwesomeIcon icon={faLandmark} /> Cultural Journeys
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/culinary">
                <FontAwesomeIcon icon={faUtensils} /> Culinary Delights
            </NavDropdown.Item>
        </div>
        <div className="px-3">
            <NavDropdown.Item href="/itineraries/relaxation">
                <FontAwesomeIcon icon={faSpa} /> Relax & Rejuvenate
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/family">
                <FontAwesomeIcon icon={faUsers} /> Family Fun
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/romantic">
                <FontAwesomeIcon icon={faHeart} /> Romantic Escapes
            </NavDropdown.Item>
        </div>
        <div className="px-3">
            <NavDropdown.Item href="/itineraries/exploration">
                <FontAwesomeIcon icon={faMap} /> Explore the Unknown
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/sustainable">
                <FontAwesomeIcon icon={faLeaf} /> Sustainable Travels
            </NavDropdown.Item>
            <NavDropdown.Item href="/itineraries/custom">
                <FontAwesomeIcon icon={faMagic} /> Custom Itineraries
            </NavDropdown.Item>
        </div>
    </div>
</NavDropdown>


                        <span className='dot'>.</span>
                        <Nav.Link href="/about" className="text-white">
                    <FontAwesomeIcon icon={faLeaf} style={{ color: '#FFC107' }} /> Micro-Adventure
                    </Nav.Link>
                    <span><span className="dot"></span></span>

                    <Nav.Link href="/all-places" className="text-white">
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#FFC107' }} /> Explore Places
                    </Nav.Link>
                    <span><span className="dot"></span></span>
                    <Nav.Link href="/group-bookings" className="text-white">
                        <FontAwesomeIcon icon={faUsers} style={{ color: '#FFC107' }} /> Group Bookings
                    </Nav.Link>
                    
                    <Nav.Link href="/about" className="text-white">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#FFC107' }} /> About Us
                    </Nav.Link>
                    <span><span className="dot"></span></span>

                    <Nav.Link href="/talks" className="text-white">
                        <FontAwesomeIcon icon={faComments} style={{ color: '#FFC107' }} /> Chat
                    </Nav.Link>
                    <span><span className="dot"></span></span>

                    <Nav.Link href="/faqs" className="text-white">
                        <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#FFC107' }} /> FAQs
                    </Nav.Link>

                    </Nav>
                    <Nav>
                        {/* Dropdown Example */}
                        <NavDropdown title="User" id="basic-nav-dropdown" className="text-white">
                            <NavDropdown.Item href="/profile">
                                <FontAwesomeIcon icon={faUser} /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/settings">
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/login" className="text-white">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
