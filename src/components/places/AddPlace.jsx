import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import './AddPlace.css';

const AddPlace = () => {
    // Function to get the token from localStorage or sessionStorage
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [destination, setDestination] = useState('');
    const [pictures, setPictures] = useState([]);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories based on your Place model CATEGORY_CHOICES
    const CATEGORY_CHOICES = [
        { value: 'micro_adventure', label: 'Micro Adventure' },
        { value: 'group_booking', label: 'Group Booking' },
        { value: 'culinary_tours', label: 'Culinary Tours' },
        { value: 'farmers_markets', label: 'Farmers Markets' },
        { value: 'nature_hikes', label: 'Nature Hikes' },
        { value: 'art_workshops', label: 'Art Workshops' },
        { value: 'cultural_festivals', label: 'Cultural Festivals' },
        { value: 'historical_tours', label: 'Historical Tours' },
        { value: 'community_service', label: 'Community Service' },
        { value: 'outdoor_adventures', label: 'Outdoor Adventures' },
        { value: 'wellness_retreats', label: 'Wellness Retreats' },
        { value: 'local_sports_events', label: 'Local Sports Events' },
        { value: 'music_and_dance_classes', label: 'Music and Dance Classes' },
        { value: 'local_artisan_tours', label: 'Local Artisan Tours' },
        { value: 'themed_photo_walks', label: 'Themed Photo Walks' },
        { value: 'wildlife_spotting', label: 'Wildlife Spotting' },
        { value: 'cultural_exchange', label: 'Cultural Exchange' },
        { value: 'storytelling_nights', label: 'Storytelling Nights' },
        { value: 'virtual_reality', label: 'Virtual Reality' },
        { value: 'family_fun', label: 'Family Fun' },
        { value: 'explore_the_unknown', label: 'Explore the Unknown' },
        { value: 'sustainable_travels', label: 'Sustainable Travels' },
        { value: 'custom_itineraries', label: 'Custom Itineraries' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
    
        const token = getAuthToken();
        if (!token) {
            alert('Please log in first. We’re excited to see what you’ll share!');
            setIsSubmitting(false);
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('cover_image', coverImage);
        formData.append('destination', destination);
        formData.append('category_type', selectedCategory);
    
        pictures.forEach((pic) => formData.append('pictures', pic));
        videos.forEach((vid) => formData.append('videos', vid));
    
        try {
            const response = await axios.post(`${BASE_URL}/profile/places/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
            });
    
            console.log('Place added successfully:', response.data);
            window.location.href = '/management/property-management/';
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mb-5' style={{ marginTop: '20px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h4>Add destination</h4>
            <hr />
                {/* Form Fields */}
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Size (Add size only if you offer groups e.g 3-4 people):
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Cover Image:
                    <input
                        type="file"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Pictures:
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setPictures(Array.from(e.target.files))}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>


                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Category:
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    >
                        <option value="">Select a category</option>
                        {CATEGORY_CHOICES.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </label>

              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '10px', backgroundColor: '#ffd700', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isSubmitting ? 'Adding Place...' : 'Add Place'}
                </button>
            </form>
        </div>
    );
};

export default AddPlace;
