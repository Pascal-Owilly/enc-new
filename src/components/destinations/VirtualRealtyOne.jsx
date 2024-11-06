// src/VRPageOne.js
import React from 'react';
import './Vr.css';

function VRPageOne() {
  return (
    <div className="page-one">
      <header className="header">
        <h1>VR headsets</h1>
        <p>Explore the world of virtual reality with our advanced VR headsets.</p>
        <button>Read More</button>
      </header>
      
      <section className="benefits">
        <h2>VR's Surprising Benefits</h2>
        <div className="benefits-cards">
          <div className="card">
            <h3>Mental Health</h3>
            <p>VR can help reduce stress and improve overall mental well-being.</p>
          </div>
          <div className="card">
            <h3>Realistic Experience</h3>
            <p>Experience a realistic environment that can enhance learning and engagement.</p>
          </div>
          <div className="card">
            <h3>Relax</h3>
            <p>Unwind with VR relaxation techniques.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>Virtual Reality</h2>
        <p>Learn more about the technology behind VR and its applications.</p>
        <ul>
          <li>Immersive experiences</li>
          <li>New opportunities in education</li>
          <li>Enhanced creativity</li>
        </ul>
      </section>
    </div>
  );
}

export default VRPageOne;
