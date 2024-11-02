@keyframes moveBackground {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 0;
    }
  }
  
  /* hero.css */
  
  .hero-container {
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background-color: #000042;
    background-image: url('../../assets/hero/hero.jpg');
    background-size: cover;
    background-position: center;
    animation: moveBackground 20s infinite linear;
  }
  
  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    z-index: 2;
  }
  
  .oval-container {
    overflow: hidden;
    width: 90%;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 3px 3px rgba(255, 255, 255, 0.4);
    transition: transform 0.8s ease-in-out;
  }
  
  .carousel {
    height: 400px;
    opacity: 0.8;
    position: relative;
    z-index: 1;
  }
  
  .carousel .carousel-item img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    opacity: 0.5;
  }
  
  .carousel-caption h3 {
    font-size: 1.2rem;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  
  .hero-button {
    background-color: #000042;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    padding: 12px 30px;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(28, 133, 232, 0.6);
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .carousel-indicators li {
    background-color: #1c85e8;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 6px;
    opacity: 0.8;
    transition: opacity 0.3s;
  }
  
  .carousel-indicators .active {
    opacity: 1;
    transform: scale(1.1);
  }
  
  /* Media Queries */
  @media (max-width: 1200px) {
    .hero-container {
        background-position: top;
    }
  }
  
  @media (max-width: 992px) {
    .hero-button {
        padding: 10px 24px;
        font-size: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    .carousel {
        height: 300px;
    }
    .carousel-caption h3 {
        font-size: 1rem;
    }
  }
  
  @media (max-width: 576px) {
    .carousel {
        height: 200px;
    }
    .text-container {
        padding: 1rem;
    }
    .hero-button {
        padding: 8px 20px;
        font-size: 0.9rem;
    }
  }
  
  @keyframes moveBackground {
    0% { background-position: center; }
    100% { background-position: center top; }
  }
  