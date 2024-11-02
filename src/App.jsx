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
// Iteneraries
import Relaxation from './components/itineraries/Relaxation';
import FamilyFun from './components/itineraries/FamilyFun';
import ExploreTheUnknown from './components/itineraries/ExploreTheUnknown';
import SustainableTravels from './components/itineraries/SustainableTravels';
import CustomItineraries from './components/itineraries/CustomItineraries';
import MicroAdventure from './components/itineraries/MicroAdventure';
import GroupBookings from './components/bookings/GroupBookings';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';

// Testing
import Test from './components/testing/Test';

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
    <div className="page-container">

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/profile" element={<Profile />} />

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
        <Route path="/destintion/bookng" element={<Booking />} />
        <Route path="/destination/group-bookings" element={<GroupBookings />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather/:place_name" element={<Weather />} />
        <Route path="/talks" element={<Talks />} />

        {/* Culinary Tours */}
        <Route path="/destinations/culinary-tours" element={<CulinaryTours />} />
        <Route path="/destinations/micro-adventure" element={<MicroAdventure />} />

        {/* Farmers markets */}
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

        {/* Iteneraries  */}
        <Route path="/itineraries/relaxation" element={<Relaxation />} />
        <Route path="/itineraries/family" element={<FamilyFun />} />
        <Route path="/itineraries/exploration" element={<ExploreTheUnknown />} />
        <Route path="/itineraries/sustainable" element={<SustainableTravels />} />
        <Route path="/itineraries/custom" element={<CustomItineraries />} />

        {/* Test */}
        <Route path="/test" element={<Test />} />
      </Routes>
      </div>

      <Footer />
    </Router>

  );
}
