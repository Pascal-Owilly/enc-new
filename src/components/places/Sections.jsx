import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingButton from '../bookings/BookingButton';
import { BASE_URL } from '../config/config';
import virtual_world from './virtual_world.png';
import culinary_tours from './culinary_tours.png';
import thrill from './thrill.png';
import nature_escapes from './thrill.png';
import cultural_tours from './cultural_tours.png';
import sports_fun from './sports_fun.png';
import frmers_markets from './frmers_markets.png';
import art_creativity from './art_creativity.png';
import history from './history.png';
import wellness from './wellness.png';

// Define the styles as a JavaScript object
const styles = {
    root: {
        '--primary': '#3498db',
        '--secondary': '#2ecc71',
        '--accent': '#9b59b6',
        '--dark': '#2c3e50',
        '--light': '#ecf0f1',
        '--gradient': 'linear-gradient(135deg, #3498db, #2ecc71)',
        '--shadow': '0 10px 30px rgba(0, 0, 0, 0.1)',
        '--card-radius': '12px',
    },

    emptyContainer: {
        textAlign: "center",
        padding: "30px 0",
        color: "#7f8c8d",
    },
    emptyTitle: {
        marginTop: "15px",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#2c3e50",
    },
    emptySubtitle: {
        fontSize: "0.9rem",
        color: "#95a5a6",
    },

    showcaseContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '10px',
    },
    categorySection: {
        marginBottom: '30px',
        position: 'relative',
    },
    categoryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '2px solid rgba(52, 152, 219, 0.2)',
    },
    categoryTitle: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '700',
        fontSize: '1.3rem',
        color: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
    },
    categoryIcon: {
        width: '30px',
        height: '30px',
        marginRight: '10px',
    },
    categoryDescription: {
        fontSize: "0.9rem",
        color: "#555",
        margin: "5px 0 15px 0",
        fontStyle: "italic",
    },
    itemCount: {
        fontSize: '0.9rem',
        background: 'linear-gradient(135deg, #3498db, #2ecc71)',
        color: 'white',
        padding: '2px 10px',
        borderRadius: '20px',
        marginLeft: '10px',
    },
    seeAllLink: {
        background: 'linear-gradient(135deg, #3498db, #2ecc71)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
            color: 'white',
        },
    },
    seeAllLinkBottom: {
        display: 'block',
        textAlign: 'right',
        marginTop: '15px',
        marginBottom: '10px',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '15px',
    },
    placeCard: {
        height: '320px',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
        },
    },
    cardOverlay: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%)',
        opacity: '0.85',
        transition: 'opacity 0.3s ease',
        '&:hover': {
            opacity: '0.7',
        },
    },
    cardContent: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: '20px',
        color: 'white',
        zIndex: '10',
    },
    cardBadge: {
        background: '#9b59b6',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '16px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-block',
        marginBottom: '12px',
    },
    cardPlaceName: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '8px',
        lineHeight: '1.3',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
        fontSize: '0.85rem',
    },
    cardLocation: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    cardPrice: {
        fontWeight: '700',
        color: '#2ecc71',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    cardBookingBtnWrapper: {
        textAlign: 'center',
    },
    paginationControls: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
    },
    paginationBtn: {
        borderRadius: '20px',
        padding: '6px 16px',
        fontWeight: '500',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease',
        border: '1px solid #3498db',
        color: '#3498db',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        '&:hover:not(:disabled)': {
            background: '#3498db',
            color: 'white',
        },
        '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
        },
    },
    paginationInfo: {
        fontWeight: '500',
        color: '#2c3e50',
        fontSize: '0.9rem',
    },
    spinnerBorder: {
        width: '2.5rem',
        height: '2.5rem',
        color: '#3498db',
        borderWidth: '0.25em',
    },
    loadingText: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        marginTop: '12px',
    },
    loadingContainer: {
        textAlign: 'center',
        padding: '40px 0',
    },

    // Mobile-specific styles (for horizontal scrolling)
    mobileScrollContainer: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        padding: '8px 0',
        gap: '12px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    mobileCard: {
        flexShrink: 0,
        width: '80%',
        maxWidth: '300px',
    },

    // New styles for peek effect
    sectionContainer: {
        position: 'relative',
        marginBottom: '40px',
    },
    peekNextSection: {
        position: 'absolute',
        bottom: '-30px',
        left: '0',
        width: '100%',
        height: '40px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0.9,

    },
    peekText: {
        fontSize: '0.9rem',
        color: '#3498db',
        fontWeight: '600',
    },
    compactView: {
        marginBottom: '20px',
    },
};

const CardShowcase = () => {
    const categories = [
      { 
        key: "adventure_outdoors", 
        title: "Adventure & Outdoors", 
        link: "/destinations/micro-adventure", 
        icon: thrill,
        description: "Thrill-seekers, get ready—epic hikes, hidden trails, and adrenaline-packed escapes await!" 
      },
      { 
        key: "food_culinary", 
        title: "Food & Culinary", 
        link: "/destinations/culinary-tours", 
        icon: culinary_tours,
        description: "Taste the world one bite at a time—flavors, spices, and unforgettable food journeys." 
      },
      { 
        key: "culture_community", 
        title: "Culture & Community", 
        link: "/destinations/community-service", 
        icon: cultural_tours,
        description: "Connect with locals, discover traditions, and feel the heartbeat of every community." 
      },
      { 
        key: "arts_creativity", 
        title: "Arts & Creativity", 
        link: "/destinations/art-workshops", 
        icon: art_creativity,
        description: "Unleash your inner artist—paint, sculpt, and create experiences worth framing." 
      },
      { 
        key: "history_heritage", 
        title: "History & Heritage", 
        link: "/destinations/historical-tours", 
        icon: history,
        description: "Step back in time—explore ancient wonders and the stories that shaped our world." 
      },
      { 
        key: "wellness_lifestyle", 
        title: "Wellness & Lifestyle", 
        link: "/destinations/wellness-retreats", 
        icon: wellness,
        description: "Recharge your body and soul with yoga, retreats, and mindful escapes." 
      },
      { 
        key: "farmers_markets", 
        title: "Farmers' Markets", 
        link: "/destinations/farmers-markets", 
        icon: cultural_tours,
        description: "Fresh, local, and vibrant—wander stalls full of flavors and handmade treasures." 
      },
      { 
        key: "sports_entertainment", 
        title: "Sports & Entertainment", 
        link: "/destinations/local-sports", 
        icon: sports_fun,
        description: "From stadium cheers to local games—experience the thrill of sports up close." 
      },
    ];

    const [placesByCategory, setPlacesByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const itemsPerPage = 4; // Increased from 3 to 4 for more compact view
    const maxItems = 8; // Increased from 6 to 8

    const categoryRefs = useRef({});

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let results = {};
            try {
                for (const { key } of categories) {
                    const res = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${key}`);
                    if (!res.ok) {
                        console.error(`Error fetching ${key}: HTTP ${res.status}`);
                        results[key] = [];
                        continue;
                    }
                    const data = await res.json();
                    results[key] = data.slice(0, maxItems);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setPlacesByCategory(results);
                const initialPages = {};
                categories.forEach(({ key }) => (initialPages[key] = 1));
                setCurrentPage(initialPages);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (categoryKey, direction) => {
        setCurrentPage(prevPages => {
            const newPages = { ...prevPages };
            newPages[categoryKey] = prevPages[categoryKey] + direction;
            return newPages;
        });
        if (categoryRefs.current[categoryKey]) {
            categoryRefs.current[categoryKey].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getPaginatedData = (data, page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    return (
        <Container style={styles.showcaseContainer}>
            {loading ? (
                <div style={styles.loadingContainer}>
                    <div
                        className="spinner-border text-primary"
                        style={styles.spinnerBorder}
                        role="status"
                    >
                        <span className="visually-hidden">Loading experiences...</span>
                    </div>
                    <p style={styles.loadingText}>Fetching exciting adventures for you...</p>
                </div>
            ) : (
                categories.map(({ key, title, link, icon, description }, index) => {
                    const data = placesByCategory[key] || [];
                    const page = currentPage[key] || 1;
                    const paginated = getPaginatedData(data, page);
                    const totalPages = Math.ceil(data.length / itemsPerPage);
                    
                    // Check if this is not the last category
                    const showPeek = index < categories.length - 1;

                    return (
                        <div key={key} style={styles.sectionContainer}>
                            <section
                                ref={(el) => (categoryRefs.current[key] = el)}
                                style={{...styles.categorySection, ...styles.compactView}}
                            >
                                <div style={styles.categoryHeader}>
                                    <h5 style={styles.categoryTitle}>
                                        <img
                                            src={icon}
                                            alt={`${title} icon`}
                                            style={styles.categoryIcon}
                                        />
                                        {title}
                                        <span style={styles.itemCount}>({data.length}+)</span>
                                    </h5>
                                </div>
                                <p style={styles.categoryDescription}>{description}</p>

                                {data.length === 0 ? (
                                    <div style={styles.emptyContainer}>
                                        <AlertCircle size={36} color="#3498db" />
                                        <p style={styles.emptyTitle}>
                                            No experiences available in {title}.
                                        </p>
                                        <p style={styles.emptySubtitle}>
                                            Check back later for new adventures!
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {isMobile ? (
                                            <div style={styles.mobileScrollContainer}>
                                                {data.map((place, index) => (
                                                    <Link
                                                        to={`/place/${place.id}`}
                                                        key={index}
                                                        style={{
                                                            ...styles.placeCard,
                                                            ...styles.mobileCard,
                                                            backgroundImage: `url(${place.cover_image})`,
                                                        }}
                                                    >
                                                        <div style={styles.cardOverlay} />
                                                        <div style={styles.cardContent}>
                                                            <div style={styles.cardBadge}>
                                                                {place.category || title}
                                                            </div>
                                                            <h3 style={styles.cardPlaceName}>{place.name}</h3>
                                                            <div style={styles.cardInfo}>
                                                                <span style={styles.cardLocation}>
                                                                    📍 {place.location}
                                                                </span>
                                                            </div>
                                                            <div style={styles.cardBookingBtnWrapper}>
                                                                <BookingButton place={place} variant="primary" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <div style={styles.cardGrid}>
                                                    {paginated.map((place, index) => (
                                                        <Link
                                                            to={`/place/${place.id}`}
                                                            key={index}
                                                            style={{
                                                                ...styles.placeCard,
                                                                backgroundImage: `url(${place.cover_image})`,
                                                            }}
                                                        >
                                                            <div style={styles.cardOverlay} />
                                                            <div style={styles.cardContent}>
                                                                <div style={styles.cardBadge}>
                                                                    {place.category || title}
                                                                </div>
                                                                <h3 style={styles.cardPlaceName}>
                                                                    {place.name || place.title}
                                                                </h3>
                                                                <div style={styles.cardInfo}>
                                                                    <span style={styles.cardLocation}>
                                                                        📍 {place.location}
                                                                    </span>
                                                                </div>
                                                                <div style={styles.cardBookingBtnWrapper}>
                                                                    <BookingButton place={place} variant="primary" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <div style={styles.seeAllLinkBottom}>
                                    <Link to={link} style={styles.seeAllLink}>
                                        See All &rarr;
                                    </Link>
                                </div>

                                {!isMobile && data.length > itemsPerPage && (
                                    <div style={styles.paginationControls}>
                                        <button
                                            onClick={() => handlePageChange(key, -1)}
                                            disabled={page === 1}
                                            style={styles.paginationBtn}
                                        >
                                            <ChevronLeft size={16} /> Previous
                                        </button>
                                        <span style={styles.paginationInfo}>
                                            Page <strong>{page}</strong> of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(key, 1)}
                                            disabled={page === totalPages}
                                            style={styles.paginationBtn}
                                        >
                                            Next <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </section>
                            
                            {/* Peek effect for the next section */}
                            {showPeek && (
                                <div  style={styles.peekNextSection}>
                                    <span className='mt-2' style={styles.peekText}>
                                        More categories below ↓
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </Container>
    );
};

export default CardShowcase;