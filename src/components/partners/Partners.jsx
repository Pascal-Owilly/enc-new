import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import user1 from "../../assets/profile/user1.jpg";
import user2 from "../../assets/profile/user2.jpg";
import user3 from "../../assets/profile/user2.jpg";
import user4 from "../../assets/profile/user1.jpg";
import user5 from "../../assets/profile/user1.jpg";

const partnersData = [
  { logo: "https://placehold.co/200x100/png?text=Coming+up&font=roboto&text_position=top" },
  { logo: "https://placehold.co/200x100/png?text=Coming+up&font=roboto&text_position=top" },
  { logo: "https://placehold.co/200x100/png?text=Coming+up&font=roboto&text_position=top" },
  { logo: "https://placehold.co/200x100/png?text=Coming+up&font=roboto&text_position=top" },
  { logo: "https://placehold.co/200x100/png?text=Coming+up&font=roboto&text_position=top" },
];


const testimonialsData = [
  { name: "Emma R.", text: "Enceptics made my dream vacation a reality! The custom itinerary was perfect.", avatar: user1 },
  { name: "Liam D.", text: "Connecting with fellow travelers was seamless. I made lifelong friends on my trip!", avatar: user2 },
  { name: "Sophia M.", text: "I loved the sustainable travel options. It felt great to explore responsibly!", avatar: user3 },
  { name: "Noah T.", text: "From booking to adventure, everything was smooth and stress-free.", avatar: user4 },
  { name: "Olivia B.", text: "The variety of travel categories allowed me to find the perfect experience!", avatar: user5 },
];

const PartnersSlider = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="partners-container text-center py-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Our Trusted Partners</h2>
      <Slider {...settings}>
        {partnersData.map((partner, index) => (
          <div key={index} className="partner-slide flex justify-center">
            <img src={partner.logo} className="partner-logo w-36 h-36 object-contain rounded-lg shadow-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const TestimonialsSlider = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2, // Default for larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Medium screens: 2 slides
      { breakpoint: 768, settings: { slidesToShow: 1 } },  // Small screens: 1 slide
    ],
  };

  return (
    <div className="testimonials-container py-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">What Our Clients Say</h2>
      <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-slide flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg mx-4">
            <img src={testimonial.avatar} alt={`${testimonial.name} avatar`} className="w-16 h-16 rounded-full shadow-md mb-4" />
            <p className="text-gray-700 italic text-lg">"{testimonial.text}"</p>
            <h3 className="text-gray-900 font-medium mt-3">- {testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default function MainComponent() {
  return (
    <>
      <section className="bg-gray-100 py-10 px-4">
        <TestimonialsSlider />
      </section>

      <section className="bg-white py-10 px-4">
        <PartnersSlider />
      </section>

      <hr className="my-10 border-t-2 border-gray-300 mx-10" />
    </>
  );
}
