import React, { useMemo } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useSpring, animated } from "react-spring";
import { Line } from "react-chartjs-2";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faUtensils,
  faPalette,
  faLandmark,
  faSpa,
  faMusic,
  faHandsHelping,
  faCamera,
  faLeaf,
  faSun,
  faGlobe,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import "react-accessible-accordion/dist/fancy-example.css";
import "chart.js/auto";
import "./About.css";

const ExpansionChart = () => {
  const chartData = useMemo(
    () => ({
      labels: ["2025", "2026", "2027", "2028", "2029", "2030"],
      datasets: [
        {
          label: "Cities Reached",
          data: [1, 5, 15, 30, 60, 100],
          borderColor: "#2DD4BF",
          backgroundColor: "rgba(45, 212, 191, 0.2)",
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#2DD4BF",
          pointHoverRadius: 6,
        },
        {
          label: "User Growth (in thousands)",
          data: [10, 50, 150, 400, 800, 1500],
          borderColor: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.2)",
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#F59E0B",
          pointHoverRadius: 6,
        },
      ],
    }),
    []
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: { size: 14, family: "'Inter', sans-serif", weight: 600 },
            color: "#F3F4F6",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#1F2937",
          titleFont: { size: 16, weight: 600 },
          bodyFont: { size: 14 },
          padding: 12,
          usePointStyle: true,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#9CA3AF",
            font: { size: 12, family: "'Inter', sans-serif" },
          },
        },
        y: {
          grid: { color: "rgba(156, 163, 175, 0.1)" },
          ticks: {
            color: "#9CA3AF",
            font: { size: 12, family: "'Inter', sans-serif" },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="chart-container">
      <h2 className="text-center text-3xl font-bold text-teal-100 mb-8">
        Global Microadventure Roadmap
      
      </h2>
      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <ParallaxProvider>
      <div className="about-page">
        <Parallax speed={-10}>
          <header className="about-header">
            <div className="header-content">
              <h1>
                <span className="gradient-text">Enceptics Adventures</span>
              </h1>
              <p className="subtitle">
                Where Your Hobby Comes Alive
              </p>
              <p className="intro">
                We believe that the most transformative journeys aren't always
                across oceans. They're often just around the corner. Enceptics
                is a community dedicated to discovering and sharing
                **microadventures**—those brief, impactful escapes that recharge
                the soul.
              </p>
            </div>
          </header>
        </Parallax>

        <section className="section-container mission">
          <h2>Our Mission </h2>
          <p>
            To empower you to find adventure companions in your own city. We
            make it easy to discover unique local activities, from urban hiking
            to exploring hidden art scenes, all while connecting with like-minded
            people.
          </p>
        </section>

        <section className="section-container features">
          <h2>Why Choose Us?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <FontAwesomeIcon icon={faCompass} />
              <h3>Discover New Horizons</h3>
              <p>
                Find unique experiences you never knew existed, from secret
                hiking trails to local food festivals.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faHandsHelping} />
              <h3>Find Your Crew</h3>
              <p>
                Swipe, match, and chat with local adventurers who share your
                passions and are ready to explore.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faLeaf} />
              <h3>Sustainable Fun</h3>
              <p>
                We promote low-impact, local exploration, supporting small businesses
                and reducing your carbon footprint.
              </p>
            </div>
          </div>
        </section>

        <section className="section-container">
          <ExpansionChart />
        </section>

        <section className="section-container accordion-section">
          <h2>FAQs: Your Adventure Questions Answered</h2>
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="accordion-button">
                  <div className="flex-center-icon">
                    <FontAwesomeIcon icon={faMountain} className="accordion-icon" />
                    What is a microadventure?
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  A microadventure is a short, localized adventure—an escape from the everyday.
                  This could be a night of wild camping, a sunrise hike, or exploring a new
                  neighborhood for its street food. It's about finding adventure close to home.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="accordion-button">
                  <div className="flex-center-icon">
                    <FontAwesomeIcon icon={faCamera} className="accordion-icon" />
                    How do I find a trip mate?
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Our app uses a swipe-and-match system. Simply browse profiles of other adventurers
                  and swipe right on those you're interested in connecting with. If they also swipe
                  right on you, it's a match, and you can start planning your venture!
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="accordion-button">
                  <div className="flex-center-icon">
                    <FontAwesomeIcon icon={faGlobe} className="accordion-icon" />
                    Is this for international travel?
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  While you can find connections for any trip, our primary focus is on local
                  microadventures. We aim to help you discover hidden gems and build connections
                  in your own city first.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </section>

        <Parallax speed={5}>
          <animated.section style={fadeIn} className="call-to-action">
            <h2>Ready to Start Your Adventure?</h2>
            <p>
              Join the community and find your next adventure companion today.
            </p>
            <button className="cta-button">Join the Journey</button>
          </animated.section>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default About;