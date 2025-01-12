import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddPlace = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories/'); // Adjust the endpoint as needed
                console.log('API response:', response.data); // Log the response
                setCategories(response.data.categories || response.data); // Adjust according to your API structure
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const placeData = {
            // other place data,
            category: selectedCategory,
        };
        // Submit placeData to your API
    };

    return (
        <div style={{ marginTop: '70px', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                {/* Other form fields for place data */}
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Category:
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    >
                        <option value="">Select a category</option>
                        {Array.isArray(categories) && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Add Place
                </button>
            </form>
        </div>
    );
};

export default AddPlace;