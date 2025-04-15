  import React, { useState, useEffect } from 'react';
  import { Container, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTree, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
  import { BASE_URL } from '../config/config';
  import BookingButton from '../bookings/BookingButton';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

  const NatureHikes = () => {
    const [hikes, setHikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const category = "nature_hikes";

    useEffect(() => {
      const fetchHikes = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${BASE_URL}/api/places/filter_by_category/?category=${category}`);
          if (!response.ok) {
            throw new Error('Failed to fetch nature hikes');
          }
          const data = await response.json();
          setHikes(data);
        } catch (error) {
          console.error('Error fetching nature hikes:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHikes();
    }, [category]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHikes = hikes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(hikes.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <Container fluid className="">
        <h5 className="text-center ">
          <FontAwesomeIcon icon={faTree} /> Nature Hikes
        </h5>
        <p className="text-center lea">
  Reconnect with nature on scenic trails—mountains, forests, and rivers await to refresh your mind and soul. 🌿🥾
</p>

        
        {loading ? (
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : hikes.length > 0 ? (
          <>
           <Row xs={1} sm={2} md={3} className="g-2">
  {currentHikes.map((hike) => (
    <Col key={hike.id} className="mb-2">
      <div className="destination-card w-100">
        <img
          src={`${BASE_URL}${hike.imageUrl || hike.cover_image}`}
          alt={hike.name}
          className="hike-image"
          style={{ width: '100%' }}
        />
        <h5>{hike.name}</h5>
       <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    padding: '0.75rem',
    borderTop: '1px solid #e0e0e0',
    background: '#f9f9f9',
    borderRadius: '8px',
  }}
>
  <span style={{ color: '#4CAF50', fontWeight: '600', fontSize: '1rem' }}>
    KES {hike.price}
  </span>
  
  <span style={{ color: '#757575', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#ff5722' }} />
    {hike.location || 'Unknown'}
  </span>
</div>

<div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
  <BookingButton place={hike} />
</div>


      </div>
    </Col>
  ))}
</Row>


            <Pagination className="justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        ) : (
          <div className="text-center mt-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="3x" className="text-warning mb-3" />
            <h4>No Nature Hikes Available</h4>
            <p>Currently, there are no nature hikes to display. Please check back later.</p>
          </div>
        )}
      </Container>
    );
  };

  export default NatureHikes;
