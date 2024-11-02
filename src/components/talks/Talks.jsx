import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Talks.css';
import { BASE_URL } from '../config/config';
import moment from 'moment';
import { FaRegComment, FaRegThumbsUp, FaRegSmile } from 'react-icons/fa'; // Example icons

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState({});
  const [likes, setLikes] = useState({}); // To store like counts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}blogposts/?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        
        // Check if there are new posts
        if (data.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setHasMore(data.length > 0);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      loading ||
      !hasMore
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1, // Increment like count
    }));
  };

  const handleComment = (id, comment) => {
    console.log(`Comment on post ${id}: ${comment}`);
    // Additional logic to handle comments can be implemented here
  };

  const onEmojiClick = (postId, event, emojiObject) => {
    setChosenEmojis((prevEmojis) => ({
      ...prevEmojis,
      [postId]: emojiObject.emoji,
    }));
    setEmojiPickerVisible(false);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="blog-posts-container">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-header">
            <img src={post.image} alt="Author" className="author-image" />
            <div className="author-details">
              <h2 className="text-secondary">{post.author_full_name}</h2>
              <p className="text-secondary text-muted">
                {moment(post.created_at).fromNow()}
              </p>
            </div>
          </div>

          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <div className="post-actions">
            <div className="reaction-buttons">
              <button onClick={() => handleLike(post.id)} className="like-btn">
                <FaRegThumbsUp />
                {likes[post.id] || 0} {/* Display like count */}
              </button>
              <button
                onClick={() => setEmojiPickerVisible((prev) => !prev)}
                className="emoji-picker-btn"
              >
                <FaRegSmile />
              </button>
              <button
                onClick={() => handleComment(post.id, 'Your comment here')} // Placeholder
                className="comment-btn"
              >
                <FaRegComment />
                {/* Here you could implement logic to count comments */}
              </button>
            </div>

            <input
              type="text"
              placeholder="Add a comment..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment(post.id, e.target.value);
                  e.target.value = '';
                }
              }}
              className="comment-input"
            />

            {emojiPickerVisible && (
              <EmojiPicker
                onEmojiClick={(event, emojiObject) =>
                  onEmojiClick(post.id, event, emojiObject)
                }
              />
            )}
          </div>
        </div>
      ))}
      {loading && <div className="loading-spinner">Loading...</div>}
      {!hasMore && <div className="no-more-posts">No more posts</div>}
    </div>
  );
};

export default BlogPosts;
