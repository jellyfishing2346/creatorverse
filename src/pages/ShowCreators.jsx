// src/pages/ShowCreators.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import './ShowCreators.css'; // For basic styling of the grid

const ShowCreators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .order('name', { ascending: true }); // Order by name

                if (error) {
                    throw error;
                }
                setCreators(data);
            } catch (err) {
                setError('Failed to fetch creators: ' + err.message);
                console.error('Error fetching creators:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, []);

    if (loading) return <p>Loading creators...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="show-creators">
            {creators.length === 0 ? (
                <p>No content creators yet! Add some to get started.</p>
            ) : (
                <div className="creators-grid">
                    {creators.map((creator) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowCreators;