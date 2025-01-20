import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'; // Importing icons
import logo from '../../assets/logo/enc_logo.png';
import messageIcon from '../../assets/images/message_icon.png';

const NavigationBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
    { href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
        setScrolling(true);
      } else {
        setIsSticky(false);
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isSticky ? "#0071ce" : "#ddd", // Background color changes
        color: isSticky ? "#ffffff" : "#000000", // Text color changes
        padding: "5px 10px",
        width: "100%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: "0",
        zIndex: "10",
        transform: scrolling ? "translateY(0)" : "translateY(0)",
        transition: "transform 0.3s ease-in-out",
        backdropFilter: isSticky ? "blur(10px)" : "none", // Add blur effect behind the navbar
        WebkitBackdropFilter: isSticky ? "blur(10px)" : "none", // For Safari compatibility
      }}
    >
      {/* Brand */}
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {isSticky ? (
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        ) : (
          <span></span>
        )}
      </div>

      {/* Centered Links */}
      <div style={{ display: "flex", gap: "10px" }}>
        {isSticky ? (
        <div className="actions">
          <a href="/talks">
            <div className="messages">
              <img
                src={messageIcon}
                alt="Message Icon"
              />
              <div className="notification">5</div>
            </div>
          </a>
        </div>        ) : (
          links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: isSticky ? "#ffffff" : "#333", // Link color changes based on scroll
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              {link.label}
            </a>
          ))
        )}
      </div>

      {/* Social Links */}
      <div style={{ display: "flex", gap: "15px" }}>
        {socialLinks.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              fontSize: "1.2rem",
              color: isSticky ? "#ffffff" : "#333", // Social icon color changes based on scroll
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
