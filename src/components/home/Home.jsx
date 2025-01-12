import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import Navbar from '../../components/navbar/Navbar';
import Hero from '../hero/Hero';
import Section1 from '../../components/about/Section1';
import Footer from '../../components/footer/Footer';
import Projects from '../../components/projects/Projects';
import Places from '../../components/places/Places';
import Blogs from '../../components/blogs/Blogs';
import Partners from '../../components/partners/Partners';

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      }); 
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <div className="">
        <div style={{  }}>
          <div >
            <Hero />
            {/* <Places /> */}
            <Blogs />
            <Partners />
          </div>
        </div>
        {/* <Section1 /> */}
        <Projects />
      </div>
    </>
  );
}
