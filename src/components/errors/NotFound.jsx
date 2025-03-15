import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p className='text-primary'>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
