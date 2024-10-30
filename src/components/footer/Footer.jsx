import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer>
      <div className="content">
        <h2>
          Intellima <span> 2023 - {currentYear}</span>
        </h2>

        <div id="links">
          {/* <a href="#">Privacy</a>
          <a href="#">Policy</a> */}
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
