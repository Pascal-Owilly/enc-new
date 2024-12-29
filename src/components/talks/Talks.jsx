import React, { useState, useEffect } from 'react';
import './Talks.css';
import { BASE_URL } from '../config/config';
import moment from 'moment';
import defaultProfile from '../../assets/images/default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}blogposts/`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      const postsWithComments = data.map(post => ({
        ...post,
        comments: post.comments || [],
      }));
      setPosts(postsWithComments);
      setHasMore(postsWithComments.length > 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const postData = { content: storyContent };
    try {
      const response = await fetch(`${BASE_URL}blogposts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      setPosts(prev => [newPost, ...prev]);
      setStoryContent('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}likes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    try {
      const response = await fetch(`${BASE_URL}comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    try {
      const response = await fetch(`${BASE_URL}blogpost/${postId}/`, {
        method: 'DELETE',
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
      <div className="chat-container ">
        <div className="row">
          <div className="col-md-8 ">
            <h1 className="text-dark travel-stories text-left">Travel Stories</h1>
            <hr />
            <div className="input-group blogpost-input m-auto" style={{ width: '95%' }}>
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
                placeholder="What's your story?"
                required
                className="story-input"
                style={{ borderRadius: '30px', fontFamily: 'Caladea' }}
              />
              <label className="custom-file-upload what-card-bt m-2">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <span className="custom-button mx-1">
                  <FontAwesomeIcon icon={faImages} style={{ color: '#999999' }} />
                  &nbsp;<span style={{ fontSize: '10px', color: '#999999', fontFamily: 'Caladea' }}>Photo</span>
                </span>
              </label>
              <div>
                <button
                  type="button"
                  onClick={createPost}
                  style={{
                    zIndex: 0,
                    fontSize: '12px',
                    fontFamily: 'Caladea',
                    width: '50px'
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            <div className="chat-content">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-header">
                    <img src={post.image} alt="Author" className="author-image" />
                    <div className="author-details">
                      <h5 className="text-secondary" style={{ fontFamily: 'Caladea' }}>{post.author_full_name}</h5>
                      <p className="text-secondary">{moment(post.created_at).fromNow()}</p>
                    </div>
                  </div>
                  <div className="post-content">
                    <p className="text-dark" style={{ fontFamily: 'Caladea' }}>{post.content}</p>
                    {post.image ? (
                      <img src={post.image} alt="Post" className="post-image " />
                    ) : null}
                  </div>
                  <div className="post-actions">
                    <div className="like-icon" onClick={() => handleLike(post.id)}>
                      <FontAwesomeIcon icon={likes[post.id] ? solidThumbsUp : regularThumbsUp} /> {likes[post.id] || 0}
                    </div>
                    <div className="comment-icon" onClick={() => handleCommentToggle(post.id)}>
                      <FontAwesomeIcon icon={faComment} /> {post.comments.length}
                    </div>
                    <div className="more-icon" onClick={() => toggleMenu(post.id)}>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                    {isMenuOpen === post.id && (
                     <div className="menu">
                     <button className='btn blog-delete-btn btn-sm btn-outline-danger m-1' onClick={() => deletePost(post.id)}>Delete</button>
                     <button className='btn blog-archive-btn btn-sm btn-outline-success m-1' onClick={() => archiveComment(post.id)}>Archive</button>
                   </div>
                    )}
                  </div>

                  {commentInputs[post.id] && (
                <div className="comment-section ">
                <div className="input-group p-2">
                  <input
                    type="text"
                    value={commentInputs[post.id]?.text || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    placeholder="Add a comment..."
                    className="form-control comment-input"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="mb-3"
                    type="button"
                    style={{fontSize: '15px'}}
                  >
                    Post
                  </button>
                </div>
              </div>
                  )}

                  <div className="comments-list" style={{ fontFamily: 'Caladea' }}>
                    {(post.comments || []).slice(0, expandedComments[post.id] ? post.comments.length : 5).map((comment) => (
                      <div className="comment" key={comment.id}>
                        <div className="comment-content">
                          <span className="comment-author">{comment.author}</span>
                          <p className="comment-text">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {post.comments.length > 5 && (
                    <div className="read-more" onClick={() => toggleExpandedComments(post.id)}>
                      <FontAwesomeIcon icon={expandedComments[post.id] ? 'fa-chevron-up' : 'fa-chevron-down'} />
                      {expandedComments[post.id] ? " Show Less" : " Read More"}
                    </div>
                  )}
                </div>
              ))}
              {loading && <div className="loading-spinner">Loading...</div>}
              {!hasMore && <div className="no-more-posts">No more posts</div>}
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
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;