import React from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useSpring, animated } from "react-spring";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./About.css";

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
            <h1>Welcome to Enceptics</h1>
            <p>Your Purpose-Driven Vacation Partner</p>
          </header>
        </Parallax>
        <animated.section style={fadeIn} className="faq-intro">
          <p>
            At Enceptics, we specialize in vacations with a purpose. Whether you're an agriculture lover seeking insight into farming, a culinary enthusiast exploring local flavors, or a nature lover immersing in serene landscapes, we have something for everyone.
          </p>
          <p>
            Our unique offerings include customizable itineraries tailored to your travel preferences. Fill out a form, and our team will meet with you to design a personalized experience that matches your desires.
          </p>
        </animated.section>
        <section className="faq-categories">
          <Accordion allowMultipleExpanded allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Adventure Enthusiasts</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>Explore thrilling outdoor activities, nature hikes, and micro-adventures that bring unforgettable experiences.</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Food Lovers</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>Embark on culinary tours, taste local flavors, and enjoy cooking classes guided by expert chefs.</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Art & Culture Aficionados</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>Immerse yourself in art workshops, cultural festivals, and storytelling nights with local communities.</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Environmental Advocates</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>Join eco-friendly vacations, explore sustainable practices, and learn about local conservation efforts.</p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </section>
        <Parallax speed={5}>
          <section className="faq-footer">
            <h2>Partnering with Excellence</h2>
            <p>
              Enceptics is actively working toward partnerships with leading companies to provide you with unmatched vacation experiences.
            </p>
          </section>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default FAQ;
