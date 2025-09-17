import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaShareAlt } from "react-icons/fa";

const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Journey with Purpose");

  const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQs" },
    { href: "/blogs", label: "Blogs" },

  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
    { href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  const categories = ["Journey with Purpose", "Explore Your Passions", "Savor Your Desires", "Share your story"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 3000); 

    return () => clearInterval(interval); 
  }, [categories]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "I found something interesting to share with you.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully!");
      } catch (err) {
        console.error("Error sharing content:", err);
      }
    } else {
      alert("Sharing not supported in this browser. Use the links below!");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ddd",
        color: "#000",
        padding: "0 10px 0 10px",
        width: "100%",
      }}
    >
   <div className='bottom-nav-link'
  style={{
    fontSize: "0.9rem",  // Smaller font size
    fontWeight: "600",   // Slightly bolder text
    color: '#0071ce',
    opacity: 0.5,
    transform: "translateY(20px)",
    animation: "fadeInUp 1.5s ease-out forwards, parallaxEffect 5s infinite alternate",
    transition: "transform 0.3s ease-out",
  }}
>
  {currentCategory}
</div>


{/*      <div className="d-none d-sm-block" style={{ display: "flex", gap: "10px" }}>
        {links.map((link) => (
          <a 
          className="mx-2 bottom-nav-link"
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
            
            }}
          >
            {link.label}
          </a>
        ))}
      </div>*/}

<nav
  className="navbar-links d-none d-md-flex"
  style={{
    display: "flex",
    gap: "24px",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    color: "#333",
  }}
>
  <a
    href="/blogs"
    className="nav-link"
    style={{
      textDecoration: "none",
      color: "#4B0082",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    Travel Bingo
  </a>
  <a
    href="/travel-tinder"
    className="nav-link"
    style={{
      textDecoration: "none",
      color: "#4B0082",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    Travel Tinder
  </a>
  <a
    href="/blind-booking"
    className="nav-link"
    style={{
      textDecoration: "none",
      color: "#4B0082",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    Blind Booking
  </a>
  <a
    href="/pay-with-skills"
    className="nav-link"
    style={{
      textDecoration: "none",
      color: "#4B0082",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    Pay with Skills
  </a>
  <a
    href="/faqs"
    className="nav-link"
    style={{
      textDecoration: "none",
      color: "#4B0082",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#8A2BE2")}
    onMouseLeave={(e) => (e.target.style.color = "#4B0082")}
  >
    Reverse Tourism
  </a>
</nav>


      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {socialLinks.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            {social.icon}
          </a>
        ))}

        <button
          onClick={handleShare}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          <FaShareAlt />
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default NavigationBar;
