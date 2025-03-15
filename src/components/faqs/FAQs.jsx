import React from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useSpring, animated } from "react-spring";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./FAQ.css";

const FAQs = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <ParallaxProvider>
      <div className="faqs-page">
        {/* Parallax Header */}
        <Parallax speed={-5}>
          <header className="faqs-header">
            <h5>FAQs</h5>
            <p>Your Questions Answered</p>
          </header>
        </Parallax>

        {/* Intro Section with Animation */}
        <animated.section style={fadeIn} className="faqs-intro">
          <p>
            Have questions about Enceptics? We're here to help. Below you'll find answers to the most common questions about our purpose-driven vacations, customizable itineraries, and more.
          </p>
        </animated.section>

        {/* Accordion Section for FAQs */}
        <section className="faqs-categories">
          <Accordion allowMultipleExpanded allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>What is Enceptics?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Enceptics is a platform specializing in purpose-driven vacations. We connect travelers with unique opportunities to explore, learn, and grow through activities tailored to their interests.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>What makes Enceptics unique?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  We offer customizable itineraries where users can share their travel preferences. Our team collaborates with you to create a personalized experience that matches your needs.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Are there any hidden charges?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  No. All pricing is transparent, and there are no hidden fees. Our goal is to provide clarity and build trust with our customers.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>I am a property owner. How do I list mine?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Reach out to us using the <a href="/contact"> contact </a> &nbsp; form and we'll get back to you ASAP
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>How do I book a customized itinerary?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Start by filling out our preferences form. We'll schedule a meeting with you to discuss your ideas and ensure we create the perfect itinerary tailored to your interests.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>Do you offer eco-friendly vacation options?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Yes! We prioritize sustainability by offering eco-friendly vacation packages that promote conservation and responsible tourism.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>What are the categories of vacations offered?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  We cater to a variety of interests, including agriculture, culinary adventures, micro-adventure, group booking, virtual reality, community service, art and culture, and more. No matter your passion, we have something for you.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Footer Section with Parallax */}
        <Parallax speed={5}>
          <footer className="faqs-footer">
            <h2>Still Have Questions?</h2>
            <p>
              If your question isn’t listed here, feel free to reach out to us through this &nbsp; <a href="/contact"> form </a>.We’re always happy to assist!
            </p>
          </footer>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
};

export default FAQs;
