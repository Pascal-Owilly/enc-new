import React from 'react';
import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Intellima offer?",
      answer: "At Intellima, we specialize in creating custom websites, building comprehensive systems, developing mobile applications, and crafting engaging UI/UX designs. Whether it’s a simple website or a complex enterprise-level solution, we’ve got you covered."
    },
    {
      question: "What makes Intellima different from other tech companies?",
      answer: "Intellima stands out due to our relentless focus on quality and innovation. Our team combines technical expertise with creative problem-solving to deliver solutions that not only meet your requirements but also enhance user experiences and drive business growth."
    },
    {
      question: "How long does it take to complete a typical project?",
      answer: "Project timelines vary depending on the scope and complexity. A simple website can take 2-4 weeks, while a custom mobile app or a large-scale system might take several months. We ensure clear communication and progress updates throughout the development process."
    },
    {
      question: "Do you offer support and maintenance after the project is completed?",
      answer: "Yes, we provide comprehensive post-launch support and maintenance services. This includes updates, performance monitoring, troubleshooting, and enhancements to ensure your system or app remains secure and up-to-date."
    },
    {
      question: "What industries do you work with?",
      answer: "We serve a wide range of industries including finance, healthcare, education, e-commerce, and more. Our adaptable solutions cater to startups, SMEs, and large enterprises looking to leverage technology to scale their businesses."
    },
    {
      question: "Can Intellima work with my existing software or system?",
      answer: "Absolutely! We are experienced in integrating new solutions with legacy systems, ensuring a seamless transition and preserving your existing functionalities. We also offer consultations to assess your current setup and recommend the best path forward."
    },
    {
      question: "Do you provide UI/UX design services separately?",
      answer: "Yes, we offer dedicated UI/UX design services. Our design team is focused on creating visually appealing and user-centric interfaces that align with your brand identity and improve user interactions across web and mobile platforms."
    },
    {
      question: "What technologies does Intellima use?",
      answer: "Our tech stack includes React for frontend, Django for backend, and React Native and Flutter for mobile app development. We choose the technology that best suits your project’s needs."
    },
    {
      question: "How do you ensure project quality and security?",
      answer: "We follow industry best practices, conduct thorough testing at every stage, and implement robust security measures. Our agile approach allows us to maintain quality while being flexible and responsive to feedback."
    },
    {
      question: "How can I get started with Intellima?",
      answer: "Getting started is easy! Simply reach out to us through our contact form or book a demo. We’ll discuss your project requirements, goals, and budget to provide a tailored solution that meets your business needs."
    },
  ];

  return (
    <div className="faq-background">
      <div className="faq-overlay"></div>
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h2 className="faq-question">{faq.question}</h2>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
