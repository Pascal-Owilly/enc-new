import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';  // Import the BASE_URL from your config
import './Talks2.css';  // Import the CSS file for styling

// BlogPost Component
const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const [followers, setFollowers] = useState([]);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/blogposts/`, {
        headers: { Authorization: `Token ${authToken}` },
      });
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const createBlogPost = async () => {
    if (!newPostContent.trim()) return;
    try {
      await axios.post(
        `${BASE_URL}api/blogposts/`,
        { content: newPostContent },
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setNewPostContent('');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  const createComment = async (postId) => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `${BASE_URL}api/comments/`,
        { post: postId, text: newComment },
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setNewComment('');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const likePost = async (postId) => {
    try {
      await axios.post(
        `${BASE_URL}api/likes/`,
        { post: postId },
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setLikedPosts((prevLikes) => [...prevLikes, postId]);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const followUser = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}api/followers/`,
        { user_to_follow: userId },
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setFollowers((prevFollowers) => [...prevFollowers, userId]);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <div className="blog-container">
      <div>
        <h2>Create a New Blog Post</h2>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your blog post..."
        />
        <button onClick={createBlogPost}>Post</button>
      </div>

      <div>
        <h2>Blog Posts</h2>
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post">
            <h3>{post.author.username}</h3>
            <p>{post.content}</p>

            <div>
              {likedPosts.includes(post.id) ? (
                <span>Liked</span>
              ) : (
                <button className="like-button" onClick={() => likePost(post.id)}>Like</button>
              )}

              <button className="follow-button" onClick={() => followUser(post.author.id)}>Follow</button>
            </div>

            <div className="comments">
              <h4>Comments</h4>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => createComment(post.id)}>Add Comment</button>

              {post.comments &&
                post.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="user-avatar"></div> {/* Placeholder for avatar */}
                    <p>{comment.user.username}: {comment.text}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
