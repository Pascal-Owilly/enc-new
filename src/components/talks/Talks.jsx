import React, { useState, useEffect } from 'react';
import './Talks.css';
import { BASE_URL } from '../config/config';
import moment from 'moment';
import { FaRegComment, FaRegThumbsUp, FaRegSmile } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import defaultProfle from '../../assets/images/default.svg';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [likes, setLikes] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const [storyContent, setStoryContent] = useState('');
  const [storyImage, setStoryImage] = useState(null);
  const [profile, setProfile] = useState('');



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}blogposts/?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
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

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  const toggleCommentInput = (id) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [id]: !prevInputs[id],
    }));
  };

  const handleCommentSubmit = (id) => {
    const comment = commentInputs[id]?.text;
    if (comment) {
      console.log(`Comment on post ${id}: ${comment}`);
      setCommentInputs((prevInputs) => ({
        ...prevInputs,
        [id]: { ...prevInputs[id], text: '' },
      }));
    }
  };

  const handleCommentChange = (id, text) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [id]: { ...prevInputs[id], text },
    }));
  };

  return (
    <div className="container-fluid">
      <div className="chat-container ">
        <div className="row">
          <div className="col-md-8">
          <h1 
  className="text-dark travel-stories text-left"
 
>
  Travel Stories
</h1>
        <hr />

        <div className="input-group blogpost-input m-auto" style={{width:'95%'}}>
  {/* {profile && profile.profile_pic && ( */}
    <img
      src={`` || defaultProfle}
      style={{
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        objectFit: 'cover', // To maintain the aspect ratio of the profile picture

      }}
      alt="Profile Pic"
    />
  {/* )} */}
  &nbsp;&nbsp;&nbsp;
  <input
    value={storyContent}
    onChange={(e) => setStoryContent(e.target.value)}
    placeholder="What's your story?"
    required
    className="story-input"
    style={{borderRadius:'30px', fontFamily:'Caladea'}}
    
  />
  <label className="custom-file-uploa what-card-btn m-2">
    <input
      type="file"
      accept="image/*"
      // onChange={handleImageChange}
      style={{ display: 'none' }}
    />
    <span className="custom-button mx-1">
      <FontAwesomeIcon icon={faImages} style={{color:'#999999'}} />&nbsp;<span style={{fontSize:'10px', color:'#999999', fontFamily:'Caladea'}}>Photo</span>
      <br />
    </span>
  </label>
  <div className="input-group-append">
    <button
      className="btn btn-outline-primary btn-sm" // Changed button style to btn-primary
      type="button"
      // onClick={createNewPost}
      style={
      {
        zIndex: 0,
        fontSize:'12px',
        fontFamily:'Caladea',
        width:'50px'
      }
      }
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
                  <h5 className="text-secondary" style={{fontFamily:'Caladea'}}>{post.author_full_name}</h5>
                  <p className="text-secondary">
                    {moment(post.created_at).fromNow()}
                  </p>
                </div>
              </div>
              <div className="post-content">
                <p className="text-dark" style={{fontFamily:'Caladea'}}>{post.content}</p>
                <img src={post.image} alt="Post" style={{ width: '100%' }} />
              </div>
              <div className="post-actions">
                <div className="reaction-buttons" style={{fontFamily:'Caladea'}}>
                  <button onClick={() => handleLike(post.id)} className="like-btn">
                    <FaRegThumbsUp /> {likes[post.id] || 0}
                  </button>
                  <button onClick={() => toggleCommentInput(post.id)} className="comment-btn">
                    <FaRegComment /> {''|| 0}
                  </button>
                </div>
                {commentInputs[post.id] && (
                  <div className="comment-section">
                    <input
                      type="text"
                      value={commentInputs[post.id]?.text || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Add a comment..."
                      className="comment-input"
                    />
                    <button onClick={() => handleCommentSubmit(post.id)} className="submit-btn btn btn--outline-primary mt-1" style={{fontFamily:'Caladea'}}>
                      Post
                    </button>
                  </div>
                )}
              </div>
              {/* Render each comment with likes here */}
              <div className="comments-list" style={{fontFamily:'Caladea'}}>
                {post.comments?.map((comment, index) => (
                  <div className="comment" key={index}>
                    <span className="comment-author">{comment.author}</span>
                    <p className="comment-text">{comment.text}</p>
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="like-comment-btn"
                    >
                      <FaRegThumbsUp /> {comment.likes || 0}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {loading && <div className="loading-spinner">Loading...</div>}
          {!hasMore && <div className="no-more-posts">No more posts</div>}
        </div>
          </div>
          <div className="col-md-4">
  <div
    className="testimonial-section my-4 mt-4 "
    style={{
      position: 'sticky',
      top: '20px', // adjust top offset as needed
      width: '100%',
      maxWidth: '80%', // Adjust this for responsive design
      margin: '0 auto',
    }}
  >
    <h5 className="text-center testimonial-title">What Our Travelers Say</h5>
    <div className="testimonial my-3">
      <p className="text-muted testimonial-quote">“An unforgettable experience, I learned so much!”</p>
      <p className="text-end testimonial-author">– Jane Doe</p>
    </div>
    <div className="testimonial my-3">
      <p className="text-muted testimonial-quote">“Perfectly organized, highly recommend!”</p>
      <p className="text-end testimonial-author">– John Smith</p>
    </div>
    <div className="testimonial my-3">
      <p className="text-muted testimonial-quote">“Exceeded my expectations! The food was amazing!”</p>
      <p className="text-end testimonial-author">– Alice Johnson</p>
    </div>
  </div>
</div>

        </div>
              </div>
    </div>
  );
};

export default BlogPosts;
