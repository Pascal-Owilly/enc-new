import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import './Section1.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SectionHighlights() {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null); // Reference to the section container

  // Intersection Observer to detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.unobserve(sectionRef.current); // Stop observing after triggering
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="container py-5 about hidden">
      <div className="row text-center mb-5">
        <div className="col-md-12">
          <h1 className="display-4 font-weight-bold text-shadow">Your Vision, Our Creation</h1>
          <p className="lead text-shadow">Building Solutions for a Connected World</p>
        </div>
      </div>

      <div className="row text-center">
        {/* Counter 1: Systems Created */}
        <div className="col-md-4 mb-4">
          <div className="counter-wrapper">
            <div className="circle">
              {startCounting && (
                <CountUp
                  className="counter-number"
                  start={0}
                  end={15} 
                  duration={2}
                  delay={0}
                  useEasing={true}
                />
              )}
            </div>
            <h2 className="counter-title">Systems Created</h2>
          </div>
        </div>

        {/* Counter 2: Happy Clients */}
        <div className="col-md-4 mb-4">
          <div className="counter-wrapper">
            <div className="circle">
              {startCounting && (
                <CountUp
                  className="counter-number"
                  start={0}
                  end={15}
                  duration={2}
                  delay={0}
                  useEasing={true}
                />
              )}
            </div>
            <h2 className="counter-title" style={{ }}>
              Happy Clients
            </h2>
          </div>
        </div>

        {/* Counter 3: Rating */}
        <div className="col-md-4 mb-4">
          <div className="counter-wrapper">
            <div className="circle">
              {startCounting && (
                <CountUp
                  className="counter-number"
                  start={0}
                  end={4.7}
                  duration={2}
                  delay={0}
                  decimals={1} // Show decimals for rating
                  useEasing={true}
                />
              )}
            </div>
            <h2 className="counter-title">Rating</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
