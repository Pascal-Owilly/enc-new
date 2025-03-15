import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';

const CustomItineraries = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        preferences: '',
        budget: '',
        travelDate: '',
        interests: [],  
        additionalNotes: '',
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [showForm, setShowForm] = useState(true); // Toggle form visibility

    // Fetch interest categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/places/`);
                if (response.ok) {
                    const data = await response.json();
                    const uniqueCategories = [...new Set(data.map(place => place.category_type))].filter(Boolean);
                    setCategories(uniqueCategories);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle interest checkbox selection
    const handleInterestChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            interests: checked
                ? [...prevState.interests, name]
                : prevState.interests.filter((interest) => interest !== name),
        }));
    };

    // Submit form
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
        const response = await fetch(`${BASE_URL}/api/auth/notify-managers/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setMessage('');
            setShowForm(false); // Hide form after successful submission

            // Scroll to top after successful submission
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const errorData = await response.json();
            setMessage(errorData?.error || '❌ Failed to send request. Please try again.');
        }
    } catch (error) {
        setMessage(`⚠️ An error occurred: ${error.message}`);
    }

    setLoading(false);
};

    return (
        <div className="itinerary-page m-auto">
            <h5>Customize your Trip</h5>
            <p>
                Experience a journey tailored to your interests—adventure, relaxation, culture, or cuisine.
                Our experts craft custom itineraries with local insights and flexible planning, ensuring a trip as unique as you.
            </p>

            {message && <p className="message">{message}</p>}

            {showForm ? (
                <form onSubmit={handleSubmit} className="custom-itinerary-for p-2">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                    <textarea name="preferences" value={formData.preferences} onChange={handleChange} required placeholder="Travel Preferences" />
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} required placeholder="Budget (KES)" />
                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} />

                    <div className="interests-section">
                        <h4>Select Your Interests</h4>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <label key={category}>
                                    <input
                                        type="checkbox"
                                        name={category}
                                        checked={formData.interests.includes(category)}
                                        onChange={handleInterestChange}
                                    />
                                    {category.replace(/_/g, ' ')}
                                </label>
                            ))
                        ) : (
                            <p>Loading categories...</p>
                        )}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    <h2>🎉 Request Submitted Successfully!</h2>
                    <p>Thank you for submitting your request. Our team will review it and get back to you shortly.</p>
                    <button onClick={() => setShowForm(true)}>Submit Another Request</button>
                </div>
            )}
        </div>
    );
};

export default CustomItineraries;
