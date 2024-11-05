import React, { useState } from 'react';
import './MicroAdventure.css';
import heroImg from '../../assets/hero/hero.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';

const MicroAdventure = () => {
    const [wishlisted, setWishlisted] = useState([false, false, false]);
    const toggleWishlist = (index) => {
        const newWishlist = [...wishlisted];
        newWishlist[index] = !newWishlist[index];
        setWishlisted(newWishlist);
    };
    return (
        <div className="micro-adventure-page container">
           <header 
    className="hero-banner text-center " 
    style={{
        // backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius:'100px'
    }}
>
<h1
     className="fade-in text-center page-title all-headings">Micro-Adventure</h1>
     
     <p style={{fontFamily:'Caladea', color:'#333'}}>
        Micro-Adventures are all about discovering unique, exciting experiences without the need for extensive planning or long-distance travel.
         Perfect for busy schedules, these mini escapes allow you to explore hidden gems. 
         Micro-Adventures are designed to bring a taste of adventure to your everyday life,
        making it easy to connect with nature, uncover local secrets, and create lasting memories on your terms.
    </p>
</header>
            <div className="row">
                {/* Cards section occupying col-9 */}
                <div className="col-md-10">
                    <div className="row">
                        <AdventureItem 
                            title="Forest Trekking" 
                            description="Guided forest trekking tours in breathtaking landscapes."
                            rating="★★★★☆" 
                            wishlisted={wishlisted[0]}
                            toggleWishlist={() => toggleWishlist(0)}
                        />
                        <AdventureItem 
                            title="City Scavenger Hunt" 
                            description="Exciting city-wide scavenger hunt exploring hidden gems."
                            rating="★★★★★" 
                            wishlisted={wishlisted[1]}
                            toggleWishlist={() => toggleWishlist(1)}
                        />
                        <AdventureItem 
                            title="Stargazing Nights" 
                            description="Magical stargazing nights with expert astronomers."
                            rating="★★★★☆" 
                            wishlisted={wishlisted[2]}
                            toggleWishlist={() => toggleWishlist(2)}
                        />
                          <AdventureItem 
                            title="Stargazing Nights" 
                            description="Magical stargazing nights with expert astronomers."
                            rating="★★★★☆" 
                            wishlisted={wishlisted[2]}
                            toggleWishlist={() => toggleWishlist(2)}
                        />
                    </div>
                </div>
                
                {/* Empty column for right-side spacing */}
                <div className="col-md-2"></div>
            </div>
        </div>
    );
};

const AdventureItem = ({ title, description, rating, wishlisted, toggleWishlist }) => (
    <div className="col-md-6 mb-4">
        <div className="adventure-item d-flex flex-column flex-md-row align-items-start">
            <div className="adventure-image">
        <img src={hero2} alt={title} className="img-fluid rounded" />
            </div>
            <div className="adventure-text ms-md-3 mt-3 mt-md-0">
                <h2 className="text-secondary">{title}</h2>
                <p className='text-dark'>{description}</p>
                <p className='text-success'>Rating: {rating}</p>
                <div className="d-flex align-items-center mt-3">
                    <button 
                        className="wishlist-button btn btn-outline-info btn-sm me-2" 
                        onClick={toggleWishlist}
                    >
                        {wishlisted ? 'Remove from Wishlist' : '+ Wish'}
                    </button>
                    <button 
                        className="btn btn-sm ms-auto" 
                        style={{ background: '#000042', color: '#d9d9d9' }}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default MicroAdventure;
