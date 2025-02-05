import React, { useState, useEffect } from 'react';
import './Talks.css';
import { BASE_URL } from '../config/config';
import moment from 'moment';
import defaultProfile from '../../assets/images/default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import * as jwt_decode from 'jwt-decode';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [storyContent, setStoryContent] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to get the token from localStorage or sessionStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const fetchPosts = async () => {
    setLoading(true); // Start loading when the data fetch begins
    
    try {
      // Fetching blog posts from the backend API
      const response = await fetch(`${BASE_URL}api/blogposts/`);
      
      // If the response is not successful (status outside 200-299), throw an error
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      // Parse the response as JSON
      const data = await response.json();
      
      // Add a 'comments' field to each post, defaulting to an empty array if none exists
      const postsWithComments = data.map(post => ({
        ...post,
        comments: post.comments || [], // If no comments, default to empty array
      }));
  
      // Update state with posts containing comments
      setPosts(postsWithComments);
  
      // Check if there are posts to display (if there are, set hasMore to true)
      setHasMore(postsWithComments.length > 0);
      
    } catch (error) {
      // If an error occurs during fetch, store the error message
      setError(error.message);
    } finally {
      // Once the fetch is complete (success or failure), stop loading
      setLoading(false);
    }
  };
  

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    console.log("Token from localStorage:", token);  // Add this log
    return token;
  };
  
  const createPost = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Please log in first. We’re excited to see what you’ll share!');
      return;
    }
  
    const formData = new FormData();
    formData.append('content', storyContent);  // Include the content in the form data
    if (selectedImage) {
      formData.append('image', selectedImage);  // Include the image if selected
    }
  
    try {
      const response = await fetch(`${BASE_URL}api/blogposts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,  // Pass the token in the authorization header
        },
        body: formData,  // Send the form data
      });
  
      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Body:', responseText);
      console.log('Request Payload:', formData);
  
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData?.detail || 'Failed to create post';
        } catch {
          errorMessage = responseText || 'Failed to create post';
        }
        throw new Error(errorMessage);
      }
  
      const newPost = JSON.parse(responseText);
      setPosts((prev) => [newPost, ...prev]);
      setStoryContent('');
      setSelectedImage(null);  // Reset image after post creation
    } catch (error) {
      console.error('Post Creation Error:', error);
      setError(error.message || 'An unknown error occurred');
    }
  };
  
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  

  const handleLike = async (postId) => {
    const token = getAuthToken();
    if (!token) {
      setError('Please log in first. We’re excited to see expressing interest!');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}api/likes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`, // Add token to the request header
        },
        body: JSON.stringify({ post: postId }),
      });
      if (!response.ok) throw new Error('Failed to like the post');
      setLikes(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCommentToggle = (postId) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: { text: prev[postId]?.text || '' },
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = commentInputs[postId]?.text;
    if (!commentText) return;
    
    const token = getAuthToken();
    if (!token) {
      setError('Please log in first. We’re excited to see what you’ll share!');
      return;

    }

    try {
      const response = await fetch(`${BASE_URL}api/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`, // Add token to the request header
        },
        body: JSON.stringify({ post: postId, text: commentText }),
      });
      if (!response.ok) throw new Error('Failed to submit comment');
      const newComment = await response.json();
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
      setCommentInputs(prev => ({ ...prev, [postId]: { text: '' } }));
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleExpandedComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs(prev => ({ ...prev, [postId]: { text } }));
  };

  const deletePost = async (postId) => {
    const token = getAuthToken();
    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}api/blogposts/${postId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`, // Add token to the request header
        },
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleMenu = (postId) => {
    setIsMenuOpen(isMenuOpen === postId ? null : postId);
  };

  const handleDeleteConfirm = (postId) => {
    deletePost(postId);
    toggleMenu(null); // Close the menu after deletion
  };

  return (
<div className="container-fluid talks-container">
  <div className="chat-container">
    <div className="row">
      <div className="col-md-8">
        <h1 className="text-dark travel-stories text-left">Travel Stories</h1>
        <hr />
        <div className="input-group blogpost-input m-auto" style={{ width: '97%' }}>
  <img
    src={defaultProfile}
    style={{
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      objectFit: 'cover',
    }}
    alt="Profile Pic"
  />
  &nbsp;&nbsp;&nbsp;
  <input
    value={storyContent}
    onChange={(e) => setStoryContent(e.target.value)}
    placeholder="What's your travel story?"
    required
    className="story-input"
    style={{ borderRadius: '30px', fontFamily: 'Caladea' }}
  />
  <label htmlFor="imageInput" className="custom-file-upload what-card-bt m-2">
    <input
      type="file"
      id="imageInput"
      accept="image/*"
      onChange={handleFileChange} // Handle file change event
      style={{ display: 'none' }}
    />
    <span className="custom-button mx-1">
      <FontAwesomeIcon icon={faImages} className="icon-style" />
      <span style={{ fontSize: '10px', color: '#999999', fontFamily: 'Caladea' }}>
        Photo
      </span>
    </span>
  </label>

  <div>
    <button
      type="button"
      onClick={() => {
        // Validate content before posting
        if (storyContent.trim() === '') {
          alert('Please write something before posting.');
          return; // Prevent posting
        }
        createPost(); // Proceed with post creation if content is valid
      }}
      style={{
        zIndex: 0,
        fontSize: '12px',
        fontFamily: 'Caladea',
        width: '50px',
      }}
    >
      Post
    </button>
  </div>
</div>

        {loading && (
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {error && <p className="text-center">{error}</p>}
        {!loading && posts.length === 0 && (
          <div className="no-posts-message text-center">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ fontSize: '48px', color: '#999999', marginBottom: '10px' }}
            />
            <p className="text-secondary" style={{ fontFamily: 'Caladea', fontSize: '18px' }}>
              No blog posts to display. Start by creating one!
            </p>
          </div>
        )}
  <div className="chat-content">
  {Array.isArray(posts) && posts.length > 0 ? (
    posts.map((post) => (
      <div className="post-card" key={post.id}>
        <div className="post-header">
          <img src={post.image} alt="Author" className="author-image" />
          <div className="author-details">
            <h5 className="text-secondary" style={{ fontFamily: 'verdana', fontSize: '14px' }}>
              {post.author_full_name}
            </h5>
            <p style={{ fontFamily: 'verdana', fontSize: '12px' }} className="text-secondary">
              {moment(post.created_at).fromNow()}
            </p>
          </div>
        </div>
        <div className="post-content">
          <p className="text-dark" style={{ fontFamily: 'Caladea' }}>{post.content}</p>
          {post.image ? <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} /> : null}
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 mx-2 border-top bg-light">
          <div className="likes-section d-flex align-items-center">
            <button className="btn btn-link p-0" onClick={() => handleLike(post.id)}>
              <FontAwesomeIcon
                icon={likes[post.id] ? solidThumbsUp : regularThumbsUp}
                className="like-icon"
              />
            </button>
            <span className="ms-1">{likes[post.id] || 0} </span>
          </div>

          <div className="comments-section d-flex align-items-center">
            <button className="btn btn-link p-0" onClick={() => toggleExpandedComments(post.id)}>
              <FontAwesomeIcon icon={faComment} />
            </button>
            <span className="ms-1">{(post.comments || []).length}</span>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-sm btn-link p-0 dropdown-toggle"
              onClick={() => toggleMenu(post.id)}
              aria-expanded={isMenuOpen === post.id ? 'true' : 'false'}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {isMenuOpen === post.id && (
              <div
                className="dropdown-menu-end show"
                style={{ position: 'relative' }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => handleDeleteConfirm(post.id)}
                >
                  Delete
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleDeleteConfirm(post.id)}
                >
                  Archive
                </button>
              </div>
            )}
          </div>
        </div>

        {expandedComments[post.id] && (
          <div className="comments-container">
            {post.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="comment-text">
                  <p className="text-dark" style={{ fontFamily: 'Caladea' }}>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
            <textarea
              value={commentInputs[post.id]?.text || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}
              placeholder="Write a comment..."
              maxLength={200}
            />
            <button
              onClick={() => handleCommentSubmit(post.id)}
              className="comment-submit-button btn btn-sm btn-primary"
            >
              Comment
            </button>
          </div>
        )}
      </div>
    ))
  ) : (
    <p>No posts available</p>
  )}
</div>

      </div>
      <div className="col-md-4">
      <div className="social-media-section my-4 mt-4">
            <h5 className="text-center">Follow Us on Social Media</h5>
            <div className="text-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon mx-2" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="social-icon mx-2" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon mx-2" />
              </a>  
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="social-icon mx-2" />
              </a>
            </div>
            <p className="text-center mt-3">Stay connected with us for the latest updates and offers!</p>
            <p className="text-center mt-3">
              <a href="/newsletter" className="text-primary">Subscribe to our Newsletter</a>
            </p>
            <div className="quote-section text-center mt-3">
              <blockquote>
                "Traveling opens your heart, broadens your mind, and fills your life with stories to tell." 
                <footer>- Anonymous</footer>
              </blockquote>
            </div>
            <p className="text-center mt-3">Contact us: <a href="mailto:info@example.com">info@example.com</a></p>
            <div className="text-center mt-4">
              <a href="/contact" className="btn btn-primary text-light">Get In Touch</a>
            </div>
          </div>      </div>
    </div>
  </div>
</div>

  );
};

export default BlogPosts;
