import React from 'react';
import './Blogs.css'; // Import styling

const blogsData = [
  {
    title: 'How Technology is Revolutionizing Agriculture',
    image: '/images/blog1.jpg',
    excerpt: 'Discover how tech innovations are transforming the agriculture industry in 2024...',
    date: 'October 10, 2024'
  },
  {
    title: 'Top Financial Tools for Small Farmers',
    image: '/images/blog2.jpg',
    excerpt: 'These financial tools help small-scale farmers manage their operations more effectively...',
    date: 'September 28, 2024'
  },
  {
    title: 'Sustainability in the Supply Chain',
    image: '/images/blog3.jpg',
    excerpt: 'Learn about the latest sustainable practices in global supply chains...',
    date: 'September 14, 2024'
  }
];

const Blogs = () => {
  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Latest Blogs</h1>
      <div className="blogs-grid">
        {blogsData.map((blog, index) => (
          <div key={index} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-date">{blog.date}</p>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
