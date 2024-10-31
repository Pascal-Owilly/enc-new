import React, { useState } from 'react';
import './Itineraries.css'; // Adjust the path as necessary

const CustomItineraries = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        preferences: '',
        budget: '',
        travelDate: '',
        travelType: '',
        interests: {
            adventure: false,
            culture: false,
            food: false,
            relaxation: false,
            wildlife: false,
        },
        additionalNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInterestChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            interests: {
                ...prevState.interests,
                [name]: checked,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add form submission logic here (e.g., send data to an API)
        console.log('Form submitted:', formData);
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('custom-itinerary-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="itinerary-page">
            <h1>Custom Itineraries</h1>
            <div className="info-section">
                <h2>Discover the World with Personalized Itineraries</h2>
                <p>
                    Our custom itineraries are designed to fit your unique travel preferences and interests. 
                    Whether you're seeking adventure, relaxation, culture, or culinary delights, we tailor each 
                    experience to ensure you have the trip of a lifetime. 
                </p>
                <p>
                    Enjoy a one-on-one consultation with our travel experts, who will help you craft a journey 
                    that resonates with your dreams. With flexible planning, local insights, and tailored experiences, 
                    your travel will be as unique as you are.
                </p>
                <button onClick={scrollToForm} className="get-started-button">
                    Get Started
                </button>
            </div>
            
            <h2>Get Started on Your Custom Itinerary</h2>
            <form id="custom-itinerary-form" onSubmit={handleSubmit} className="custom-itinerary-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preferences">Travel Preferences:</label>
                    <textarea
                        id="preferences"
                        name="preferences"
                        value={formData.preferences}
                        onChange={handleChange}
                        required
                        placeholder="e.g., beach, mountains, cultural experiences"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Budget (USD):</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="travelDate">Preferred Travel Date:</label>
                    <input
                        type="date"
                        id="travelDate"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="travelType">Type of Travel:</label>
                    <select
                        id="travelType"
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select...</option>
                        <option value="adventure">Adventure</option>
                        <option value="relaxation">Relaxation</option>
                        <option value="cultural">Cultural</option>
                        <option value="food">Culinary</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Interests:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="adventure"
                                checked={formData.interests.adventure}
                                onChange={handleInterestChange}
                            />
                            Adventure
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="culture"
                                checked={formData.interests.culture}
                                onChange={handleInterestChange}
                            />
                            Culture
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="food"
                                checked={formData.interests.food}
                                onChange={handleInterestChange}
                            />
                            Culinary
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="relaxation"
                                checked={formData.interests.relaxation}
                                onChange={handleInterestChange}
                            />
                            Relaxation
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="wildlife"
                                checked={formData.interests.wildlife}
                                onChange={handleInterestChange}
                            />
                            Wildlife
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="additionalNotes">Additional Notes:</label>
                    <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="Any special requests or notes..."
                    />
                </div>
                <button type="submit" className="submit-button">Submit Request</button>
            </form>

            <h2>Sample Itinerary</h2>
            <div className="sample-itinerary">
                <h3>Day 1: Arrival & Relaxation</h3>
                <p>Check into your hotel and unwind. Enjoy a welcome dinner at a local restaurant.</p>
                <h3>Day 2: Cultural Exploration</h3>
                <p>Visit the local museum and participate in a guided cultural tour.</p>
                <h3>Day 3: Adventure Activities</h3>
                <p>Embark on a thrilling outdoor adventure like hiking or zip-lining.</p>
                <h3>Day 4: Culinary Delights</h3>
                <p>Take a cooking class to learn about local cuisine and flavors.</p>
                <h3>Day 5: Wildlife Experience</h3>
                <p>Join a wildlife safari to spot native animals in their natural habitat.</p>
                <h3>Day 6: Departure</h3>
                <p>Enjoy a leisurely breakfast before checking out and departing.</p>
            </div>
        </div>
    );
};

export default CustomItineraries;