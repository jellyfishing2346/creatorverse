// src/pages/EditCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './FormPage.css'; // Generic styling for forms

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState({
        name: '',
        url: '',
        description: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }
                setCreator(data);
            } catch (err) {
                setError('Failed to load creator for editing: ' + err.message);
                console.error('Error fetching creator for edit:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreator();
    }, [id]);

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
            const { data, error } = await supabase
                .from('creators')
                .update(creator)
                .eq('id', id);

            if (error) {
                throw error;
            }
            alert('Creator updated successfully!');
            navigate(`/creator/${id}`); // Redirect to the creator's detail page
        } catch (err) {
            alert('Error updating creator: ' + err.message);
            console.error('Error updating creator:', err);
        }
    };

    if (loading) return <p>Loading creator data for editing...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!creator) return <p>Creator not found for editing.</p>;

    return (
        <div className="form-container">
            <h2>Edit Content Creator</h2>
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

                <button type="submit">Update Creator</button>
            </form>
        </div>
    );
};

export default EditCreator;