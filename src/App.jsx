import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import hero from './components/hero/Hero';
import Home from './components/home/Home'; // Create a separate home component for clarity
import FAQs from './components/faqs/FAQs';
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact'; // Import Contact Component
import Places from './components/places/Places'; // Import Contact Component
import AllPlaces from './components/places/AllPlaces'; // Import Contact Component
import PlaceDetails from './components/places/PlaceDetails'; // Import the PlaceDetails component
import Blogs from './components/blogs/Blogs'; // Import the PlaceDetails component
import Partners from './components/partners/Partners'; // Import the PlaceDetails component
import Booking from './components/bookings/Booking'; // Import the PlaceDetails component
import ProjectDetails from './components/projects/ProjectDetails';
import RequestDemo from './components/projects/RequestDemoForm';
import ThankYou from './components/projects/ThankYou';
import About from './components/about/About';
import Weather from './components/weather/Weather';
import Talks from './components/talks/Talks';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
        } else {
          e.target.classList.remove('show');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/places" element={<Places />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} /> 
        <Route path="/project-details/:id" element={<ProjectDetails />} /> 
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/all-places" element={<AllPlaces />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/bookng" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather/:place_name" element={<Weather />} />
        <Route path="/talks" element={<Talks />} />
      </Routes>
      <Footer />
    </Router>
  );
}
