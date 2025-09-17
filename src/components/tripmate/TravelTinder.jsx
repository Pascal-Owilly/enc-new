import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TravelTinder.css';

// Increased dummy data for more cards to swipe through
const dummyUsers = [
    {
        id: 1,
        username: 'Alice',
        photo: 'https://people.com/thmb/kr3h1NnxE82M1U_BWiWjWWNVsoo=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/Simone-Ashley-052525-1-3936e8f5c29a461aab605b66e7853c78.jpg',
        location: 'New York, USA',
        upcomingTrip: {
            destination: 'Bali, Indonesia',
            dates: 'Aug 15-30, 2024',
            budget: '$1500'
        },
    },
    {
        id: 2,
        username: 'Bob',
        photo: 'https://people.com/thmb/ulCEgUyOtimNCvVcmNCFEU_-_3M=/468x468/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2):format(webp)/phil-robertson-1-5415bc97f0b14dc884e02d6d7ba16991.jpg',
        location: 'Paris, France',
        upcomingTrip: {
            destination: 'Maldives',
            dates: 'Sep 1-15, 2024',
            budget: '$5000'
        },
    },
    {
        id: 3,
        username: 'Charlie',
        photo: 'https://people.com/thmb/BCTD2mTgr9xj0GOvq-9aU1tXp9A=/468x468/filters:no_upscale():max_bytes(150000):strip_icc():focal(671x268:673x270):format(webp)/Jennifer-Lopez-arriving-at-a-UK-Special-Screening-of-Unstoppable-052325-5d00622d992546e992b1266dd59dc17e.jpg',
        location: 'Sydney, Australia',
        upcomingTrip: {
            destination: 'Nepal',
            dates: 'Oct 10-25, 2024',
            budget: '$2000'
        },
    },
    {
        id: 4,
        username: 'Vero',
        photo: 'https://people.com/thmb/BCTD2mTgr9xj0GOvq-9aU1tXp9A=/468x468/filters:no_upscale():max_bytes(150000):strip_icc():focal(671x268:673x270):format(webp)/Jennifer-Lopez-arriving-at-a-UK-Special-Screening-of-Unstoppable-052325-5d00622d992546e992b1266dd59dc17e.jpg',
        location: 'Sydney, Australia',
        upcomingTrip: {
            destination: 'Nepal',
            dates: 'Oct 10-25, 2024',
            budget: '$2000'
        },
        travelpreference: {
            style_label: 'Adventure',
            interests: ['Skydiving', 'Surfing', 'Cliff Diving'],
            pace: 'Fast'
        }
    },
    {
        id: 5,
        username: 'Diana',
        photo: 'https://static.wixstatic.com/media/01c45f_9a96b9b32e014e7a8a6b2c2836d5c3d4~mv2.jpg/v1/fill/w_500,h_625,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/01c45f_9a96b9b32e014e7a8a6b2c2836d5c3d4~mv2.jpg',
        location: 'London, UK',
        upcomingTrip: {
            destination: 'Swiss Alps',
            dates: 'Nov 5-12, 2024',
            budget: '$3000'
        },
    },
    {
        id: 6,
        username: 'Ethan',
        photo: 'https://cdn.shopify.com/s/files/1/0211/4926/files/headshot-tips.jpg?v=1614748281',
        location: 'Berlin, Germany',
        upcomingTrip: {
            destination: 'Kyoto, Japan',
            dates: 'Dec 1-10, 2024',
            budget: '$2200'
        },
    },
    {
        id: 7,
        username: 'Fiona',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        location: 'Tokyo, Japan',
        upcomingTrip: {
            destination: 'Patagonia',
            dates: 'Jan 1-20, 2025',
            budget: '$4500'
        },
    },
];

const TravelSwipe = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, remainingSlots: initialRemainingSlots } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useState([]);
    const [swipePosition, setSwipePosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [invitationMessage, setInvitationMessage] = useState('');
    const [remainingSlots, setRemainingSlots] = useState(initialRemainingSlots || 0);

    // Calculate the number of remaining cards
    const cardsRemaining = dummyUsers.length - currentIndex;
    const totalCardsToShow = 3;

    useEffect(() => {
        if (!bookingId || remainingSlots === 0) {
            setInvitationMessage('All slots are filled! You can now proceed to payment.');
        }
    }, [bookingId, remainingSlots]);

    const handleSwipe = async (direction) => {
        const currentUser = dummyUsers[currentIndex];
        const authToken = localStorage.getItem("authToken");

        if (direction === 'Right' && remainingSlots > 0 && currentUser) {
            try {
                // Assuming a backend API to link a user to a booking
                // This is a placeholder and won't actually work without a backend
                await axios.post(
                    `http://your-backend-api.com/api/bookings/invite-user/`,
                    { booking_id: bookingId, invited_user_id: currentUser.id },
                    { headers: { Authorization: `Token ${authToken}` } }
                );

                setMatches(prev => [...prev, currentUser]);
                setRemainingSlots(prev => prev - 1);
                setInvitationMessage(`You invited ${currentUser.username}! One slot filled.`);

            } catch (error) {
                console.error("Failed to invite user:", error);
                setInvitationMessage("Failed to send invitation. Please try again.");
            }
        }
        setCurrentIndex(prev => prev + 1);
    };

    const handlers = useSwipeable({
        onSwiping: (e) => {
            if (cardsRemaining > 0) {
                setSwipePosition({ x: e.deltaX, y: e.deltaY });
                setIsDragging(true);
            }
        },
        onSwiped: (e) => {
            if (e.dir === 'Left' || e.dir === 'Right') {
                handleSwipe(e.dir);
            }
            setSwipePosition({ x: 0, y: 0 });
            setIsDragging(false);
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        delta: 10
    });

    const handleProceedToPayment = () => {
        navigate('/booking-summary', { state: { bookingId } });
    };

    if (currentIndex >= dummyUsers.length || remainingSlots === 0) {
        return (
            <div className="no-more-users">
                <h2>{invitationMessage || "You've swiped through everyone!"}</h2>
                <button onClick={handleProceedToPayment} className="restart-button">Proceed to Payment</button>
            </div>
        );
    }

    const HowItWorks = () => (
        <div className="text-center ">
            <h5
                style={{
                    fontWeight: '800',
                    background: 'linear-gradient(45deg, #4A90E2, #FEB47B)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '16px',
                }}
                className="text-2xl font-semibold mb-6 text-gray-800"
            >
                Find Your Perfect TripMate(s)
            </h5>
            <div className="progress-container mb-3">
                <div className="step-container">
                    <div className="step-circle step-circle--lg">1</div>
                    <span className="step-label">Swipe</span>
                </div>
                <div className="dotted-line dotted-line--lg"></div>
                <div className="step-container">
                    <div className="step-circle step-circle--md">2</div>
                    <span className="step-label">Match</span>
                </div>
                <div className="dotted-line dotted-line--md"></div>
                <div className="step-container">
                    <div className="step-circle step-circle--sm">3</div>
                    <span className="step-label">Venture</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="travel-app">
            <HowItWorks />
            {remainingSlots > 0 && (
                <div className="slot-info">
                    {remainingSlots} slot(s) remaining.
                </div>
            )}
            
            {/* Added a section to display the remaining cards count */}
            <div className="cards-remaining-count">
                <p>You have **{cardsRemaining}** more cards to swipe. ✨</p>
            </div>

            <div className="cards-stack-container">
                {dummyUsers
                    .slice(currentIndex, currentIndex + totalCardsToShow)
                    .map((user, index) => {
                        const isTopCard = index === 0;
                        const cardStyle = {
                            zIndex: totalCardsToShow - index,
                            transform: isTopCard
                                ? `translate(${swipePosition.x}px, ${swipePosition.y}px) rotate(${swipePosition.x / 15}deg)`
                                : `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
                            transition: isTopCard && !isDragging
                                ? 'transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
                                : 'none',
                            opacity: 1 - (index * 0.2),
                        };

                        return (
                            <div
                                key={`${user.id}-${currentIndex + index}`}
                                className={`user-card ${isTopCard ? 'top-card' : ''}`}
                                style={cardStyle}
                                {...(isTopCard ? handlers : {})}
                            >
                                <div className="card-image-container">
                                    <img
                                        src={user.photo}
                                        alt={user.username}
                                        className="card-image"
                                    />
                                    <div className="image-overlay">
                                        {isTopCard && (
                                            <>
                                                <div
                                                    className="swipe-text like-text text-white"
                                                    style={{ opacity: swipePosition.x > 50 ? 1 : 0 }}
                                                >
                                                    YES
                                                </div>
                                                <div
                                                    className="swipe-text nope-text text-white"
                                                    style={{ opacity: swipePosition.x < -50 ? 1 : 0 }}
                                                >
                                                    NOPE
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="card-header">
                                        <h2 className='text-white'>{user.username}</h2>
                                        <div className="location">{user.location}</div>
                                    </div>
                                    <div className="trip-info">
                                        <h4 className='text-dark'>Upcoming Trip</h4>
                                        <p className='text-dark'>📍 {user.upcomingTrip.destination}</p>
                                        <p className='text-dark'>📅 {user.upcomingTrip.dates}</p>
                                        <p className='text-dark'>💰 {user.upcomingTrip.budget}</p>
                                        {user.travelpreference && (
                                            <>
                                                <h4 className='text-dark'>Travel Style</h4>
                                                <p className='text-dark'>✨ {user.travelpreference.style_label}</p>
                                                <p className='text-dark'>🏃 {user.travelpreference.pace}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {invitationMessage && (
                <div className="invitation-message">
                    {invitationMessage}
                </div>
            )}
        </div>
    );
};

export default TravelSwipe;