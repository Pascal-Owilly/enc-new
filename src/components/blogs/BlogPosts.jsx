import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/config";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/blogs/`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h5 style={styles.title}>🌍 Travel Blog</h5>

      {loading ? (
        <div style={styles.loader}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div style={styles.cardGrid}>
          {posts.map((post) => (
            <div key={post.id} style={styles.cardWrapper}>
              <div style={styles.card}>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    style={styles.cardImage}
                  />
                )}
                <div style={styles.cardBody}>
                  <h5 style={styles.cardTitle}>{post.title}</h5>
                  <p style={styles.cardDate}>
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString()
                      : "No date available"}
                  </p>
                  <p style={styles.cardText}>
                    {post.excerpt || post.content.substring(0, 120) + "..."}
                  </p>
                  <a href={`/blogs/${post.id}`} style={styles.readMoreButton}>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Enhanced Inline Styles
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "80vh",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
    color: "#343a40",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  cardWrapper: {
    flex: "1 1 300px",
    maxWidth: "400px",
    minWidth: "300px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "transform 0.2s",
  },
  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#495057",
  },
  cardDate: {
    color: "#6c757d",
    fontSize: "14px",
  },
  cardText: {
    fontSize: "16px",
    lineHeight: "1.6",
    flexGrow: 1,
  },
  readMoreButton: {
    display: "block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease-in-out, transform 0.2s",
  },
};

// Hover effects
const hoverStyles = {
  card: {
    transform: "scale(1.02)",
  },
  readMoreButton: {
    backgroundColor: "#0056b3",
  },
};

// Apply hover effects using JavaScript or CSS-in-JS approach
const applyHoverEffects = (card) => {
  card.onmouseover = () => {
    Object.assign(card.style, hoverStyles.card);
  };
  card.onmouseout = () => {
    Object.assign(card.style, { transform: "scale(1)" });
  };
};

export default Blog;