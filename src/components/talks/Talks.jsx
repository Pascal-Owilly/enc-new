import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Talks.css';
import { BASE_URL } from '../config/config';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmojis, setChosenEmojis] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}blogposts/`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setHasMore(data.length > 0);
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
    console.log(`Post ${id} liked`);
  };

  const handleComment = (id, comment) => {
    console.log(`Comment on post ${id}: ${comment}`);
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
              <h2>{post.author_full_name}</h2>
            </div>
          </div>

          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <div className="post-actions">
            <button onClick={() => handleLike(post.id)} className="like-btn">
              Like
            </button>
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
            
            {/* Emoji Reaction Section */}
            <button
              onClick={() => setEmojiPickerVisible((prev) => !prev)}
              className="emoji-picker-btn"
            >
              {chosenEmojis[post.id] ? chosenEmojis[post.id] : ''}
            </button>
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
