import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingButton from '../bookings/BookingButton';
import { BASE_URL } from '../config/config';

const CardShowcase = () => {
  const categories = [
    { key: "virtual_reality", title: "Virtual Reality", link: "/destinations/vr-2", icon: "🧭" },
    { key: "culinary_tours", title: "Culinary Tours", link: "/destinations/culinary-tours", icon: "🍽️" },
    { key: "micro_adventure", title: "Micro-Adventure", link: "/destinations/micro-adventure", icon: "⛰️" },
  ];

  const [placesByCategory, setPlacesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({});
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      let results = {};
      await Promise.all(
        categories.map(async ({ key }) => {
          try {
            const res = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${key}`);
            const data = await res.json();
            results[key] = data;
          } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            results[key] = [];
          }
        })
      );
      setPlacesByCategory(results);
      const initialPages = {};
      categories.forEach(({ key }) => (initialPages[key] = 1));
      setCurrentPage(initialPages);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePageChange = (categoryKey, direction) => {
    setCurrentPage((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey] + direction,
    }));
  };

  const getPaginatedData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  return (
    <Container>
      {/* Modern Header with Math/Vacation Theme */}
      <div className="card-showcase-container">
        <section className="showcase-intro" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            background: 'linear-gradient(45deg, #4A90E2, #FEB47B)', 
            WebkitBackgroundClip: 'text', 
            color: 'transparent',
            marginBottom: '16px',
          }}>
            Escape the Equation: ∞ Adventures Await!
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666', 
            maxWidth: '700px', 
            margin: '0 auto',
            position: 'relative',
          }}>
            <span style={{ 
              position: 'absolute', 
              left: '-30px', 
              fontSize: '1.5rem', 
              opacity: 0.7 
            }}>∫</span>
            Discover immersive experiences where <strong>Sun + Sand = Joy</strong>
            <span style={{ 
              position: 'absolute', 
              right: '-30px', 
              fontSize: '1.5rem', 
              opacity: 0.7 
            }}>∆</span>
          </p>
        </section>

        {loading ? (
          <div className="loader">Loading experiences...</div>
        ) : (
          categories.map(({ key, title, link, icon }) => {
            const data = placesByCategory[key] || [];
            const page = currentPage[key] || 1;
            const paginated = getPaginatedData(data, page);
            const totalPages = Math.ceil(data.length / itemsPerPage);

            return (
              <section 
                key={key} 
                className="category-section" 
                style={{ 
                  marginBottom: '60px',
                  position: 'relative',
                }}
              >
                {/* Category Header with Icon */}
                <div className="category-header" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '24px',
                }}>
                  <h2 style={{ 
                    fontSize: '1.8rem', 
                    margin: 0, 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <span style={{ 
                      fontSize: '1.5rem', 
                      marginRight: '10px' 
                    }}>{icon}</span>
                    {title}
                  </h2>
                  <span style={{ 
                    fontSize: '1rem', 
                    color: '#4A90E2', 
                    fontWeight: '600',
                    marginLeft: 'auto',
                  }}>
                    {data.length}+ Options
                  </span>
                </div>

                {/* Grid Layout with Hover Effects */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  width: "100%",
                  padding: "0 10px",
                }}>
                  {paginated.map((place, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s ease",
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                      }}
                    >
                      {/* Image with Gradient Overlay */}
                      <div
                        style={{
                          position: "relative",
                          height: "250px",
                          backgroundImage: `url(${BASE_URL}${place.cover_image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                          }}
                        />
                      </div>

                      {/* Card Content */}
                      <div style={{ 
                        padding: "20px", 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "12px" 
                      }}>
                        <h3 style={{ 
                          fontSize: "1.3rem", 
                          margin: 0, 
                          color: '#222',
                          fontWeight: '700',
                        }}>
                          {place.name || place.title}
                        </h3>
                        <div style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center" 
                        }}>
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px" 
                          }}>
                            <img
                              src="https://img.icons8.com/ios-filled/50/4A90E2/marker.png"
                              alt="Location"
                              style={{ width: "16px", height: "16px", opacity: 0.8 }}
                            />
                            <span style={{ 
                              fontSize: "0.9rem", 
                              color: "#666" 
                            }}>
                              {place.location}
                            </span>
                          </div>
                          <p style={{ 
                            fontSize: "1.1rem", 
                            color: "#FF7E5F", 
                            fontWeight: "bold",
                            margin: 0,
                          }}>
                            KES {place.price ? `${place.price}` : "—"}
                          </p>
                        </div>
                        <BookingButton 
                          place={place} 
                          style={{ 
                            marginTop: '10px',
                            alignSelf: 'flex-start',
                          }} 
                        />
                      </div>

                      {/* Math-Themed Decorative Corner */}
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#4A90E2',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      }}>
                        {index % 3 === 0 ? '∞' : index % 3 === 1 ? '∆' : '≈'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* "See All" Button with Modern Styling */}
                <div style={{ 
                  marginTop: '30px', 
                  display: 'flex', 
                  justifyContent: 'center',
                }}>
                  <Link 
                    to={link} 
                    className="see-all-btn" 
                    style={{
                      textDecoration: 'none',
                      background: 'linear-gradient(45deg, #4A90E2, #2D87D6)',
                      color: '#fff',
                      padding: '12px 24px',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
                      transition: 'all 0.3s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      ':hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)',
                      }
                    }}
                  >
                    Explore All {title}
                    <span style={{ fontSize: '1rem' }}>→</span>
                  </Link>
                </div>

                {/* Pagination Controls (Minimalist) */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '20px',
                    marginTop: '20px',
                  }}>
                    <button
                      onClick={() => handlePageChange(key, -1)}
                      disabled={page === 1}
                      style={{
                        background: page === 1 ? '#eee' : '#4A90E2',
                        color: page === 1 ? '#999' : 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        cursor: page === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      ← Previous
                    </button>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontFamily: 'monospace',
                      color: '#555',
                    }}>
                      Page <strong style={{ margin: '0 5px' }}>{page}</strong> of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(key, 1)}
                      disabled={page === totalPages}
                      style={{
                        background: page === totalPages ? '#eee' : '#4A90E2',
                        color: page === totalPages ? '#999' : 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        cursor: page === totalPages ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>
    </Container>
  );
};

export default CardShowcase;