// src/pages/AddCreator.jsx
import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './FormPage.css'; // Generic styling for forms

const AddCreator = () => {
    const navigate = useNavigate();
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.from('creators').insert([creator]);

            if (error) {
                throw error;
            }
            alert('Creator added successfully!');
            navigate('/'); // Redirect to homepage
        } catch (err) {
            alert('Error adding creator: ' + err.message);
            console.error('Error adding creator:', err);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Content Creator</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={creator.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="url">URL:</label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    value={creator.url}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={creator.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <label htmlFor="imageUrl">Image URL (Optional):</label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={creator.imageUrl}
                    onChange={handleChange}
                />

                <button type="submit">Add Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;