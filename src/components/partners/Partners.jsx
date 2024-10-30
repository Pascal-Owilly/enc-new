import React from 'react';
import './Partners.css'; // Import styling

const partnersData = [
  {
    name: 'Company A',
    logo: '/images/companyA_logo.png',
    description: 'Company A is a leading firm in agriculture, helping us streamline supply chain processes.'
  },
  {
    name: 'Company B',
    logo: '/images/companyB_logo.png',
    description: 'Company B is renowned for its financial services, empowering small and medium businesses.'
  },
  {
    name: 'Company C',
    logo: '/images/companyC_logo.png',
    description: 'Partnering with Company C allows us to offer cutting-edge technology to our users.'
  }
];

const Partners = () => {
  return (
    <div className="partners-container">
      <h1 className="partners-title">Our Trusted Partners</h1>
      <p className="partners-intro">
        We work with a wide range of organizations to deliver the best solutions. Meet some of our valued partners.
      </p>
      <div className="partners-grid">
        {partnersData.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.logo} alt={`${partner.name} logo`} className="partner-logo" />
            <h2 className="partner-name">{partner.name}</h2>
            <p className="partner-description">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
