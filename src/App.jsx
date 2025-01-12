import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Navbar and Footer
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Core Pages
import Home from './components/home/Home';
import FAQs from './components/faqs/FAQs';
import Contact from './components/contact/Contact';
import About from './components/about/About';

// Auth Pages
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

import Profile from './components/auth/Profile';

// Places and Details
import Places from './components/places/Places';
import AddPlace from './components/places/AddPlace';
import AllPlaces from './components/places/AllPlaces';
import PlaceDetails from './components/places/PlaceDetails';
import ReviewPage from './components/places/ReviewPage';

// Project and Demo Pages
import ProjectDetails from './components/projects/ProjectDetails';
import RequestDemo from './components/projects/RequestDemoForm';
import ThankYou from './components/projects/ThankYou';

// Destination Activities
import CulinaryTours from './components/culinary_tours/CulinaryTours';
import FarmersMarkets from './components/farmers_markets/FarmersMarkets';
import NatureHikes from './components/destinations/NatureHikes';
import ArtWorkshops from './components/destinations/ArtWorkshops';
import CulturalFestivals from './components/destinations/CulturalFestivals';
import HistoricalTours from './components/destinations/HistoricalTours';
import CommunityService from './components/destinations/CommunityService';
import OutdoorAdventures from './components/destinations/OutdoorAdventures';
import WellnessRetreats from './components/destinations/WellnessRetreats';
import LocalSports from './components/destinations/LocalSports';
import MusicAndDanceClasses from './components/destinations/MusicAndDanceClasses';
import LocalArtisanTours from './components/destinations/LocalArtisanTours';
import ThemedPhotoWalks from './components/destinations/ThemedPhotoWalks';
import CulturalExchange from './components/destinations/CulturalExchange';
import StorytellingNights from './components/destinations/StorytellingNights';
import WildlifeSpotting from './components/destinations/WildlifeSpotting';
import VirtualRealityOne from './components/destinations/VirtualRealtyOne';
import VirtualRealityTwo from './components/destinations/VirtualRealityTwo';
import TourAndLearn from './components/destinations/TourAndLearn';

// Itineraries
import Relaxation from './components/itineraries/Relaxation';
import FamilyFun from './components/itineraries/FamilyFun';
import ExploreTheUnknown from './components/itineraries/ExploreTheUnknown';
import SustainableTravels from './components/itineraries/SustainableTravels';
import CustomItineraries from './components/itineraries/CustomItineraries';
import MicroAdventure from './components/itineraries/MicroAdventure';

// Additional Components
import Blogs from './components/blogs/Blogs';
import Partners from './components/partners/Partners';
import Booking from './components/bookings/Booking';
import GroupBookings from './components/bookings/GroupBookings';
import Weather from './components/weather/Weather';
import Talks from './components/talks/Talks';

// Testing Component
import Test from './components/testing/Test';

// Payment
import Payment from './components/payment/Payment'; 

// Property Management
import PropertyManager from './components/property_management/PropertyManager';

// Authentication
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <Router>
      <AuthProvider>

      <Navbar />
      <div className="page-container">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />

          <Route
            path="/auth/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          {/* Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/about" element={<About />} /> */}

          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          {/* Places Routes */}
          <Route path="/places" element={<Places />} />
          <Route path="/all-places" element={<AllPlaces />} />
          <Route path="/all-places/:category" element={<AllPlaces />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />

          <Route path="/booking" element={<Booking />} />

          {/* Project and Demo Routes */}
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Destination Routes */}
          <Route path="/destinations/culinary-tours" element={<CulinaryTours />} />
          <Route path="/destinations/farmers-markets" element={<FarmersMarkets />} />
          <Route path="/destinations/nature-hikes" element={<NatureHikes />} />
          <Route path="/destinations/art-workshops" element={<ArtWorkshops />} />
          <Route path="/destinations/cultural-festivals" element={<CulturalFestivals />} />
          <Route path="/destinations/historical-tours" element={<HistoricalTours />} />
          <Route path="/destinations/community-service" element={<CommunityService />} />
          <Route path="/destinations/outdoor-adventures" element={<OutdoorAdventures />} />
          <Route path="/destinations/wellness-retreats" element={<WellnessRetreats />} />
          <Route path="/destinations/local-sports" element={<LocalSports />} />
          <Route path="/destinations/music-dance" element={<MusicAndDanceClasses />} />
          <Route path="/destinations/artisan-tours" element={<LocalArtisanTours />} />
          <Route path="/destinations/photo-walks" element={<ThemedPhotoWalks />} />
          <Route path="/destinations/wildlife-spotting" element={<WildlifeSpotting />} />
          <Route path="/destinations/cultural-exchange" element={<CulturalExchange />} />
          <Route path="/destinations/storytelling" element={<StorytellingNights />} />

          {/* Itineraries Routes */}
          <Route path="/itineraries/relaxation" element={<Relaxation />} />
          <Route path="/itineraries/family" element={<FamilyFun />} />
          <Route path="/itineraries/exploration" element={<ExploreTheUnknown />} />
          <Route path="/itineraries/sustainable" element={<SustainableTravels />} />
          <Route path="/itineraries/custom" element={<CustomItineraries />} />
          <Route path="/destinations/micro-adventure" element={<MicroAdventure />} />

          {/* Additional Routes */}
          <Route path="/destinations/all-categories" element={<Blogs />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/destination/group-bookings" element={<GroupBookings />} />
          <Route path="/weather/:place_name" element={<Weather />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/destinations/vr-2" element={<VirtualRealityTwo />} />
          <Route path="/destinations/tour-and-learn" element={<TourAndLearn />} />

          {/* Test Route */}
          <Route path="/test" element={<Test />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Property Management */}
          <Route path="/management/property-management" element={<PropertyManager />} />
          <Route path="/management/property-management/add-place" element={<AddPlace />} />

        </Routes>
      </div>
      <Footer />
      </AuthProvider>

    </Router>
  );
}
