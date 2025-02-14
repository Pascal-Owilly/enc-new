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
      <h1 className='text-dark' style={styles.title}>🌍 Travel Blog</h1>

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
                  <Link to={`/blogs/${post.id}`} style={styles.readMoreButton}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Inline Styles (Prevents Squeezing & Ensures Responsiveness)
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "80vh",
  },
  title: {
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
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
    justifyContent: "center", // ✅ Center aligns cards
    gap: "20px", // ✅ Adds spacing
  },
  cardWrapper: {
    flex: "1 1 300px", // ✅ Ensures cards don't squeeze
    maxWidth: "400px", // ✅ Prevents excessive widening
    minWidth: "300px", // ✅ Ensures minimum readable width
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
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
    flexGrow: 1, // ✅ Keeps button at bottom
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  cardDate: {
    color: "gray",
    fontSize: "14px",
  },
  cardText: {
    fontSize: "16px",
    lineHeight: "1.6",
    flexGrow: 1, // ✅ Pushes button down
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
    transition: "background-color 0.3s ease-in-out",
  },
};

// ✅ Override hover styles
styles.readMoreButton[":hover"] = {
  backgroundColor: "#0056b3",
};

export default Blog;
