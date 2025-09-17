import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
    showcaseContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '10px',
    },
    filterBarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        gap: '8px',
        position: 'relative',
    },
    filterBar: {
        display: 'flex',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        justifyContent: 'flex-start',
        gap: '12px',
        padding: '8px 0',
        flexGrow: 1,
        cursor: 'grab',
        userSelect: 'none',
        WebkitOverflowScrolling: 'touch',
    },
    filterBarDragging: {
        cursor: 'grabbing',
    },
    navButton: {
        background: 'rgba(255, 255, 255, 0.95)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        color: '#64748b',
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
        flexShrink: 0,
        zIndex: 2,
        backdropFilter: 'blur(4px)',
        '&:hover': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.25), 0 2px 6px rgba(102, 126, 234, 0.15)',
            transform: 'translateY(-1px)'
        }
    },
    navButtonSmall: {
        width: '32px',
        height: '32px',
        fontSize: '12px',
    },
    filterBtn: {
        padding: '6px 14px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontWeight: '500',
        color: '#334155',
        textDecoration: 'none',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        fontSize: '13px',
        backdropFilter: 'blur(4px)',
        '&:hover': {
            background: 'rgba(241, 245, 249, 0.9)',
            transform: 'translateY(-1px)',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)'
        }
    },
    filterBtnSmall: {
        padding: '5px 12px',
        fontSize: '12px',
    },
    filterBtnActive: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 3px 12px rgba(102, 126, 234, 0.25)',
        transform: 'translateY(-1px)',
        '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 4px 14px rgba(102, 126, 234, 0.35)'
        }
    },
};

const CardShowcase = () => {
    const categories = [
        { key: "adventure_outdoors", title: "Adventure & Outdoors", link: "/destinations/micro-adventure", icon: "🗺️" },
        { key: "food_culinary", title: "Food & Culinary", link: "/destinations/culinary-tours", icon: "🥘" },
        { key: "culture_community", title: "Culture & Community", link: "/destinations/community-service", icon: "🏛️" },
        { key: "arts_creativity", title: "Arts & Creativity", link: "/destinations/art-workshops", icon: "🎨" },
        { key: "history_heritage", title: "History & Heritage", link: "/destinations/historical-tours", icon: "📜" },
        { key: "wellness_lifestyle", title: "Wellness & Lifestyle", link: "/destinations/wellness-retreats", icon: "🌿" },
        { key: "sports_entertainment", title: "Sports & Entertainment", link: "/destinations/local-sports", icon: "⚽" },
        { key: "farmers_markets", title: "Farmers’ Markets", link: "/destinations/farmers-markets", icon: "🌿" },

    ];

    const [activeCategory, setActiveCategory] = useState(categories[0].key);
    const filterBarRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragged, setDragged] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Check screen size on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Improved touch and mouse event handlers
    const handleDragStart = (e) => {
        setIsDragging(true);
        setDragged(false);
        
        // Handle both mouse and touch events
        const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        
        setStartX(clientX - filterBarRef.current.offsetLeft);
        setScrollLeft(filterBarRef.current.scrollLeft);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        
        // Prevent default to avoid text selection and other browser behaviors
        e.preventDefault();
        
        // Handle both mouse and touch events
        const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        
        const x = clientX - filterBarRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        
        if (Math.abs(walk) > 5) {
            setDragged(true);
        }
        
        filterBarRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollCategories = (direction) => {
        if (filterBarRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            filterBarRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleLinkClick = (e, categoryKey) => {
        if (dragged) {
            e.preventDefault();
        } else {
            setActiveCategory(categoryKey);
        }
        setDragged(false);
    };

    return (
        <Container style={styles.showcaseContainer}>
            <div style={styles.filterBarContainer}>
                <button
                    onClick={() => scrollCategories('left')}
                    style={{ ...styles.navButton, ...(isMobile ? styles.navButtonSmall : {}) }}
                    aria-label="Scroll left"
                >
                    &larr;
                </button>
                <div
                    style={{ ...styles.filterBar, ...(isDragging ? styles.filterBarDragging : {}) }}
                    ref={filterBarRef}
                    onMouseDown={handleDragStart}
                    onMouseLeave={handleDragEnd}
                    onMouseUp={handleDragEnd}
                    onMouseMove={handleDragMove}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {categories.map((category) => (
                        <Link
                            key={category.key}
                            to={category.link}
                            onClick={(e) => handleLinkClick(e, category.key)}
                            style={{
                                ...styles.filterBtn,
                                ...(isMobile ? styles.filterBtnSmall : {}),
                                ...(activeCategory === category.key ? styles.filterBtnActive : {}),
                            }}
                        >
                            {category.title}
                        </Link>
                    ))}
                </div>
                <button
                    onClick={() => scrollCategories('right')}
                    style={{ ...styles.navButton, ...(isMobile ? styles.navButtonSmall : {}) }}
                    aria-label="Scroll right"
                >
                    &rarr;
                </button>
            </div>
        </Container>
    );
};

export default CardShowcase;