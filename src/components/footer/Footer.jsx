import './Footer.css';
import Contact from '../contact/Contact.jsx'

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-dar text-white py-4">
      <div className="container">
        <div className="row">
          {/* Footer Main Content */}
          <div className="col-md-4">
            <h2>
              Enceptics <span>2023 - {currentYear}</span>
            </h2>
          </div>

          {/* Email Subscription */}
          <div className="col-md-4">
            <section className="subscribe text-center">
              <h2>Get Exclusive Deals & Tips</h2>
              <form>
                <input 
                  type="email" 
                  className="form-control mb-2" 
                  placeholder="Enter your email" 
                />
                <button type="submit" className="btn btn-danger">Subscribe</button>
              </form>
            </section>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4">
            <section className="contact-us text-center">
              <h2>Contact Us</h2>
              <a href="/contact" className="btn btn-info">Go to Contact</a>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="row justify-content-center mt-3">
          <div className="col-auto">
            <div id="links" className="footer-links text-center">
              <a href="#" className="text-white mx-3">Privacy</a>
              <a href="#" className="text-white mx-3">Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
