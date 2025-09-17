import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = ({ name, location, price, imageUrl }) => {
    const cardStyle = {
        backgroundImage: `url('${imageUrl}')`
    };

    return (
        <div className="place-card" style={cardStyle}>
            <div className="card-overlay"></div>
            <div className="card-content">
                <div className="card-badge">Virtual Reality</div>
                <h3 className="card-place-name">{name}</h3>
                <div className="card-info">
                    <span className="card-location">📍 {location}</span>
                    <span className="card-price">{price}</span>
                </div>
                <div className="card-booking-btn-wrapper">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

PlaceCard.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default PlaceCard;