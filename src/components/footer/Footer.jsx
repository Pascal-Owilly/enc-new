import './Footer.css';
import Contact from '../contact/Contact.jsx';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#FFD700' }}>
      <footer className="" style={{ borderRadius: '30px', backgroundColor: '#FFD700' }}>
        <div className="row">
          {/* Footer Main Content */}
          <div className="col-md-4 text-center">
          <h4 className="text-dark">Quick Links</h4>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li>
                  <a href="#" className="text-dark" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                    Blog
                  </a>
                </li>
              </ul>
    
            <p className="text-dark">
              &copy; Enceptics 
                <span>{`2023 - ${currentYear}`}</span>
            </p>
          </div>

          {/* Email Subscription */}
          <div className="col-md-4">
            <section className="subscribe text-center">
              <h3 className="text-dark">Get Exclusive Deals & Tips</h3>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Enter your email"
                    style={{
                      borderRadius: '20px',
                      padding: '10px',
                      border: '2px solid #333',
                      backgroundColor: '#fff',
                      color: '#333',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: '#333',
                    color: '#FFD700',
                    borderRadius: '20px',
                    padding: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </section>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4 text-center">
            <section className="contact-us">
              <h3 className="text-dark">Contact Us</h3>
              <a
                href="/contact"
                className="btn"
                style={{
                  backgroundColor: '#333',
                  color: '#FFD700',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                }}
              >
                Go to Contact
              </a>
            </section>
            <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <div id="links" className="footer-links text-center">
              <a
                href="#"
                className="text-dark mx-3"
                style={{ textDecoration: 'none', fontWeight: 'bold' }}
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-dark mx-3"
                style={{ textDecoration: 'none', fontWeight: 'bold' }}
              >
                Policy
              </a>
            </div>
          </div>
        </div>  
          </div>
          
        </div>

        {/* Footer Links */}

      </footer>
    </div>
  );
}
