import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Talks.css';
import { BASE_URL } from '../config/config';
import moment from 'moment';
import defaultProfile from '../../assets/images/default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faImages, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

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
    const [showAllLikers, setShowAllLikers] = useState({}); // State to track which liker lists are open
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [hoveredPost, setHoveredPost] = useState(null);
    const [commentErrors, setCommentErrors] = useState({}); // New state for comment-specific errors

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/blogposts/`);
            if (!response.ok) throw new Error('Failed to fetch posts');

            const data = await response.json();

            const initialLikes = {};
            data.forEach(post => {
                initialLikes[post.id] = post.like_count || 0;
            });

            setPosts(data);
            setLikes(initialLikes);
            setHasMore(data.length > 0);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        const token = getAuthToken();
        if (!token) {
            setError('Please log in to share your travel story. The world is waiting to hear from you!');
            return;
        }

        if (storyContent.trim() === '') {
            setError('Your story matters! Please write something before posting.');
            return;
        }

        setIsPosting(true);
        const formData = new FormData();
        formData.append('content', storyContent);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/blogposts/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            const responseText = await response.text();
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
            setSelectedImage(null);
            setError(null);
        } catch (error) {
            setError(error.message || 'An unknown error occurred');
        } finally {
            setIsPosting(false);
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
            setError('Join our community of travelers to show your appreciation! Please log in first.');
            return;
        }

        if (likes[`${postId}-animate`]) {
            return;
        }

        // Optimistic UI update: increase like count immediately
        setLikes(prev => ({
            ...prev,
            [postId]: (prev[postId] || 0) + 1,
            [`${postId}-animate`]: true
        }));

        try {
            const response = await fetch(`${BASE_URL}/api/likes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ post: postId }),
            });

            if (!response.ok) {
                // Revert optimistic update on failure
                setLikes(prev => ({
                    ...prev,
                    [postId]: (prev[postId] || 0) - 1,
                    [`${postId}-animate`]: false
                }));
                throw new Error('Failed to like the post. Please try again.');
            }

            const result = await response.json();
            if (result.status === 'unliked') {
                // The post was unliked, so revert the count correctly
                setLikes(prev => ({
                    ...prev,
                    [postId]: (prev[postId] || 0) - 2,
                    [`${postId}-animate`]: false
                }));
            } else {
                // If it was a successful like, update the state with the actual data
                // This is a crucial part to get the full list of likers.
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId ? { ...post, likes: result.likes } : post
                    )
                );
            }
        } catch (error) {
            setError(error.message);
            setLikes(prev => ({ ...prev, [`${postId}-animate`]: false }));
        }

        setTimeout(() => {
            setLikes(prev => ({ ...prev, [`${postId}-animate`]: false }));
        }, 1000);
    };

    const handleCommentSubmit = async (postId) => {
        const commentText = commentInputs[postId]?.text;
        if (!commentText) {
            setCommentErrors(prev => ({ ...prev, [postId]: 'Comment cannot be empty.' }));
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setCommentErrors(prev => ({ ...prev, [postId]: 'Please log in to comment.' }));
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ post: postId, text: commentText }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.detail || "Failed to submit comment.";
                throw new Error(errorMessage);
            }

            const newComment = await response.json();

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            comments: [...(post.comments || []), newComment]
                        }
                        : post
                )
            );

            setCommentInputs(prev => ({ ...prev, [postId]: { text: '' } }));
            setCommentErrors(prev => ({ ...prev, [postId]: null }));
        } catch (error) {
            setCommentErrors(prev => ({ ...prev, [postId]: error.message }));
            console.error('Comment submission failed:', error);
        }
    };

    const toggleExpandedComments = (postId) => {
        setExpandedComments(prev => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const toggleLikersList = (postId) => {
        setShowAllLikers(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleCommentChange = (postId, text) => {
        setCommentInputs(prev => ({ ...prev, [postId]: { text } }));
        // Clear error message as user starts typing
        setCommentErrors(prev => ({ ...prev, [postId]: null }));
    };

    const deletePost = async (postId) => {
        const token = getAuthToken();
        if (!token) {
            setError('Please log in first');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/blogposts/${postId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${token}`,
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
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            deletePost(postId);
        }
        toggleMenu(null);
    };

    return (
        <div className="slack-container">
            <div className="slack-layout">
                {/* Sidebar Column */}
                <div className="slack-sidebar">
                    <div className="slack-sidebar-header">
                        <h1>Travel Stories</h1>
                        <p>Share your adventures</p>
                    </div>

                    <div className="slack-sidebar-content">
                        <div className="sidebar-card">
                            <h3>Join Our Community</h3>
                            <p>Connect with fellow travelers</p>
                            <div className="social-icons">
                                <a href="https://facebook.com" className="social-icon fb">
                                    <FaFacebookF />
                                </a>
                                <a href="https://twitter.com" className="social-icon tw">
                                    <FaXTwitter />
                                </a>
                                <a href="https://instagram.com" className="social-icon ig">
                                    <FaInstagram />
                                </a>
                                <a href="https://linkedin.com" className="social-icon li">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                            <div className="cta-section">
                                <p>Get exclusive travel tips</p>
                                <button className="slack-btn slack-btn-primary">Subscribe</button>
                            </div>
                        </div>
                        <div className="sidebar-card">
                            <div className="quote-content">
                                <p className="quote-text">
                                    "Traveling – it leaves you speechless, then turns you into a storyteller."
                                </p>
                                <p className="quote-author">– Ibn Battuta</p>
                            </div>
                        </div>
                        <div className="sidebar-card">
                            <h4>Community Stats</h4>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">{posts.length}+</div>
                                    <div className="stat-label">Stories</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">
                                        {Object.values(likes).reduce((a, b) => a + b, 0)}+
                                    </div>
                                    <div className="stat-label">Likes</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">
                                        {posts.reduce((acc, post) => acc + (post.comments?.length || 0), 0)}+
                                    </div>
                                    <div className="stat-label">Comments</div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-card">
                            <h4>Have Questions?</h4>
                            <p>Our team is here to help</p>
                            <a href="/contact">
                                <button className="slack-btn slack-btn-outline">Contact Us</button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content Column */}
                <div className="slack-main">
                    <div className="slack-header">
                        <h2>Travel Stories</h2>
                        <p>Share your adventures. Inspire others. Connect with fellow travelers.</p>
                    </div>

                    {/* Create Post Card */}
                    <div className="slack-post-card-post mx-1 create-post-card">
                        <div className="post-author">
                            <img
                                src={posts.length > 0 && posts[0].author?.profile?.profile_image || defaultProfile}
                                alt="Profile"
                                className="profile-image"
                            />
                            <div className="author-info">
                                <div className="post-content">
                                    <div
                                        className="input-container"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <input
                                            value={storyContent}
                                            onChange={(e) => setStoryContent(e.target.value)}
                                            placeholder="What's inspiring you today? ✈️🌍"
                                            className="slack-textarea"
                                            rows="1"
                                            style={{
                                                flex: 1,
                                                resize: "none",
                                                padding: "6px 8px",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                        <div
                                            className="post-actions"
                                            style={{ display: "flex", alignItems: "center", gap: "6px" }}
                                        >
                                            <label
                                                className="slack-btn slack-btn-icon"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <input
                                                    type="file"
                                                    id="imageInput"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    style={{ display: "none" }}
                                                />
                                                <FontAwesomeIcon icon={faImages} />
                                            </label>
                                            <button
                                                onClick={createPost}
                                                className={`slack-btn slack-btn-primary ${isPosting ? "posting" : ""}`}
                                                disabled={isPosting}
                                                style={{
                                                    border: "none",
                                                    background: "#4A154B",
                                                    color: "#fff",
                                                    padding: "6px 10px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                        </div>
                                    </div>
                                    {selectedImage && (
                                        <div className="image-preview">
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Preview"
                                                className="preview-image"
                                            />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="remove-image-btn"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="slack-alert error">
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="slack-loader">
                            <div className="loader-spinner"></div>
                            <p>Loading inspiring stories...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && posts.length === 0 && (
                        <div className="slack-empty-state">
                            <div className="empty-icon">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                            </div>
                            <h3>No stories yet</h3>
                            <p>Be the first to share your travel adventure!</p>
                            <button
                                className="slack-btn slack-btn-primary"
                                onClick={() => document.querySelector('.slack-textarea').focus()}
                            >
                                Share Your Story
                            </button>
                        </div>
                    )}

                    {/* Posts List */}
                    <div className="posts-list">
                        {posts.map((post) => (
                            <div
                                className={`slack-post-card ${hoveredPost === post.id ? 'hovered' : ''}`}
                                key={post.id}
                                onMouseEnter={() => setHoveredPost(post.id)}
                                onMouseLeave={() => setHoveredPost(null)}
                            >
                                <div className="post-header">
                                    <div className="post-author">
                                        <img
                                            src={post.author?.profile?.profile_image || defaultProfile}
                                            alt="Author"
                                            className="profile-image"
                                        />
                                        <div className="author-info">
                                            <h5><Link className='author-name' to={`/user/${post.author?.id}`}>{post.author_full_name}</Link></h5>
                                            <p>{moment(post.created_at).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="post-menu">
                                        <div className="post-options">
                                            {isMenuOpen === post.id && (
                                                <div className="slack-dropdown-menu">
                                                    <button onClick={() => handleDeleteConfirm(post.id)}>Delete Post</button>
                                                </div>
                                            )}
                                            <FontAwesomeIcon
                                                icon={faEllipsisV}
                                                onClick={() => toggleMenu(post.id)}
                                                className="menu-icon"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="post-content">
                                    <p>{post.content}</p>
                                    {post.image && (
                                        <div className="post-image-container">
                                            <img
                                                src={post.image}
                                                alt="Post"
                                                className="post-image"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="post-footer">
                                    <div className="engagement-section">
                                        <button
                                            className={`slack-btn slack-btn-icon ${likes[`${post.id}-animate`] ? 'animate' : ''}`}
                                            onClick={() => handleLike(post.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={post.is_liked ? solidThumbsUp : regularThumbsUp}
                                            />
                                            <span className={`like-count ${post.is_liked ? 'active' : ''}`}>
                                                {likes[post.id] || 0}
                                            </span>
                                        </button>
                                        <button
                                            className="slack-btn slack-btn-icon"
                                            onClick={() => toggleExpandedComments(post.id)}
                                        >
                                            <FontAwesomeIcon icon={faComment} />
                                            <span>{(post.comments || []).length}</span>
                                        </button>
                                    </div>
                                    
                                    {/* Corrected Likers Section: only show when there are likes */}
                                    {post.likes && post.likes.length > 0 && (
                                        <div className="likers-list-container">
                                            <div
                                                className="likers-list-toggle"
                                                onClick={() => toggleLikersList(post.id)}
                                            >
                                                <i className="fa-solid fa-eye eye-icon"></i>
                                                <span>View likes</span>
                                            </div>
                                            {showAllLikers[post.id] && (
                                                <ul className="likers-list-expanded">
                                                    {post.likes.map((liker, index) => (
                                                        <li key={index} className="liker-item">
                                                            <Link to={`/user/${liker.user?.id}`}>
                                                                <img
                                                                    src={liker.user?.profile?.profile_image || defaultProfile}
                                                                    alt={liker.user?.username}
                                                                    className="liker-profile-image"
                                                                    title={liker.user?.username}
                                                                />
                                                                <span>{liker.user?.username} {liker.user?.first_name}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}

                                    {/* Comments Section */}
                                    {expandedComments[post.id] && (
                                        <div className="comments-section mx-2">
                                            <div className="comments-list">
                                                {post.comments && post.comments.length > 0 ? (
                                                    (expandedComments[post.id] ? post.comments : post.comments.slice(0, 3)).map((comment, index) => (
                                                        <div className="comment" key={index}>
                                                            <Link to={`/user/${comment.user?.id}`}>
                                                                <img
                                                                    src={comment.user?.profile?.profile_image || defaultProfile}
                                                                    alt="Commenter Profile"
                                                                    className="comment-profile-image"
                                                                />
                                                            </Link>
                                                            <div className="comment-text-container">
                                                                <Link to={`/user/${comment.user?.id}`} className="comment-username">
                                                                    {comment.user?.username}
                                                                </Link>
                                                                <span className="comment-text">{comment.text}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                                                )}
                                                {post.comments.length > 3 && !expandedComments[post.id] && (
                                                    <button onClick={() => toggleExpandedComments(post.id)} className="show-more-comments">
                                                        View all {post.comments.length} comments
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {/* Comment Error Message */}
                                            {commentErrors[post.id] && (
                                                <div className="slack-alert error">
                                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                                    <span>{commentErrors[post.id]}</span>
                                                </div>
                                            )}

                                            <div className="add-comment">
                                                <input
                                                    type="text"
                                                    value={commentInputs[post.id]?.text || ''}
                                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                                    placeholder="Add a comment..."
                                                    className="slack-comment-input"
                                                />
                                                <button onClick={() => handleCommentSubmit(post.id)} className="slack-btn slack-btn-primary">
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPosts;