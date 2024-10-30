import React from 'react';
import './About.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="about-us-intro">
        <h1 className="fade-in">Welcome to Enceptcs</h1>
        <p>
          Yeshara is revolutionizing real estate investment through cutting-edge tokenization technology. We make property investment accessible, efficient, and globally inclusive — all while maintaining top-tier compliance.
        </p>
      </section>

      <section className="about-us-values">
        <div className="values-container">
          <div className="value-card">
            <h2>Our Mission</h2>
            <p>We strive to democratize real estate investment, making it easy for both small and large investors to participate. Transparency, efficiency, and compliance are our core pillars.</p>
          </div>
          <div className="value-card">
            <h2>What We Do</h2>
            <p>We simplify the tokenization of assets, offering complete solutions from valuation to compliance, dividend management, and secondary trading options.</p>
          </div>
          <div className="value-card">
            <h2>Why Choose Us?</h2>
            <p>We combine expertise in real estate and blockchain to provide flexible, legally-compliant investment options tailored to both issuers and investors.</p>
          </div>
        </div>
      </section>

      <section className="about-us-difference">
        <div className="difference-left">
          <h2>Innovative Solutions</h2>
          <p>Blockchain technology meets real estate, bringing a whole new level of liquidity, efficiency, and global reach to your investments.</p>
        </div>
        <div className="difference-right">
          <img src="https://via.placeholder.com/400x250" alt="Innovation" />
          {/* <polygon
        points="114.41 154.34 303.42 261.07 303.42 132.94 114.4 26.21 114.41 154.34"
        className="cls-5" 
      /> */}
        </div>
      </section>

      <section className="about-us-impact">
        <h2 className="impact-heading">Making a Real Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>Compliance</h3>
            <p>Yeshara ensures that every tokenized offering adheres to stringent regulatory standards, creating a secure environment for investors.</p>
          </div>
          <div className="impact-card">
            <h3>Flexibility</h3>
            <p>From fractional ownership to secondary trading, we provide unmatched flexibility for both issuers and investors.</p>
          </div>
          <div className="impact-card">
            <h3>Global Reach</h3>
            <p>With Yeshara, you can access a global pool of investors, breaking down barriers to real estate capital.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;