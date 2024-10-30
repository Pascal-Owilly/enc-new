import './Stat.css';
import PropTypes from 'prop-types';

function Stat({ text }) {
  return (
    <>

    <div className="stat">
      <p className="hidden" style={{ color: '#d9d9d9' }}>{text}</p> 
      <div className="short bar" style={{ backgroundColor: '#000' }}></div> 
    </div>
    </>
  );
}

Stat.propTypes = {
  text: PropTypes.string,
};

export default Stat;