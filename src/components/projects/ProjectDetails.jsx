import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetails.css';
import pos from '../../assets/showcase/pos-dashboard.png';
import clockin from '../../assets/showcase/Clockin-management.png';
import intellimaSellerDb from '../../assets/showcase/Intellima-seller-dashboard.png';
import mamlaka from '../../assets/showcase/mam-laka.png';
import yeshara from '../../assets/showcase/yeshara.png';

// Replace placeholder images with real project screenshots
const projectData = [
  {
    id: 1,
    title: 'Point of Sale System',
    description: 'Optimize sales and manage inventory with our Point of Sale system.',
    details: 'This system includes features like product management, sales tracking, and customer management to streamline operations and boost profitability.',
    image: pos,
    // demoLink: 'https://your-pos-demo-link.com'
  },
  {
    id: 2,
    title: 'Employee Clock-in Management',
    description: 'Track attendance, assign locations, and allow clock-ins within a geofence, while recording the device IMEI for secure clock-ins.',
    details: 'The employee management system simplifies HR processes, offering attendance tracking, payroll integration, and reporting tools.',
    image: clockin,
    // demoLink: 'https://your-employee-demo-link.com'
  },
  {
    id: 3,
    title: 'Supply Chain Management',
    description: 'Connect buyers and sellers globally. Sellers send quotes, buyers confirm or reject, and if confirmed, issue an LC to the seller’s bank for the process to start.',
    details: 'Our supply chain management system enables global trade between buyers and sellers, allowing efficient quote exchange, confirmation, and issuing of Letters of Credit for smooth transactions.',
    image: intellimaSellerDb,
    // demoLink: 'https://your-supply-chain-demo-link.com'
  },
  {
    id: 4,
    title: 'Africa Trade Payment Network',
    description: 'Showcasing innovative payment solutions to empower financial systems in Africa.',
    details: 'This network provides innovative solutions for streamlining cross-border transactions and empowering financial infrastructure in Africa, fostering economic growth through secure and scalable payment systems.',
    image: mamlaka,
    // demoLink: 'https://your-africa-trade-demo-link.com'
  },
  {
    id: 5,
    title: 'Real Estate Tokenization',
    description: 'Explore a minimalistic platform for real estate tokenization and sales insights.',
    details: 'Our real estate tokenization platform offers secure, scalable insights into property investment, simplifying transactions and improving access to property markets.',
    image: yeshara,
    // demoLink: 'https://your-real-estate-demo-link.com'
  },
];


export default function ProjectDetails() {
  const { id } = useParams();
  const projectId = parseInt(id, 10);
  const project = projectData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="project-not-found" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#fdeb3d' }}>No Project Selected or Project Not Found!</h2>
        <p style={{ color: '#ffffff' }}>Please select a project from the list.</p>
        <Link to="/" className="back-link" style={{ color: '#fdeb3d', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="project-details" style={{ backgroundColor: '#000042', color: '#ffffff', padding: '50px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <div className="project-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <hr />
          <h3 className="display-6" style={{ color: '#fdeb3d' }}>{project.title}</h3>
          <p className="lead">{project.description}</p>
        </div>

        {/* Grid System for Layout */}
        <div className="row">
          {/* Project Image */}
          <div className="col-md-6">
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            />
          </div>

          {/* Project Details */}
          <div className="col-md-6">
            <div className="project-details-content" style={{ marginTop: '20px' }}>
              <h2 style={{ color: '#d9d9d9' }}>Project Overview</h2>
              <p>{project.details}</p>

              {/* Demo and Request Links */}
              <div className="project-actions" style={{ marginTop: '30px' }}>
                <a
                  // href={project.demoLink}
                  href='/request-demo'
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#fdeb3d',
                    color: '#000042',
                    border: 'none',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '5px',
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>
        </div>
                  <hr />
        {/* Back to Projects Link */}
        <div className="back-to-projects" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/" className="btn btn-outline-light" style={{ color: '#fdeb3d', borderColor: '#fdeb3d' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
