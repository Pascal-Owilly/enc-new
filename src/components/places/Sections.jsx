import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap
import { Link } from 'react-router-dom'; // Import Link for navigation
import BookingButton from '../bookings/BookingButton'; // Adjust path if needed
import { BASE_URL } from '../config/config'; // Your API base URL
import './Sections.css'; // Make sure your CSS file is properly linked

const CardShowcase = () => {
  const categories = [
    { key: "virtual_reality", title: "Virtual Reality", link: "/destinations/vr-2" },
    { key: "culinary_tours", title: "Culinary Dishes", link: "/destinations/culinary-tours" },
    { key: "micro_adventure", title: "Micro-Adventure", link: "/destinations/micro-adventure" },
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

      // Initialize pagination
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
      <div className="card-showcase-container">
        <section className="showcase-intro">
          <h1>Discover Amazing Experiences</h1>
          <p>Explore immersive, exciting, and enriching adventures tailored for you.</p>
        </section>

        {loading ? (
          <div className="loader">Loading experiences...</div>
        ) : (
          categories.map(({ key, title, link }) => {
            const data = placesByCategory[key] || [];
            const page = currentPage[key] || 1;
            const paginated = getPaginatedData(data, page);
            const totalPages = Math.ceil(data.length / itemsPerPage);

            return (
              <section key={key} className="category-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div className="category-header">
                  <h2>{title}</h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                    width: "100%",
                    padding: "0 10px",
                    boxSizing: "border-box",
                  }}
                >
                  {paginated.map((place, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                        width: "100%",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                    >
                      <div
                        style={{
                          position: "relative",
                          height: "250px",
                          backgroundImage: `url(${BASE_URL}${place.cover_image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* Dark Overlay for Text Contrast */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            borderRadius: "12px",
                          }}
                        />
                      </div>
                      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <h3 style={{ fontSize: "20px", margin: 0 }}>{place.name || place.title}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img
                              src="https://img.icons8.com/ios/50/000000/marker.png"
                              alt="Location Icon"
                              style={{ width: "18px", height: "18px" }}
                            />
                            <span style={{ fontSize: "14px", color: "#666" }}>{place.location}</span>
                          </div>
                          <p style={{ fontSize: "18px", color: "#333", fontWeight: "bold" }}>
                            KES {place.price ? `${place.price}` : "Price upon request"}
                          </p>
                        </div>
                        <BookingButton place={place} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  <Link to={link} className="see-all-btn" style={{
                    textDecoration: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    width: '200px',
                    fontWeight: 'bold',
                    display: 'block',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontSize: '14px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}>
                    See All
                  </Link>
                </div>

                {totalPages > 1 && (
                  <div className="pagination-controls">
                    <button
                      onClick={() => handlePageChange(key, -1)}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    <span>{page} / {totalPages}</span>
                    <button
                      onClick={() => handlePageChange(key, 1)}
                      disabled={page === totalPages}
                    >
                      Next
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
