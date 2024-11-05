import React, { useState } from 'react';
import './Test.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Sample SVG component
const SvgLineWithCircle = () => (
  <svg width="222" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="3" stroke="#345865" strokeWidth="2" />
    <rect x="7" y="3" width="215" height="2" rx="1" fill="#345865" />
  </svg>
);

const Questionnaire = ({ onClose }) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    "How far into digitalization is your organization?",
    // Add more questions here as needed
  ];

  const answers = [
    "We need to start the transformation",
    "We are at the very beginning",
    "We are deep into the planning process",
    "We already have some development done",
    "It could be done better",
  ];

  return (

    <div className="questionnaire-section">

      <div className="question__wrapper service-animated">
        <div className="question service__type">
          <div className="question__shape" />
          <div className="question__animation" />
          <div className="question__inner">
            <div className="question__hexagon-icon">
              <img src="https://axiomq.com/wp-content/uploads/2024/04/Business-Process-Digitalization-1.png" alt="" />
            </div>
            <h4>Business Process Digitalization</h4>
          </div>
        </div>
      </div>

      <div className="questions__service questions__service-0">
        <div className="questions__header">
       
          <h4>{questions[questionIndex]}</h4>
          <div className="btn-back exit keys-animated" onClick={onClose}>
            <FontAwesomeIcon icon={faX} />
          </div>
          <div className="questions__line" />
        </div>
        <div className="questions__holder">
          <div className="questions__answers">
            {answers.map((answer, index) => (
              <label key={index} className="questions__answer move-left">
                <div className="questions__answer-image">
                  <div className="questions__bullet">
                    <FontAwesomeIcon icon={faX} />
                  </div>
                </div>
                <div className="questions__answer-text">
                  <p>{answer}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="questions__buttons move-left">
            <div className="back btn-back" onClick={() => setQuestionIndex(Math.max(0, questionIndex - 1))}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="questions__button">
              <button onClick={() => setQuestionIndex(Math.min(questions.length - 1, questionIndex + 1))}>
                NEXT <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isQuestionnaireVisible, setQuestionnaireVisible] = useState(false);

  const toggleQuestionnaire = () => {
    setQuestionnaireVisible(!isQuestionnaireVisible);
  };

  return (
    <div className="page-template-default page page-id-19448 wp-custom-logo group-blog page-hire-us">
      <div className="header__add-margin-bottom"></div>
      <div className="page-background" style={{ backgroundImage: "url('https://axiomq.com/wp-content/uploads/2024/04/Hire-Us-background.png')" }}>
        {/* Background content */}
      </div>
      <section className="service free-quote padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={`free-quote__box service__box ${isQuestionnaireVisible ? 'hidden' : ''}`}>
                <div className="row">
                  <div className="col">
                    <div className="free-quote__line-block d-flex">
                      <SvgLineWithCircle />
                      <div className="chevron-icon" onClick={toggleQuestionnaire}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                      <SvgLineWithCircle />
                    </div>
                  </div>
                  <div className="col-lg-12 mb-10 d-flex justify-content-center">
                    <h4>Business Process Digitalization</h4>
                  </div>
                </div>
              </div>
              {isQuestionnaireVisible && (
                <Questionnaire onClose={toggleQuestionnaire} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
