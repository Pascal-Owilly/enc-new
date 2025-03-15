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
import "react-accessible-accordion/dist/fancy-example.css";
import "chart.js/auto";
import "./About.css";

const ExpansionChart = () => {
  const chartData = useMemo(
    () => ({
      labels: ["2025", "2026", "2027", "2028", "2029", "2030"],
      datasets: [
        {
          label: "New Countries Reached",
          data: [1, 3, 7, 12, 18, 25],
          borderColor: "#1e90ff",
          backgroundColor: "rgba(30, 144, 255, 0.2)",
          tension: 0.4,
        },
        {
          label: "User Growth (in thousands)",
          data: [10, 50, 150, 400, 800, 1500],
          borderColor: "#28a745",
          backgroundColor: "rgba(40, 167, 69, 0.2)",
          tension: 0.4,
        },
      ],
    }),
    []
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // ✅ Ensures the chart resizes properly
      plugins: {
        legend: {
          labels: {
            font: { size: 14 },
            color: "#333",
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#555", font: { size: 12 } },
        },
        y: {
          grid: { color: "rgba(200, 200, 200, 0.3)" },
          ticks: { color: "#555", font: { size: 12 } },
        },
      },
    }),
    []
  );

  return (
    <div className="chart-container">
      <h2 className="text-center">Enceptics Expansion Plan (2025-2030)</h2>
      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const FAQ = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <ParallaxProvider>
      <div className="faq-page">
        <Parallax speed={-5}>
          <header className="faq-header">
            <h5>Welcome to Enceptics</h5>
            <p>Your Purpose-Driven Vacation Partner</p>
          </header>
        </Parallax>

        <animated.section style={fadeIn} className="faq-intro">
          <p>
            At Enceptics, we specialize in vacations with a purpose. Whether
            you're an agriculture lover seeking insight into farming, a
            culinary enthusiast exploring local flavors, or a nature lover
            immersing in serene landscapes, we have something for everyone.
          </p>
          <p>
            Our goal for the next five years is to expand into new markets,
            bringing our unique travel experiences to <strong>over 25 countries</strong> and
            reaching <strong>over 1.5 million users</strong>.
          </p>
        </animated.section>

       <section className="faq-categories">
  <h2 className="text-center">Who We Target</h2>
  <p>
    At Enceptics, we offer unique travel experiences tailored for different interests and passions. 
    Whether you seek adventure, cultural immersion, or personal growth, our diverse travel categories 
    ensure there’s something for everyone.
  </p>

  <Accordion allowMultipleExpanded allowZeroExpanded>
    {/* Adventure Enthusiasts */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Adventure Enthusiasts</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          For those who crave excitement and exploration, we offer micro-adventures, outdoor 
          activities, and nature hikes. Whether you're scaling breathtaking trails, spotting 
          wildlife, or diving into thrilling outdoor adventures, our experiences bring the world to life.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Food Lovers & Culinary Explorers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Food Lovers & Culinary Explorers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          We cater to those with a passion for local flavors and gastronomy. From immersive 
          culinary tours and hands-on cooking classes to discovering vibrant farmers' markets, 
          we bring you closer to the heart of a region’s cuisine.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Culture & Art Seekers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Culture & Art Seekers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          For travelers eager to experience local traditions and artistry, we offer art workshops, 
          artisan tours, and cultural festivals. Whether it’s learning the craftsmanship of local 
          artisans or participating in storytelling nights, our experiences are deeply engaging.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* History & Heritage Enthusiasts */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>History & Heritage Enthusiasts</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          Those who love the past will enjoy our historical tours and cultural exchanges, 
          where they can walk through ancient landmarks, engage in rich storytelling, 
          and connect with local communities.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Wellness & Mindfulness Seekers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Wellness & Mindfulness Seekers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          For those looking to unwind, we provide wellness retreats designed for relaxation 
          and rejuvenation. Whether it's a tranquil spa escape or a serene meditation retreat, 
          we prioritize well-being.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Entertainment & Performance Lovers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Entertainment & Performance Lovers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          From music and dance classes to local sports events, our experiences immerse you 
          in the region’s entertainment scene. Feel the rhythm, learn new moves, and cheer 
          for local teams in an unforgettable way.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Community & Social Impact Travelers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Community & Social Impact Travelers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          For those looking to make a difference while traveling, our community service programs 
          allow you to engage with local initiatives, volunteer, and leave a lasting impact.
        </p>
      </AccordionItemPanel>
    </AccordionItem>

    {/* Digital & Virtual Explorers */}
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>Digital & Virtual Explorers</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          For modern explorers, we offer themed photo walks for capturing stunning moments, and 
          even virtual reality experiences that transport you to new destinations without leaving 
          your home.
        </p>
      </AccordionItemPanel>
    </AccordionItem>
  </Accordion>
</section>


        {/* ✅ Corrected: No need to memoize ExpansionChart */}
        <ExpansionChart />

        <Parallax speed={5}>
          <section className="faq-footer">
            <h2>Partnering with Excellence</h2>
            <p>
              Enceptics is actively working toward partnerships with leading
              companies to provide you with unmatched vacation experiences.
            </p>
          </section>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default FAQ;
