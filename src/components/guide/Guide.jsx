import './Guide.css';

export default function Guide() {
  return (
    <div style={{ marginTop: '120px' }}>
      <div className="step hidden">
        <div className="iconWrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="150" 
            height="150" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="feather feather-eye" 
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <path d="M12 12l0 .01" />
            <path d="M12 4.5c-3.25 0-6 2.75-6 6s2.75 6 6 6 6-2.75 6-6-2.75-6-6-6z" />
          </svg>
        </div>
        <p className="description fade-in">
          <span className="bounce">Browse</span> - Explore a diverse portfolio of tokenized real estate assets available for investment. View detailed information, and assess investment opportunities tailored to your interests.
        </p>
      </div>

      <div className="line" style={{ transform: 'rotate(180deg)' }}></div>
      <div className="line"></div>

      <div className="step hidden">
        <div className="iconWrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="150" 
            height="150" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="feather feather-shopping-cart" // Example SVG icon
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l1.68 4.39L9 12h10l1.22-4.39L23 4H7" />
          </svg>
        </div>
        <p className="description fade-in">
          <span className="bounce">Buy</span> - Identify a property that aligns with your investment goals, proceed to purchase digital tokens representing fractional ownership of the asset. This straightforward process enables you to invest with confidence, knowing you are part of a secure and transparent transaction.
        </p>
      </div>

      <div className="line" style={{ transform: 'rotate(180deg)' }}></div>
      <div className="line"></div>

      <div className="step hidden">
        <div className="iconWrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="150" 
            height="150" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="feather feather-dollar-sign" // Example SVG icon
          >
            <path d="M12 1v22" />
            <path d="M8 5h8c2.21 0 4 1.79 4 4s-1.79 4-4 4H8c-2.21 0-4-1.79-4-4s1.79-4 4-4z" />
            <path d="M8 15h8c2.21 0 4 1.79 4 4s-1.79 4-4 4H8c-2.21 0-4-1.79-4-4s1.79-4 4-4z" />
          </svg>
        </div>
        <p className="description fade-in">
          <span className="bounce">Earn</span> - Earn passive income through rental yields and profit-sharing from property appreciation. Our system ensures timely distributions, providing you with a reliable income stream while you benefit from the growth of your investments.
        </p>
      </div>
      {/* <div className="line" style={{ transform: 'rotate(180deg)' }}></div> */}
      <div className="line"></div>

      <div className="step hidden">
        <div className="iconWrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="150" 
            height="150" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="feather feather-refresh-cw" // Example SVG icon
          >
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3 10a9 9 0 1 1 6.29 8.66" />
            <path d="M1 14a9 9 0 0 0 8 8" />
          </svg>
        </div>
        <p className="description fade-in">
          <span className="bounce">Trade</span> - Our system enables you to engage in seamless trading of your real estate assets, allowing you to capitalize on market opportunities and increase your portfolio's value.
        </p>
      </div>
    </div>
  );
}
