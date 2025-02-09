import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const partnersData = [
  { name: 'Company A', logo: 'https://via.placeholder.com/150/0000FF/808080?text=Company+A' },
  { name: 'Company B', logo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Company+B' },
  { name: 'Company C', logo: 'https://via.placeholder.com/150/008000/FFFFFF?text=Company+C' },
  { name: 'Company D', logo: 'https://via.placeholder.com/150/FFA500/000000?text=Company+D' },
  { name: 'Company E', logo: 'https://via.placeholder.com/150/800080/FFFFFF?text=Company+E' },
];

const testimonialsData = [
  { name: 'User A', text: 'This service is amazing!', avatar: 'https://via.placeholder.com/100/0000FF/808080?text=User+A' },
  { name: 'User B', text: 'I love working with this company.', avatar: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=User+B' },
  { name: 'User C', text: 'Highly recommend to everyone.', avatar: 'https://via.placeholder.com/100/008000/FFFFFF?text=User+C' },
  { name: 'User D', text: 'Great experience overall.', avatar: 'https://via.placeholder.com/100/FFA500/000000?text=User+D' },
  { name: 'User E', text: 'Exceptional service and support!', avatar: 'https://via.placeholder.com/100/800080/FFFFFF?text=User+E' },
];

const PartnersSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="partners-container text-dark text-center mt-5">
      <h4 className="partners-title mb-5">Our Trusted Partners</h4>
      <Slider {...settings}>
        {partnersData.map((partner, index) => (
          <div key={index} className="partner-slide">
            <img src={partner.logo} alt={`${partner.name} logo`} className="partner-logo" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const TestimonialsSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="testimonials-container mt-5">
      <h4 className="testimonials-title text-dark text-center mb-5">What Our Clients Say</h4>
      <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <img src={testimonial.avatar} alt={`${testimonial.name} avatar`} className="testimonial-avatar" />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h3 className="testimonial-name">- {testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Default export for the main component
export default function MainComponent() {
    return (
        <>
         <section
    className='container-fluid'
    style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    }}
>
    <TestimonialsSlider />
</section>

<section
    className='jumbotron'
    style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f1f3f5',
        borderRadius: '8px',
    }}
>
    <PartnersSlider />
</section>

<hr style={{ margin: '40px 0', border: '1px solid #dee2e6' }} />
        </>
    );
}