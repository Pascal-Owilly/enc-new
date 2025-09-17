import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import { BASE_URL } from '../config/config';
import './AddPlace.css';

const AddPlace = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const navigate = useNavigate(); // Hook for navigation

    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [destination, setDestination] = useState('');
    const [pictures, setPictures] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const getAuthToken = () => localStorage.getItem('authToken');

    const isEditing = !!id; // Boolean flag: true if id exists, false otherwise

    const CATEGORY_CHOICES = [
        { value: 'adventure_outdoors', label: 'Adventure & Outdoors' },
        { value: 'food_culinary', label: 'Food & Culinary' },
        { value: 'farmers_markets', label: 'Farmers Markets' },
        { value: 'culture_community', label: 'Culture & Community' },
        { value: 'arts_creativity', label: 'Arts & Creativity' },
        { value: 'history_heritage', label: 'History & Heritage' },
        { value: 'wellness_lifestyle', label: 'Wellness & Lifestyle' },
        { value: 'sports_entertainment', label: 'Sports & Entertainment' },
    ];

    useEffect(() => {
        if (isEditing) {
            const fetchPlace = async () => {
                const token = getAuthToken();
                if (!token) {
                    alert('Please log in to edit this place.');
                    navigate('/login');
                    return;
                }
                try {
                    const response = await axios.get(`${BASE_URL}/api/manager/places/${id}/`, {
                        headers: { 'Authorization': `Token ${token}` },
                    });
                    const data = response.data;
                    setName(data.name || '');
                    setDescription(data.description || '');
                    setLocation(data.location || '');
                    setPrice(data.price || '');
                    setSize(data.size || '');
                    setDestination(data.destination || '');
                    setSelectedCategory(data.category_type || '');
                    // Note: We don't pre-populate file inputs for security reasons.
                    setInitialDataLoaded(true);
                } catch (error) {
                    console.error('Error fetching place data:', error);
                    alert('Could not load place data for editing.');
                    navigate('/management/property-management/');
                }
            };
            fetchPlace();
        } else {
            setInitialDataLoaded(true);
        }
    }, [id, isEditing, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const token = getAuthToken();

        if (!token) {
            alert('Please log in first.');
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('size', size);
        // formData.append('destination', destination);
        formData.append('category_type', selectedCategory);

        // Only append cover image if a new one is selected
        if (coverImage) {
            formData.append('cover_image', coverImage);
        }

        // Only append new pictures if new ones are selected
        if (pictures.length > 0) {
            pictures.forEach((pic) => formData.append('images', pic));
        }

        try {
            if (isEditing) {
                await axios.put(`${BASE_URL}/api/manager/places/${id}/`, formData, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                alert('Place updated successfully!');
            } else {
                await axios.post(`${BASE_URL}/api/manager/places/`, formData, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                alert('Place added successfully!');
            }
            navigate('/management/property-management/'); // Redirect after success
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`There was an error: ${error.response?.data?.detail || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // New function to handle resizing
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1024,
                1024,
                'JPEG',
                80,
                0,
                (uri) => { resolve(uri); },
                'blob'
            );
        });

    // Validate and resize files for images
    const validateAndResizeImages = async (files) => {
        const processedImages = [];
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                try {
                    const resizedImage = await resizeFile(file);
                    processedImages.push(resizedImage);
                } catch (err) {
                    console.error('Error resizing image:', err);
                }
            } else {
                alert(`The file "${file.name}" is not an image and was skipped.`);
            }
        }
        return processedImages;
    };

    const handleFileChange = async (e) => {
        const files = e.target.files;
        const processedImages = await validateAndResizeImages(files);
        setPictures(processedImages);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const processedImages = await validateAndResizeImages(files);
            setPictures(processedImages);
        }
    };

    if (!initialDataLoaded && isEditing) {
        return <div className="loading-state">Loading place data...</div>;
    }

    return (
        <div className='add-place-container'>
            <form onSubmit={handleSubmit} className="add-place-form">
                <h4>{isEditing ? 'Edit Place' : 'Add New Place'}</h4>
                <hr />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Size (e.g., 4 people):
                    <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                </label>
               
                <label>
                    Cover Image:
                    <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} required={!isEditing} />
                </label>
                <label>
                    Pictures:
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`drag-and-drop-area ${isDragging ? 'is-dragging' : ''}`}
                    >
                        {pictures.length > 0 ? (
                            <p>{pictures.length} file(s) selected.</p>
                        ) : (
                            <p>Drag & drop images here or click to select.</p>
                        )}
                        <input type="file" multiple onChange={handleFileChange} required={!isEditing} />
                    </div>
                </label>
                <label>
                    Category:
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                        <option value="">Select a category</option>
                        {CATEGORY_CHOICES.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Place')}
                </button>
            </form>
        </div>
    );
};

export default AddPlace;