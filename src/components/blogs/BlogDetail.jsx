import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/blogs/${id}/`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return <h2 className="text-center text-dark mt-4 text-danger">Blog post not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-dark">{post.title}</h1>
      {post.subtitle && <h4 className="text-center text-muted">{post.subtitle}</h4>}
      {post.image && <img src={post.image} alt={post.title} className="img-fluid rounded mx-auto d-block my-3" style={{ maxHeight: '400px' }} />}
      <p className="text-muted text-center">{new Date(post.created_at).toLocaleDateString()}</p>
      {post.location && <p className="text-muted text-center">Location: {post.location}</p>}
      {post.reading_time && <p className="text-muted text-center">Estimated Reading Time: {post.reading_time} minutes</p>}
      {post.tags && <p className="text-muted text-center">Tags: {post.tags.split(',').map(tag => <span key={tag} className="badge bg-secondary mx-1">{tag.trim()}</span>)}</p>}
      <div className="content mt-4">
        <p>{post.content}</p>
      </div>
      <hr />
      <p className="text-muted text-center">Last updated: {new Date(post.updated_at).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogDetail;