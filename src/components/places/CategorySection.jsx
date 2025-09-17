import React from 'react';
import PlaceCard from './PlaceCard.jsx';
import PropTypes from 'prop-types';

const CategorySection = ({ title, icon, count, link, items, showPagination }) => {
    return (
        <div className="category-section">
            <div className="category-header">
                <h2 className="category-title">
                    <span className="category-icon">{icon}</span>
                    {title}
                    <span className="item-count">({count})</span>
                </h2>
                <a href={link} className="see-all-link">Explore All &rarr;</a>
            </div>
            <div className="card-grid">
                {items.map((item, index) => (
                    <PlaceCard key={index} {...item} />
                ))}
            </div>
            {showPagination && (
                <div className="pagination-controls d-flex justify-content-center align-items-center gap-3">
                    <button className="pagination-btn btn btn-outline-primary" disabled>
                        &larr; Previous
                    </button>
                    <span className="pagination-info">
                        Page <strong>1</strong> of 2
                    </span>
                    <button className="pagination-btn btn btn-outline-primary">
                        Next &rarr;
                    </button>
                </div>
            )}
        </div>
    );
};

CategorySection.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    showPagination: PropTypes.bool
};

export default CategorySection;